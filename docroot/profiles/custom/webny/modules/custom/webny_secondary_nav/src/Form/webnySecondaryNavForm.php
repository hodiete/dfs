<?php

namespace Drupal\webny_secondary_nav\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Ajax\UpdateBuildIdCommand;
use Drupal\Core\Config\ConfigFactoryInterface;

/**
 * WEBNY SECONDARY NAVIGATION FORM SECTION
 */

/**
 * Class webnyGlobalNavForm.
 */
class webnySecondaryNavForm extends ConfigFormBase {

    /**
     * Function getFormid.
     */
    public function getFormId() {
        return 'webny_secondary_nav_config_form';
    }

    /**
     * Function buildForm.
     */
    public function buildForm(array $form, FormStateInterface $form_state) {

        // Form constructor.
        $form = parent::buildForm($form, $form_state);

        // CONFIGURATION SETTINGS
        $config = \Drupal::service('config.factory')->getEditable('webny_secondary_nav.settings');

        //$linkarea_count     = $config->get('webny_secondary_nav.linksarea.count');
        $max_links          = $config->get('webny_secondary_nav.linksarea.max_links');
        $start_count        = $config->get('webny_secondary_nav.linksarea.start_count');
        $linkarea_count     = $config->get('webny_secondary_nav.linksarea.count');

        // =========================================================================================================
        // DISPLAY TITLE AND HELP OPTIONS
        $form['secnav_helptext'] = $this->helpText();

        // =========================================================================================================
        // DISPLAY OPTIONS FIELDSET AND MARKUP
        $form['secnav_displayfieldset'] = $this->displayFieldset();
        $form['secnav_displayfieldset']['page_choices'] = $this->pageChoices();
        $form['secnav_displayfieldset']['specific_page'] = $this->specificPageOption();

        // =========================================================================================================
        // FIELDSET AND WYSIWYG AREA ONE
        $form['secnav_set1'] = $this->headerWYSIWYGFieldset();
        $form['secnav_set1']['options'] = $this->sectionOnePageChoices();
        $form['secnav_set1']['wysiwyg_area_one'] = $this->WYSIWYGAreaOne();

        // =========================================================================================================
        // LINKED FIELDS AREA
        $form['secnav_set2'] = $this->headerlinksFieldset();


        //$form['secnav_set2']['fieldarea'] = $this->secondAreaOptionArea();
        $form['secnav_set2']['fieldarea']['options'] = $this->secondSectionChoices();



        // WYSIWYG AREA TWO
        $form['secnav_set2']['wysiwyg_area_two'] = $this->WYSIWYGAreaTwo();


        // FORM WRAPPER
        $form['secnav_set2']['linkarea'] = $this->secondAreaLinksArea();

        // LOOP THROUGH 10 TIMES
        for($x = $start_count; $x <= $max_links; $x++) {

            // ADD OR SHOW HIDDEN CLASS
            if($x <= $linkarea_count) {
                $field_class = 'secnav-linkarea-show';
            } else {
                $field_class = 'secnav-linkarea-hide';
            }

            $form['secnav_set2']['linkarea'][$x]                   = $this->linksArea($x,$field_class);
            $form['secnav_set2']['linkarea'][$x]['links_title']    = $this->URLTitleField($x);
            $form['secnav_set2']['linkarea'][$x]['links_url']      = $this->entityReferenceField($x);

        }

        $form['secnav_set2']['linkarea']['wrap'] = $this->linkButtonsWrapper();
        $form['secnav_set2']['linkarea']['wrap']['addbutton'] = $this->addMoreButton();
        $form['secnav_set2']['linkarea']['wrap']['removebutton'] = $this->removeLinkButton();

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
     */
    public function helpText() {
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
     */
    public function displayFieldset() {
        return array(
            '#type' => 'details',
            '#title' => t('Secondary Navigation Options'),
            '#open' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - fieldset FIRST AREA -- WYSIWYG.
     *
     * @return array
     *   Form API element for field.
     */
    public function headerWYSIWYGFieldset() {
        return array(
            '#type' => 'details',
            '#title' => t('Menu Section One'),
            '#open' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - fieldset SECOND AREA.
     */
    public function headerlinksFieldset() {
        return array(
            '#type' => 'details',
            '#title' => t('Menu Section Two'),
            '#open' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - fieldset field.
     */
    public function displayExamples() {
        return array(
            '#type' => 'details',
            '#title' => t('Secondary Navigation Examples/Help'),
            '#open' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - radio choices for all or homepage.
     */
    public function pageChoices() {
        return array(
            '#type' => 'radios',
            '#title' => t('Choose where to display the Secondary Navigation'),
            '#options' => array(
                'none'=>t('Disabled'),
                'all'=>t('All web pages'),
                'home'=>t('Home page only'),
                'specific'=>t('Choose a specific page'),
            ),
            '#default_value' => 'none',
            '#attributes' => array(
                'name'=>'secnav-settings-opts'
            )
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - ENTITY REFERENCE FOR SPECIFIC PAGE CHOICE.
     */
    public function specificPageOption() {

        return array(
            '#type' => 'entity_autocomplete',
            '#title' => t('Choose a specific page to display the secondary navigation.'),
            '#target_type' => 'node',
            '#default_value' => '',
            '#size' => 70,
            '#prefix' => '<div id="secnav-entref-specpage">',
            '#suffix' => '</div>',
            '#selection_setttings' => array(),
            '#attributes' => array(

            )
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - radio choices for section one
     */
    public function sectionOnePageChoices() {
        return array(
            '#type' => 'radios',
            '#title' => t('Choose an option for the secondary navigation menu\'s left side.'),
            '#options' => array(
                'none_one'=>t('Do not display'),
                'wysiwyg_one'=>t('WYSIWYG'),
            ),
            '#default_value' => 'none_one',
            '#attributes' => array(
                'name'=>'secnav-first-opts'
            )
        );
    }


    /**
     * WEBNY SECONDARY NAVIGATION - WYSIWYG AREA ONE.
     */
    public function WYSIWYGAreaOne() {
        return array(
            '#title' => $this->t('WYSIWYG'),
            '#type' => 'text_format',
            '#format' => 'basic_html',
            '#default_value' => '',
            '#maxlength' => 250,
            '#prefix' => '<div id="secnav-wysiwyg-one" class="">',
            '#suffix' => '</div>',
            '#attributes' => array(
                'class' => array('field_info_one'),
                'rows' => '5',
                'cols' => '100',
            ),
            '#wysiwyg' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - LINKS AREA.
     */
    public function secondAreaOptionArea() {
        return array(
            '#type' => 'fieldset',
            '#prefix' => '<div class="secnav-options-area" id="secnav-options-area">',
            '#suffix' => '</div>',
            '#title' => $this->t('Choose an option.'),
            '#attributes' => array(
                'class' => array( )
            )
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - RADIO CHOICES TO SELECT A WYSIWYG OR THE LINK SECTION
     */
    public function secondSectionChoices() {
        return array(
            '#type' => 'radios',
            '#title' => t('Choose an option for the secondary navigation menu\'s right side.'),
            '#options' => array(
                'none_two'=>t('Do not display'),
                'wysiwyg_two'=>t('WYSIWYG'),
                'links_two'=>t('Links'),
            ),
            '#default_value' => 'none_two',
            '#attributes' => array(
                'name'=>'secnav-second-opts'
            )
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - WYSIWYG AREA TWO.
     */
    public function WYSIWYGAreaTwo() {
        return array(
            '#title' => $this->t('WYSIWYG'),
            '#type' => 'text_format',
            '#format' => 'basic_html',
            '#default_value' => '',
            '#maxlength' => 250,
            '#prefix' => '<div id="secnav-wysiwyg-two">',
            '#suffix' => '</div>',
            '#attributes' => array(
                'class' => array('field_info_two'),
                'rows' => '6',
                'cols' => '100',
            ),
            '#wysiwyg' => TRUE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - LINKS AREA.
     */
    public function secondAreaLinksArea() {
        return array(
            '#type' => 'fieldset',
            '#prefix' => '<div class="secnav-linkarea-wrap" id="secnav-linkarea-wrap">',
            '#suffix' => '</div>',
            '#title' => '',
            '#attributes' => array()
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - LINKS AREA.
     */
    public function linksArea($n, $field_class) {
        return array(
            '#type' => 'fieldset',
            '#prefix' => '<div class="'.$field_class.' secnav-area" id="secnav-linksarea-'.$n.'">',
            '#suffix' => '</div>',
            '#title' => $this->t('ADD A LINK AND A TITLE '),
            '#attributes' => array(
                'data-secnav-linknum' => $n,
            ),
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - ENTITY REFERENCE.
     */
    public function entityReferenceField($n) {

        return array(
            '#type' => 'entity_autocomplete',
            '#title' => t('URL / Reference'),
            '#target_type' => 'node',
            '#default_value' => '',
            '#size' => 70,
            '#prefix' => '<div id="secnav-entref-'.$n.'">',
            '#suffix' => '</div>',
            '#selection_setttings' => array(),
            '#attributes' => array(
                'data-secnav-erefnum' => $n,
            ),
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - URL TEXT FIELD.
     */
    public function URLTitleField($n) {

        return array(
            '#type' => 'textfield',
            '#title' => $this->t('URL Title'),
            '#default_value' => '',
            '#size' => 70,
            '#maxlength' => 50,
            '#prefix' => '<div id="secnav-urltitle-'.$n.'">',
            '#suffix' => '</div>',
            '#required' => FALSE,
        );
    }


    /**
     * WEBNY SECONDARY NAVIGATION - ADD A LINK FIELD
     */
    public function linkButtonsWrapper() {
        return array(
            '#type' => 'fieldset',
            '#prefix' => '<div class="secnav-button-area container-inline" id="secnav-button-area">',
            '#suffix' => '</div>',
            '#title' => '',
            '#attributes' => array(

            ),
        );
    }


    /**
     * WEBNY SECONDARY NAVIGATION - ADD A LINK FIELD
     */
    public function addMoreButton() {

        return array(
            '#type' => 'button',
            '#value' => $this->t('Add Another Link Field'),
            '#is_button' => TRUE,
            '#description' => '',
            '#prefix' => '<div id="secnav-addlinkarea">',
            '#suffix' => '</div>',
            '#executes_submit_callback' => FALSE,
            '#attributes' => array(
                'class' => array(''),
                'type' => 'button',
                'name' => 'secnav-addmore-links'
             ),
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - REMOVE A LINK FIELD
     */
    public function removeLinkButton() {

        return array(
            '#type' => 'button',
            '#value' => $this->t('Remove a Link Field'),
            '#is_button' => TRUE,
            '#description' => '',
            '#prefix' => '<div id="secnav-removelinkarea">',
            '#suffix' => '</div>',
            '#executes_submit_callback' => FALSE,
            '#attributes' => array(
                'class' => array(''),
                'type' => 'button',
                'name' => 'secnav-removeone-link'
            ),
        );
    }

    // ################################################################################################################
    // HELPER METHODS

} // END OBJ
