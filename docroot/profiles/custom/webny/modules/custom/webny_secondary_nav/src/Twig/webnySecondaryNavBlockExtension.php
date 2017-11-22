<?php

namespace Drupal\webny_secondary_nav\Twig;

/**
 * Class webnySecondaryNavBlockExtension extends \Twig_Extension.
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
            new \Twig_SimpleFunction('secondaryNavLinks', array($this, 'secondaryNavLinks'), array(
                'is_safe' => array('html'),
            )),
            new \Twig_SimpleFunction('wysiwygOneOutput', array($this, 'wysiwygOneOutput'), array(
                'is_safe' => array('html'),
            )),
            new \Twig_SimpleFunction('wysiwygTwoOutput', array($this, 'wysiwygTwoOutput'), array(
                'is_safe' => array('html'),
            )),
        );
    }

    /**
     * Function secondaryNavLinks.
     */
    public function secondaryNavLinks() {

        $config = \Drupal::config('webny_secondary_nav.settings');
        $secMenuOptions = $config->get('webny_secondary_nav.menu_section_two');
        $maxlinks       = $config->get('webny_secondary_nav.max_links');
        $startCount     = $config->get('webny_secondary_nav.start_count');
        $htmlLinks      = '';

        for($x = $startCount; $x <= $maxlinks; $x++) {

            $title = 'urltitle'.$x;
            $linkr = 'entref'.$x;

            // CONVERT NODE ID TO PATH
            $pathAlias  = \Drupal::service('path.alias_manager')->getAliasByPath('/node/'.$secMenuOptions[$linkr]);

            if($pathAlias === null){
                $pathAlias = 'node/'.$secMenuOptions[$linkr];
            }

            // ONLY LOOK AT THE TITLE, THE FUTURE MAY HAVE TITLES IN LINKS THAT ARE NOT LINKED
            // TRUE STORY
            if(!empty($secMenuOptions[$title])){
                $htmlLinks .= '<li><a href="'.$pathAlias.'">'.$secMenuOptions[$title].'</a></li>';
            }

        }

        return $htmlLinks;

    }

    /**
     * Function wysiwygOneOutput.
     */
    public function wysiwygOneOutput(){

        $config     = \Drupal::config('webny_secondary_nav.settings');
        $wysiwyg    = $config->get('webny_secondary_nav.menu_section_one.wysiwyg_area_one');
        return $wysiwyg['value'];

    }

    /**
     * Function wysiwygTwoOutput.
     */
    public function wysiwygTwoOutput(){

        $config     = \Drupal::config('webny_secondary_nav.settings');
        $wysiwyg    = $config->get('webny_secondary_nav.menu_section_two.wysiwyg_area_two');
        return $wysiwyg['value'];

    }


}
