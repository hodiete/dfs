<?php

namespace Drupal\webny_document_content_type\Routing;

use Drupal\Core\Routing\ResettableStackedRouteMatchInterface;
use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Class \Drupal\webny_document_content_type\Routing\RouteSubscriber.
 */
class RouteSubscriber implements EventSubscriberInterface {
  /**
   * Constructor for \Drupal\webny\Routing\RouteSubscriber.
   *
   * @param \Drupal\Core\Routing\ResettableStackedRouteMatchInterface $route_match
   *   The current route match object.
   */
  public function __construct(ResettableStackedRouteMatchInterface $route_match) {
    $this->routeMatch = $route_match;
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
    $node_entity = $attributes->get('node');

    if ($node_entity->bundle() !== 'webny_document') {
      return;
    }

    $external_link = $node_entity->get('field_webny_document_ext_link')->value;

    if (count($node_entity->get('field_webny_document_file_upload')->getValue()) > 0) {
      $file = $node_entity->get('field_webny_document_file_upload')->get(0)->entity->url();
    }
    else {
      $file = null;
    }

    if (!empty($file)) {
      $url = $file;
    }
    elseif (!empty($external_link)) {
      // Use the external link.
      $url = $external_link;
    }
    else {
      // Redirect to the homepage?
      $url = Url::fromRoute('<front>', [], ['absolute' => TRUE])->toString();
    }

    $event->setResponse(
      new RedirectResponse($url)
    );
  }
}