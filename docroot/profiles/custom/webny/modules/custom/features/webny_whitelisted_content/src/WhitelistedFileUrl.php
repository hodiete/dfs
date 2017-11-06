<?php

namespace Drupal\webny_whitelisted_content;

use Drupal\Core\Url;

/**
 * Class \Drupal\webny_whitelisted_content\WhitelistedFileUrl.
 *
 * Return a Url to a file from a document.
 */
class WhitelistedFileUrl {
  private $node;

  /**
   * Return a Url object for the file.
   *
   * @param \Drupal\node\Entity\Node $node
   */
  public function getUrl($node) {
    $this->node = $node;

    if ($this->nodeHasLink()) {
      return Url::fromUri($this->node->get('field_webny_whitelist_link_url')->get(0)->get('uri')->getValue());
    }
    else {
      return Url::fromRoute('system.404', [], ['absolute' => TRUE]);
    }
  }

  private function nodeHasLink() {
    return (count($this->node->get('field_webny_whitelist_link_url')) > 0);
  }
}
