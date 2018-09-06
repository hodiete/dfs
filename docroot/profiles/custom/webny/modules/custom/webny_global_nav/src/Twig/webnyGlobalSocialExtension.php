<?php

namespace Drupal\webny_global_nav\Twig;

/**
 * Class WebnyGlobalNavExtension extends \Twig_Extension.
 */
class WebnyGlobalSocialExtension extends \Twig_Extension {

    /**
     * Function getName()
     */
    public function getName() {
        return 'socialLinks.twig_extension';
    }

    /**
     * Function getFunctions.
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('getSocialLinks', array($this, 'getSocialLinks'), array(
                'is_safe' => array('html'),
            )),
        );
    }

    /**
     * Function getSocialLinks gets links from webny global nav social links and outputs as linked lists.
     */
    public function getSocialLinks() {
        $config = \Drupal::configFactory()->getEditable('webny_global_nav.settings');
        $social_build = $config->get('webny_global_nav.socialmedia');

        $final_build = NULL;
        foreach($social_build as $k => $v) {
            if($v != '' && $v != NULL) {
                $final_build .= "<li><a class=\"imgico_".$k."\" href=\"" . $v . "\">" . strtoupper($k) . "</a></li>";
            }
        }
        return $final_build;
    }

}
