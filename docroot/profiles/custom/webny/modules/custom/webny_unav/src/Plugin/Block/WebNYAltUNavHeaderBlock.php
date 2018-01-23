<?php
/**
 * @file
 * Contains \Drupal\webny_unav\Plugin\Block\WebNYUNavHeaderBlock.php
 */

namespace Drupal\webny_unav\Plugin\Block;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a NYS Alternate uNav header block
 *
 * @Block(
 *     id = "webny_alt_unav_header_block",
 *     admin_label = @Translation("WebNY Alternate Universal Navigation Header Block"),
 *     category = @Translation("WebNY Universal Navigation")
 * )
 */

class webnyAltUNavHeaderBlock extends BlockBase {

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
    $block = array('#theme' => 'webny_alt_unav_header',);
    return $block;
  }
}