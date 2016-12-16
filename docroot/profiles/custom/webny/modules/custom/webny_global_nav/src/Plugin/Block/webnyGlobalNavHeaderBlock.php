<?php

namespace Drupal\webny_global_nav\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Webny Global Nav header block.
 *
 * @Block(
 *     id = "webny_global_nav_header_block",
 *     admin_label = @Translation("Webny Global Nav Header"),
 *     category = @Translation("webny")
 * )
 */
class WebnyGlobalNavHeaderBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Return equivalent to theme function.
    $block = array(
      '#theme' => 'webny_global_nav_header',
      '#attached' => array(
        'library' => array(
          'webny_global_nav/global-nav',
        ),
      ),
    );
    return $block;
  }

}
