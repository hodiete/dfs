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
     * Static fucntion getParagraphTypes()
     *
     *  Passes a static list of values that will be used in the generic content type.
     *  todo: Dynamic method which will limit paragraph types. Convert this!
     *
     * @return array
     */
    public static function getGenericParagraphTypes() {
        return array(
            'webny_paragraph_contact' => 'field_webny_contact_card_link',
            'webny_documents' => 'field_webny_doc_card_link',
            'webny_whats_related_pgtype' => 'field_webny_whats_related_card',
            'webny_wysiwyg_pgtype' => 'field_webny_wysiwyg_card_link'
        );
    }

    /**
     * Static function createGenChapterString()
     *
     * @param $str
     *
     * Creates the #string-url to link to the specific area of the Generic Content Page.
     *
     * @return URL feature after hash
     *
     */

    public static function createGenChapterString($str) {
        $regex = '/[^a-zA-Z0-9]/';
        return preg_replace($regex, '-', strtolower(trim($str)));
    }

    /**
     *  Static Function getEntityTitle($field)
     *
     * @param $ent
     * @param $field
     *
     * @return title for card
     */

    public static function getEntityTitle($ent, $field){
        return $ent->entity->get($field)->entity->get('title')->value;
    }

    /**
     * Function addCardLinks
     */
    public function addCardLinks($nid) {

        // STATIC PARA VALS
        $gpt = $this->getGenericParagraphTypes();

        // SET NODE AND PARAGRAPH DATA
        $this_paragraph = null;
        $code_block = null;
        $node_storage = \Drupal::entityTypeManager()->getStorage('node');
        $node = $node_storage->load($nid);
        $aliaspath = \Drupal::service('path.alias_manager')->getAliasByPath('/node/'.$nid);

                // CONTENT TYPE ID
        $ct = $node->bundle();

        // VARIABLE VALUE OF THE CHECKBOX
        $checkval = null;

        // THIS WILL BE USED TO DETERMINE TOP THREE
        $display_counter = 0;

        // TITLE AND URL VARS
        $title  = NULL;
        $url    = NULL;

        // EVEN THOUGH THIS IS CALLED IN GPCT TEMPLATE, CHECK TO ENSURE THIS IS USED ONLY FOR GPCT
        if($ct === 'webny_generic_page'){

            // GO THROUGH EACH PARAGRAPH TYPE FOR THE GPCT SECTION FRAME
            foreach ($node->get('field_webny_gencp_contentsect') as $paragraph) {

                if($display_counter < 3) {

                    // GET THE TYPE OF ENTITY
                    switch ($paragraph->entity->getType()) {
                        case 'webny_paragraph_contact':
                            $checkval = $paragraph->entity->field_webny_contact_card_link->value;

                            /*
                             * // LOGIC TO BE USED FOR NDD-1499
                             *
                             * if($paragraph->entity->get('name_of_new_field')->value !== NULL &&
                             *    !empty($paragraph->entity->get('name_of_new_field')->value)){
                             *      $title = 'Contact '.$paragraph->entity->get('name_of_new_field')->value
                             * } else {
                             *      $title = 'Contact ' . $this->getEntityTitle($paragraph, 'field_webny_contact_pargrph_info');
                             * }
                             * */

                            // DETERMINE WHICH TITLE TO USE FOR CONTACT
                            $title = 'Contact ' . $this->getEntityTitle($paragraph, 'field_webny_contact_pargrph_info');
                            break;

                        case 'webny_documents':
                            $checkval = $paragraph->entity->field_webny_doc_card_link->value;

                            // DETERMINE WHICH TITLE TO USE FOR DOCUMENTS
                            if($paragraph->entity->get('field_webny_documents_title')->value !== NULL &&
                                !empty($paragraph->entity->get('field_webny_documents_title')->value)){
                                $title = $paragraph->entity->get('field_webny_documents_title')->value;
                            } else {
                                $title = $this->getEntityTitle($paragraph, 'field_webny_attached_documents');
                            }

                            break;

                        case 'webny_whats_related_pgtype':
                            $checkval = $paragraph->entity->field_webny_whats_related_card->value;

                            // DETERMINE WHICH TITLE TO USE FOR WHAT'S RELATED
                            if($paragraph->entity->get('field_webny_whats_related_title')->value !== NULL &&
                                !empty($paragraph->entity->get('field_webny_whats_related_title')->value)){
                                $title = $paragraph->entity->get('field_webny_whats_related_title')->value;
                            } else {
                                $title = $this->getEntityTitle($paragraph, 'field_webny_whats_related_title');
                            }

                            break;

                        case 'webny_wysiwyg_pgtype':
                            $checkval = $paragraph->entity->field_webny_wysiwyg_card_link->value;

                            // DETERMINE WHICH TITLE TO USE FOR WYSIWYG
                            if($paragraph->entity->get('field_webny_wysiwyg_title')->value !== NULL &&
                                !empty($paragraph->entity->get('field_webny_wysiwyg_title')->value)){
                                $title = $paragraph->entity->get('field_webny_wysiwyg_title')->value;
                            } else {
                                $title = $this->getEntityTitle($paragraph, 'field_webny_wysiwyg_title');
                            }

                            break;
                    };

                    if ($checkval === 'yes') {

                        $display_counter++;
                        $addedClass = '';

                        if($display_counter == 1){
                            $addedClass = 'first-card-link';
                        }

                        if($display_counter == 3){
                            $addedClass = 'last-card-link';
                        }

                        $url = $aliaspath . '#' . $this->createGenChapterString($title);
                        $code_block .= '<li class="'.$addedClass.'"><a href="'.$url.'">'.$title.'</a></li>';

                    }

                }

            }

            return $code_block;

        } // END IF
        else {
            return null;
        }
        
    }

}
