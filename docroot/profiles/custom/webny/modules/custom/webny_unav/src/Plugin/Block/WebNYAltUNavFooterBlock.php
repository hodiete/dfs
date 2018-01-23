<?php
/**
 * @file
 * Contains \Drupal\webny_unav\Plugin\Block\WebNYUNavFooterBlock.php
 */

namespace Drupal\webny_unav\Plugin\Block;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a NYS Alternate uNav footer block
 *
 * @Block(
 *     id = "webny_alt_unav_footer_block",
 *     admin_label = @Translation("WebNY Alternate Universal Navigation Footer Block"),
 *     category = @Translation("WebNY Universal Navigation")
 * )
 */

class webnyAltUNavFooterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    return $account->hasPermission('administer nys unav');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    // return equivalent to theme function
    $block = array('#theme' => 'webny_alt_unav_footer',);
    return $block;
  }
}