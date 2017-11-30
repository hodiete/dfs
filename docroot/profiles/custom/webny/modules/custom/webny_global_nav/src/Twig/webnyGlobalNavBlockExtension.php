<?php


namespace Drupal\webny_global_nav\Twig;
use Drupal\Core\Link;

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
    public function globalNavBlock($menu_name) {
        $menu_tree = \Drupal::menuTree();
        $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_name)->onlyEnabledLinks()->setMaxDepth(2);

        // Load the tree based on this set of parameters.
        $tree = $menu_tree->load($menu_name, $parameters);

        // Transform the tree using the manipulators you want.
        $manipulators = array(
            array('callable' => 'menu.default_tree_manipulators:checkAccess'),
            array('callable' => 'menu.default_tree_manipulators:generateIndexAndSort'),
        );

        // GET MENU TREE
        $tree = $menu_tree->transform($tree, $manipulators);

        $menu = $menu_tree->build($tree);

        // ASSIGN HTML CONST
        $ultop = '<ul class="gnav-ul">';
        $litop = '<li class="gnav-mitems gnav-topli" aria-expanded="false">';
        $ulsub = '<ul class="gnav-items-ul" aria-hidden="true">';
        $lisub = '<li>';
        $litopalt = '<li class="gnav-toplink">';
        $ulc = '</ul>';
        $lic = '</li>';

        // CREATE TOP LEVEL UL
        $newmenu = $ultop;

        // CREATE ELEMENTS
        foreach ($tree as $item) {

            // CHECK TYPE. IF STRING, PASS
            if(gettype($item->link->getTitle()) == 'string') {

                // TOP LEVEL LINK PARMS
                $title = $item->link->getTitle();
                $url = $item->link->getUrlObject();
                $link = Link::fromTextAndUrl(t($title), $url)->toString();

                if ($item->hasChildren) {

                    // PREASSIGN COUNT TO 1
                    $subcount = 1;
                    $firstChild = TRUE;
                    $lastChild = sizeof($item->subtree);

                    // ADD THE FIRST LEVEL LINK
                    $newmenu .= $litop . $link;

                    // ENSURE SIZE OF ARRAY BEFORE LOOPING
                    if ($lastChild > 0) {


                        foreach ($item->subtree as $subitem) {

                            // CHECK TYPE. IF STRING, PASS
                            if(gettype($subitem->link->getTitle()) == 'string') {

                                // SUBITEM META
                                $subtitle = $subitem->link->getTitle();
                                $suburl = $subitem->link->getUrlObject();
                                $sublink = Link::fromTextAndUrl(t($subtitle), $suburl)->toString();


                                // RUN THIS FIRST AND THATS ALL
                                if($firstChild){
                                    $newmenu .= $ulsub;
                                    $firstChild = FALSE;
                                }

                                // ADD TOP LEVEL LINK AS A LINK
                                if ($subcount == 1) {

                                    // BUILD LIST ITEM AND UL SUB ITEM
                                    if (!empty($url->toString())) {
                                        $newmenu .= $litopalt . $link . $lic;
                                    }

                                }

                                // CONSTRUCT SUBURL
                                $newmenu .= $lisub . $sublink . $lic;

                            } // END IF SUBITEM IS STRING

                            // INCREMENT SUBCOUNT
                            $subcount++;

                        } // END INNER FOR

                        // CLOSE THE UL AND TOP LEVEL LI ELEMENT
                        $newmenu .= $ulc . $lic;

                        unset($subitem);

                    };

                } else {

                    // CREATE A STAND ALONE LINK
                    $newmenu .= $litop . $link . $lic;

                } // END IF/ELSE

            } // END CHECK TYPE

        } // END FOR OUTTER

        // CLOSE MAIN CONTAINER
        $newmenu .= $ulc;

        return array('#markup' => $newmenu);
    }


}
