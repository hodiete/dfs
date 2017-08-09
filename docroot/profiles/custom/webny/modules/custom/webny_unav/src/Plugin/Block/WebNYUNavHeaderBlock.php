<?php
/**
 * @file
 * Contains \Drupal\webny_unav\Plugin\Block\WebNYUNavHeaderBlock.php
 */

namespace Drupal\webny_unav\Plugin\Block;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a NYS uNav header block
 *
 * @Block(
 *     id = "webny_unav_header_block",
 *     admin_label = @Translation("webny uNav Header"),
 *     category = @Translation("webny")
 * )
 */

class webnyUNavHeaderBlock extends BlockBase {

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
        $config = \Drupal::config('webny_unav.settings');
        switch ($config->get('webny_unav.webny_unav_interactive')) {
            case '0':
                $block = array(
                    '#theme' => 'webny_unav_header_static',
                );
                break;
            case '1':
                $block = array(
                    '#theme' => 'webny_unav_header_interactive',
                );
                break;
        }
        return $block;
    }
}