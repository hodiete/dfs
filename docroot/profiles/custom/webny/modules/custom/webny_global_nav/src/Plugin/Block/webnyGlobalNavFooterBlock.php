<?php

namespace Drupal\webny_global_nav\Plugin\Block;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a webny Global Nav footer block.
 *
 * @Block(
 *     id = "webny_global_nav_footer_block",
 *     admin_label = @Translation("webny Global Nav Footer"),
 *     category = @Translation("webny")
 * )
 */
class WebnyGlobalNavFooterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    return $account->hasPermission('administer webny global nav');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Return equivalent to theme function.
    $block = array(
      '#theme' => 'webny_global_nav_footer',
    );
    return $block;
  }

}
