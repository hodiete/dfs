<?php

namespace Drupal\webny_global_nav\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Global Navigation' Block.
 *
 * @Block(
 *   id = "webny_global_nav_block",
 *   admin_label = @Translation("WebNY Global Navigation Block"),
 * )
 */
class WebNYGlobalNavBlock extends BlockBase {

    /**
     * {@inheritdoc}
     */
    public function build() {

        return array(
            '#theme' => 'webny_global_nav_header_block'
        );
    }
}
