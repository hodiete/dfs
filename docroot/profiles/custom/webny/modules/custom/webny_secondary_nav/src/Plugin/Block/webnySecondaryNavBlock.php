<?php

namespace Drupal\webny_secondary_nav\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Secondary Navigation' Block.
 *
 * @Block(
 *   id = "webny_secondary_nav_block",
 *   admin_label = @Translation("WebNY Secondary Navigation Block"),
 * )
 */
class webnySecondaryNavBlock extends BlockBase {

    /**
     * {@inheritdoc}
     */
    public function build() {

        return array(
            '#theme' => 'webny_secondary_nav_block'
        );
    }
}
