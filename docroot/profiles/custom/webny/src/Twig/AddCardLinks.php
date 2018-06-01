<?php

namespace Drupal\webny\Twig;

class AddCardLinks extends \Twig_Extension {

    /**
     * Gets a unique identifier for this Twig extension.
     */
    public function getName() {
        return 'webny_addcardlinks.twig_extension';
    }

    /**
     * Function getFunctions.
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('addCardLinks', array($this, 'addCardLinks'), array(
                'is_safe' => array('html'),
            )),
        );
    }

    /**
     * Stuff to do
     */
    public function addCardLinks($nid) {

        // SET NODE AND PARAGRAPH DATA
        $this_paragraph = null;
        $node_storage = \Drupal::entityTypeManager()->getStorage('node');
        $node = $node_storage->load($nid);
        $ct = $node->bundle();


        foreach ($node->get('field_webny_gencp_contentsect') as $paragraph) {
            if ($paragraph->entity->getType() == 'webny_paragraph_contact') {
                $this_paragraph = $paragraph->entity;
            }
        }


        return "This output works NID: $nid. BUNDLE: " . $ct . " Contact Length: " . count($this_paragraph);
    }

}
