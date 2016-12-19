<?php

namespace Drupal\webny_global_nav\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a WebNY Global Navigation Footer block.
 *
 * @Block(
 *     id = "webny_global_nav_footer_block",
 *     admin_label = @Translation("WebNY Global Navigation Footer"),
 *     category = @Translation("WebNY")
 * )
 */
class WebnyGlobalNavFooterBlock extends BlockBase {
  
  /**
   * {@inheritdoc}
   */
  public function build() {
    // Return equivalent to theme function.
    $block = array(
      '#theme' => 'webny_global_nav_footer',
      '#attached' => array(
          'library' => array(
              'webny_global_nav/global-nav',
          ),
      ),
    );
    return $block;
  }

}
