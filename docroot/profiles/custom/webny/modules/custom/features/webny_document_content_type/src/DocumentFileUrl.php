<?php

namespace Drupal\webny_document_content_type;

use Drupal\Core\Url;

/**
 * Class \Drupal\webny_document_content_type\DocumentFileUrl.
 *
 * Return a Url to a file from a document.
 */
class DocumentFileUrl {

  /**
   * Return a Url object for the file.
   *
   * @param \Drupal\node\Entity\Node $node
   */
  public function getUrl($node) {
    // First try to use the uploaded file.
    if (count($node->get('field_webny_document_file_upload')->getValue()) > 0) {
      $file = $node->get('field_webny_document_file_upload')->get(0)->entity;

      return Url::fromUri($file->url());
    }
    elseif (!empty($node->get('field_webny_document_ext_link')->value)) {
      // Use the external link.
      return Url::fromUri($node->get('field_webny_document_ext_link')->value);
    }
    else {
      // Return the page not found (404) route.
      return Url::fromRoute('system.404', [], ['absolute' => TRUE]);
    }
  }
}
