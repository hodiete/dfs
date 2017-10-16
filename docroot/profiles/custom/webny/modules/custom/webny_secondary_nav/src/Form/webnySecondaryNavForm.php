<?php

namespace Drupal\webny_secondary_nav\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\system\Entity\Menu;

/**
 * WEBNY SECONDARY NAVIGATION FORM SECTION
 */

/**
 * Class webnyGlobalNavForm.
 */
class webnySecondaryNavForm extends ConfigFormBase {

    /**
     * Fucntion getFormid.
     */
    public function getFormId() {
        return 'webny_secondary_nav_form';
    }

    /**
     * Function buildForm.
     */
    public function buildForm(array $form, FormStateInterface $form_state) {

        // Form constructor.
        $form = parent::buildForm($form, $form_state);

        // Default settings.
        $config = $this->config('webny_secondary_nav.settings');


        // DISPLAY TITLE AND HELP OPTIONS
        $form['webny_secnav_helptext'] = $this->webnySecondaryNavHelpText();

        // DISPLAY OPTIONS FIELDSET AND MARKUP
        $form['webny_secnav_displayfieldset'] = $this->webnySecondaryNavDisplayFieldset();
        $form['webny_secnav_displayfieldset']['webny_page_choices'] = $this->webnySecondaryNavPageChoices();

        // FIELDSET AND WYSIWYG
        $form['webny_secnav_wysiwygfieldset'] = $this->webnySecondaryNavHeaderWYSIWYGFieldset();
        $form['webny_secnav_wysiwygfieldset']['webny_wysiwyg_area'] = $this->webnySecondaryNavWYSIWYGArea();

        // LINKED FIELDS AREA
        $form['webny_secnav_linksfieldset'] = $this->webnySecondaryNavHeaderlinksFieldset();
        $form['webny_secnav_linksfieldset']['webny_links_area'] = $this->webnySecondaryNavLinksArea();

        // EXAMPLES / HELP SECTION
        $form['webny_secnav_examples'] = $this->webnySecondaryNavDisplayExamples();


        return $form;
    }


    /**
     * Function submitForm.
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        return parent::submitForm($form, $form_state);
    }

    /**
      * Function getEditableConfigNames.
      */
    protected function getEditableConfigNames() {

      return [
        'webny_global_nav.settings',
      ];
    }
      
    // ################################################################################################################
    // THIS SECTION DEFINES BLOCKS OF HTML FOR THE FORM CONFIGURATION PAGE
    /**
     * WEBNY SECONDARY NAVIGATION - Help Text
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavHelpText() {
        return array(

            '#markup' => $this->t('Use this page to add information for secondary navigation under the global navigation 
                                 (agency) menu. Use the WYSIWYG box to enter a 250 character message. The Link section
                                  will be available to use to add up to 10 links. Use both sections or each individual,
                                  depending on your need.'),
            '#prefix' => '<p>',
            '#suffix' => '</p>',
        );
    }



    /**
     * WEBNY SECONDARY NAVIGATION - fieldset field.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavDisplayFieldset() {
        return array(
            '#type' => 'details',
            '#title' => t('Secondary Navigation Options'),
            '#open' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - fieldset WYSIWYG.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavHeaderWYSIWYGFieldset() {
        return array(
            '#type' => 'details',
            '#title' => t('WYSIWYG Text Area'),
            '#open' => FALSE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - fieldset WYSIWYG.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavHeaderlinksFieldset() {
        return array(
            '#type' => 'details',
            '#title' => t('Links'),
            '#open' => FALSE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - fieldset field.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavDisplayExamples() {
        return array(
            '#type' => 'details',
            '#title' => t('Secondary Navigation Examples/Help'),
            '#open' => TRUE,
        );
    }


    /**
     * WEBNY SECONDARY NAVIGATION - radio choices for all or homepage.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavPageChoices() {
        return array(
            '#type' => 'radios',
            '#title' => t('Choose where to display the Secondary Navigation'),
            '#options' => array(
                'none'=>t('Disabled'),
                'all'=>t('All web pages'),
                'home'=>t('Home page only'),
            ),
            '#default_value' => 'none',
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - WYSIWYG AREA.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavWYSIWYGArea() {
        return array(
            '#title' => t('Message'),
            '#type' => 'text_format',
            '#format' => 'basic_html',
            '#default_value' => '',
            '#maxlength' => 250,
            '#attributes' => array(
                'class' => array('field_info'),
                'rows' => '5',
                'cols' => '200',
            ),
            '#wysiwyg' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - LINKS AREA.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnySecondaryNavLinksArea() {
        return array(
            '#type' => 'url',
            '#title' => $this->t('Home Page'),
            '#size' => 30,
        );
    }







} // END OBJ
