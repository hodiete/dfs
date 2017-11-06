<?php

namespace Drupal\webny_whitelisted_content\Routing;

use Drupal\Core\Routing\ResettableStackedRouteMatchInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\webny_whitelisted_content\WhitelistedFileUrl;

/**
 * Class \Drupal\webny_whitelisted_content\Routing\RouteSubscriber.
 */
class RouteSubscriber implements EventSubscriberInterface {

  /**
   * The URL generator service.
   *
   * @var \Drupal\webny_whitelisted_content\WhitelistedFileUrl
   */
  private $fileUrl;

  /**
   * @var \Symfony\Component\HttpKernel\Event\FilterResponseEvent
   */
  private $event;

  /**
   * Constructor for \Drupal\webny\Routing\RouteSubscriber.
   *
   * @param \Drupal\Core\Routing\ResettableStackedRouteMatchInterface $route_match
   *   The current route match object.
   */
  public function __construct(ResettableStackedRouteMatchInterface $route_match, WhitelistedFileUrl $fileUrl) {
    $this->routeMatch = $route_match;
    $this->fileUrl = $fileUrl;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    return [
      KernelEvents::RESPONSE => 'onKernelResponse',
    ];
  }

  /**
   * Callback for kernel response.
   *
   * @param \Symfony\Component\HttpKernel\Event\FilterResponseEvent $event
   *   The kernel response event object.
   */
  public function onKernelResponse(FilterResponseEvent $event) {
    $this->event = $event;

    if ($this->is_whitelisted_page_link()) {
      $event->setResponse(
        new RedirectResponse($this->fileUrl->getUrl($event->getRequest()->attributes->get('node'))->toString())
      );
    }
  }

  private function is_whitelisted_page_link() {
    return ($this->routeMatch->getRouteName() === 'entity.node.canonical' && $this->event->getRequest()->attributes->get('node')->bundle() === 'webny_whitelisted_content');
  }
}