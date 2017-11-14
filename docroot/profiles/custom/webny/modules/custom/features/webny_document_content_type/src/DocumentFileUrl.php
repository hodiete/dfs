<?php

namespace Drupal\webny_document_content_type;

use Drupal\Core\Url;

/**
 * Class \Drupal\webny_document_content_type\DocumentFileUrl.
 *
 * Return a Url to a file from a document.
 */
class DocumentFileUrl {
  private $node;

  /**
   * Return a Url object for the file.
   *
   * @param \Drupal\node\Entity\Node $node
   */
  public function getUrl($node) {
    $this->node = $node;

    if ($this->nodeHasUpload()) {
      return Url::fromUri($this->node->get('field_webny_document_file_upload')->get(0)->entity->url());
    }
    elseif ($this->nodeHasLink()) {
      return Url::fromUri($this->node->get('field_webny_document_ext_link')->value);
    }
    else {
      return Url::fromRoute('system.404', [], ['absolute' => TRUE]);
    }
  }

  private function nodeHasUpload() {
    return (count($this->node->get('field_webny_document_file_upload')->getValue()) > 0);
  }

  private function nodeHasLink() {
    return !empty($this->node->get('field_webny_document_ext_link')->value);
  }
}
