<?php

namespace Drupal\webny_document_content_type\EventSubscriber;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Session\AccountProxy;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Enable caching on private files attached to document nodes.
 */
class FinishResponseSubscriber implements EventSubscriberInterface {

  // @var \Symfony\Component\HttpKernel\Event\FilterResponseEvent
  private $event;

  // @var \Drupal\Core\Config\Config
  protected $config;

  // @var \Drupal\Core\Session\AccountProxy
  protected $currentUser;

  /**
   * Constructs a FinishResponseSubscriber object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   * @param \Drupal\Core\Session\AccountProxy $current_user
   */
  public function __construct(ConfigFactoryInterface $config_factory, AccountProxy $current_user) {
    $this->config = $config_factory->get('system.performance');
    $this->currentUser = $current_user;
  }

  /**
   * @return array
   *   An array of event listener definitions.
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::RESPONSE][] = ['onRespond'];
    return $events;
  }

  /**
   * @param \Symfony\Component\HttpKernel\Event\FilterResponseEvent $event
   */
  public function onRespond(FilterResponseEvent $event) {
    $this->event = $event;

    if ($this->isCacheableDocument()) {
      $this->enableCaching();
    }
  }

  private function isCacheableDocument() {
    return ($this->isPrivateFile() && $this->currentUser->isAnonymous());
  }

  private function isPrivateFile() {
    $response = $this->event->getResponse();

    return (
      is_a($response, '\Symfony\Component\HttpFoundation\BinaryFileResponse')
      && (strpos($response->getFile()->getPath(), 'private://') !== FALSE)
    );
  }

  private function enableCaching() {
    $response = $this->event->getResponse();

    $cache_control_max_age = $this->config->get('cache.page.max_age');

    $response->headers->set('Cache-Control', 'public, max-age=' . $cache_control_max_age);
  }
}
