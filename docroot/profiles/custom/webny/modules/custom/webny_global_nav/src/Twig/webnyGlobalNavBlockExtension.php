<?php

namespace Drupal\webny_global_nav\Twig;

/**
 * Class WebnyGlobalNavBlockExtension extends \Twig_Extension.
 */
class webnyGlobalNavBlockExtension extends \Twig_Extension {

    /**
     * Function getName()
     */
    public function getName() {
        return 'globalNavBlock.twig_extension';
    }

    /**
     * Function getFunctions.
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('globalNavBlock', array($this, 'globalNavBlock'), array(
                'is_safe' => array('html'),
            )),
        );
    }

    /**
     * Function renderBlockMenu.
     */
    public function globalNavBlock($menu_name, $type, $format) {
        $menu_tree = \Drupal::menuTree();

        // Build the typical default set of menu tree parameters.

        $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_name)->onlyEnabledLinks()->setMaxDepth(2);

        // Load the tree based on this set of parameters.
        $tree = $menu_tree->load($menu_name, $parameters);

        // Transform the tree using the manipulators you want.
        $manipulators = array(
            // Only show links that are accessible for the current user.
            array('callable' => 'menu.default_tree_manipulators:checkAccess'),
            // Use the default sorting of menu links.
            array('callable' => 'menu.default_tree_manipulators:generateIndexAndSort'),
        );
        $tree = $menu_tree->transform($tree, $manipulators);

        // Finally, build a renderable array from the transformed tree.
        $menu = $menu_tree->build($tree);

        return array('#markup' => drupal_render($menu));
    }

}
