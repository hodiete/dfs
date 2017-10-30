<?php

namespace Drupal\webny_whitelisted_content;

use Drupal\Core\Url;

/**
 * Class \Drupal\webny_whitelisted_content\WhitelistedFileUrl.
 *
 * Return a Url to a file from a document.
 */
class WhitelistedFileUrl {

  /**
   * Return a Url object for the file.
   *
   * @param \Drupal\node\Entity\Node $node
   */
  public function getUrl($node) {
    // First try to use the link.
    if (count($node->get('field_webny_whitelist_link_url')) > 0) {
      // Use the link.
      return Url::fromUri($node->get('field_webny_whitelist_link_url')->get(0)->get('uri')->getValue());
    }
    else {
      // Redirect to the homepage?
      return Url::fromRoute('<front>', [], ['absolute' => TRUE]);
    }
  }
}
