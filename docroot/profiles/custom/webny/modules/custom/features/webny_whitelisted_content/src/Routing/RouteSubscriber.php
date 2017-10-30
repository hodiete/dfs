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
    // Re-route the user if they try to a document node page.
    if ($this->routeMatch->getRouteName() !== 'entity.node.canonical') {
      return;
    }

    // Load the node.
    $attributes = $event->getRequest()->attributes;
    $node = $attributes->get('node');

    if ($node->bundle() !== 'webny_whitelisted_content') {
      return;
    }

    $event->setResponse(
      new RedirectResponse($this->fileUrl->getUrl($node)->toString())
    );
  }
}