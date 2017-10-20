<?php

namespace Drupal\webny_secondary_nav\Twig;

/**
 * Class WebnySecondaryNavBlockExtension extends \Twig_Extension.
 */
class webnySecondaryNavBlockExtension extends \Twig_Extension {

    /**
     * Function getName()
     */
    public function getName() {
        return 'secondaryNavBlock.twig_extension';
    }

    /**
     * Function getFunctions.
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('secondaryNavBlock', array($this, 'secondaryNavBlock'), array(
                'is_safe' => array('html'),
            )),
        );
    }

    /**
     * Function renderBlockMenu.
     */
    public function secondaryNavBlock() {

        return array('#markup' => '');
    }

}
