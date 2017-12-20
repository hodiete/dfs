<?php

namespace Drupal\webny_secondary_nav\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use \Drupal\Core\Url;

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
     * Function validate Form.
     */
    public function validateForm(array &$form, FormStateInterface $form_state) {

    }

    /**
     * Function buildForm.
     */
    public function buildForm(array $form, FormStateInterface $form_state) {

        // Form constructor.
        $form = parent::buildForm($form, $form_state);

        // CONFIGURATION SETTINGS
        $config = $this->config('webny_secondary_nav.settings');

        $max_links          = $config->get('webny_secondary_nav.max_links');
        $start_count        = $config->get('webny_secondary_nav.start_count');
        $linkarea_count     = $config->get('webny_secondary_nav.count');

        // =========================================================================================================
        // DISPLAY TITLE AND HELP OPTIONS
        $form['secnav_helptext'] = $this->helpText();

        // =========================================================================================================
        // DISPLAY OPTIONS FIELDSET AND MARKUP
        $form['secnav_set'] = $this->displayFieldset();
        $form['secnav_set']['page_choices'] = $this->pageChoices();
        $form['secnav_set']['secnav_specific_page'] = $this->specificPageOption();

        // =========================================================================================================
        // FIELDSET AND WYSIWYG AREA ONE
        $form['secnav_set1'] = $this->headerWYSIWYGFieldset();
        $form['secnav_set1']['secnav_first_opts'] = $this->sectionOnePageChoices();
        $form['secnav_set1']['wysiwyg_area_one'] = $this->WYSIWYGAreaOne();

        // =========================================================================================================
        // LINKED FIELDS AREA
        $form['secnav_set2'] = $this->headerlinksFieldset();



        //$form['secnav_set2']['fieldarea'] = $this->secondAreaOptionArea();
        $form['secnav_set2']['fieldarea']['secnav_second_opts'] = $this->secondSectionChoices();

        // WYSIWYG AREA TWO
        $form['secnav_set2']['wysiwyg_area_two'] = $this->WYSIWYGAreaTwo();

        // FORM WRAPPER
        $form['secnav_set2']['linkarea'] = $this->secondAreaLinksArea();

        // LOOP THROUGH 10 TIMES
        for($x = $start_count; $x <= $max_links; $x++) {

            // TITLE/ENTREF NAMING
            $title_name     = 'urltitle'.$x;
            $entref_name    = 'entref'.$x;

            $form['secnav_set2']['linkarea'][$x]               = $this->linksArea($x);
            $form['secnav_set2']['linkarea'][$x][$title_name]  = $this->URLTitleField($x);
            $form['secnav_set2']['linkarea'][$x][$entref_name] = $this->entityReferenceField($x);

            //dsm($form['secnav_set2']['linkarea'][$x][$entref_name]);

        }

        $form['secnav_set2']['linkarea']['wrap'] = $this->linkButtonsWrapper();
        $form['secnav_set2']['linkarea']['wrap']['addbutton'] = $this->addMoreButton();
        $form['secnav_set2']['linkarea']['wrap']['removebutton'] = $this->removeLinkButton();

        // CHECK LINKS FOR DEFAULT VALUES AND APPLY CLASSES AS NECESSARY
        // LOOP THROUGH 10 TIMES -- AGAIN
        for($x = $start_count; $x <= $max_links; $x++) {

            // TITLE/ENTREF NAMING
            $title_name     = 'urltitle'.$x;
            $entref_name    = 'entref'.$x;

            $thisTitle  = $form['secnav_set2']['linkarea'][$x][$title_name]['#default_value'];
            $thisEntRef = $form['secnav_set2']['linkarea'][$x][$entref_name]['#default_value'];

            // ADD OR SHOW HIDDEN CLASS
            if($x === 1 || (!empty($thisTitle) && !empty($thisEntRef))) {
                $field_class = 'secnav-linkarea-show';
            } else {
                $field_class = 'secnav-linkarea-hide';
            }

            $form['secnav_set2']['linkarea'][$x]['#prefix'] = '<div class="'.$field_class.' secnav-area" id="secnav-linksarea-'.$x.'">';
            $form['secnav_set2']['linkarea'][$x]['#suffix'] = '</div>';

            unset($title_name,$entref_name,$thisTitle,$thisEntRef);

        }

        return $form;
    }

    /**
     * Function submitForm.
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {

        // GET NAVIGATION SETTINGS DATA CONFIG OBJECT
        $config     = \Drupal::configFactory()->getEditable('webny_secondary_nav.settings');
        $blockConfig = \Drupal::configFactory()->getEditable('block.block.webnysecondarynavigationblock');

        // SET BLOCK CONFIG AS HOMEPAGE
        if($form_state->getValue('page_choices') === 'home'){

            $homepage = \Drupal::config('system.site')->get('page.front');

            $blockConfig->set('visibility', [])
                ->set('visibility.request_path', [])
                ->set('visibility.request_path.id', 'request_path')
                ->set('visibility.request_path.pages', $homepage)
                ->set('visibility.request_path.negate', false)
                ->set('visibility.request_path.context_mapping', [])
                ->save();

        } else {
            $blockConfig->set('visibility', [])->save();
        }


        // SECONDARY NAVIGATION SETTINGS -- SET VALUES ON SUBMIT
        $config->set('webny_secondary_nav.options.page_choices',                $form_state->getValue('page_choices'))
            ->set('webny_secondary_nav.options.secnav_specific_page',           $form_state->getValue('secnav_specific_page'))

            // MENU: FIRST SECTION
            ->set('webny_secondary_nav.menu_section_one.secnav_first_opts',     $form_state->getValue('secnav_first_opts'))
            ->set('webny_secondary_nav.menu_section_one.wysiwyg_area_one',      $form_state->getValue('wysiwyg_area_one'))

            // MENU: SECOND SECTION
            ->set('webny_secondary_nav.menu_section_two.secnav_second_opts',    $form_state->getValue('secnav_second_opts'))
            ->set('webny_secondary_nav.menu_section_two.wysiwyg_area_two',      $form_state->getValue('wysiwyg_area_two'))

            // LINKFIELDS
            ->set('webny_secondary_nav.menu_section_two.urltitle1',             $form_state->getValue('urltitle1'))
            ->set('webny_secondary_nav.menu_section_two.entref1',               $form_state->getValue('entref1'))
            ->set('webny_secondary_nav.menu_section_two.urltitle2',             $form_state->getValue('urltitle2'))
            ->set('webny_secondary_nav.menu_section_two.entref2',               $form_state->getValue('entref2'))
            ->set('webny_secondary_nav.menu_section_two.urltitle3',             $form_state->getValue('urltitle3'))
            ->set('webny_secondary_nav.menu_section_two.entref3',               $form_state->getValue('entref3'))
            ->set('webny_secondary_nav.menu_section_two.urltitle4',             $form_state->getValue('urltitle4'))
            ->set('webny_secondary_nav.menu_section_two.entref4',               $form_state->getValue('entref4'))
            ->set('webny_secondary_nav.menu_section_two.urltitle5',             $form_state->getValue('urltitle5'))
            ->set('webny_secondary_nav.menu_section_two.entref5',               $form_state->getValue('entref5'))
            ->set('webny_secondary_nav.menu_section_two.urltitle6',             $form_state->getValue('urltitle6'))
            ->set('webny_secondary_nav.menu_section_two.entref6',               $form_state->getValue('entref6'))
            ->set('webny_secondary_nav.menu_section_two.urltitle7',             $form_state->getValue('urltitle7'))
            ->set('webny_secondary_nav.menu_section_two.entref7',               $form_state->getValue('entref7'))
            ->set('webny_secondary_nav.menu_section_two.urltitle8',             $form_state->getValue('urltitle8'))
            ->set('webny_secondary_nav.menu_section_two.entref8',               $form_state->getValue('entref8'))
            ->set('webny_secondary_nav.menu_section_two.urltitle9',             $form_state->getValue('urltitle9'))
            ->set('webny_secondary_nav.menu_section_two.entref9',               $form_state->getValue('entref9'))
            ->set('webny_secondary_nav.menu_section_two.urltitle10',            $form_state->getValue('urltitle10'))
            ->set('webny_secondary_nav.menu_section_two.entref10',              $form_state->getValue('entref10'))

            ->save();

        // CLEAR CACHE
        drupal_flush_all_caches();

        parent::submitForm($form, $form_state);
    }

    /**
     * Function getEditableConfigNames.
     */
    protected function getEditableConfigNames() {

        return [
            'webny_secondary_nav.settings',
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
                                  depending on your need.<br /><br />'
                                  ),
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
            '#title' => t('Menu: First Section'),
            '#open' => FALSE,
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - fieldset SECOND AREA.
     */
    public function headerlinksFieldset() {
        return array(
            '#type' => 'details',
            '#title' => t('Menu: Second Section'),
            '#open' => FALSE,
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

        // CONFIGURATION SETTINGS
        $config = $this->config('webny_secondary_nav.settings');
        $dbval = $config->get('webny_secondary_nav.options.page_choices');

        return array(
            '#type' => 'radios',
            '#title' => t('Choose where to display the Secondary Navigation - ' . $dbval),
            '#options' => array(
                'none'=>t('Disabled'),
                'all'=>t('All web pages'),
                'home'=>t('Home page only'),
                //'specific'=>t('Choose a specific page'),
            ),
            '#default_value' => $dbval,
            '#attributes' => array()
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - ENTITY REFERENCE FOR SPECIFIC PAGE CHOICE.
     */
    public function specificPageOption() {

        $config = $this->config('webny_secondary_nav.settings');
        $nid = $config->get('webny_secondary_nav.options.secnav_specific_page');

        if(!empty($nid)){
            $entity = Node::load($nid);
        } else {
            $entity = '';
        }

        return array(
            '#type' => 'entity_autocomplete',
            '#title' => t('Choose a specific page to display the secondary navigation.'),
            '#target_type' => 'node',
            '#size' => 70,
            '#maxlength' => 550,
            '#prefix' => '<div id="secnav-entref-specpage">',
            '#suffix' => '</div>',
            '#selection_setttings' => array(),
            '#default_value' => $entity,
            '#attributes' => array(

            )
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - radio choices for section one
     */
    public function sectionOnePageChoices() {

        $config = $this->config('webny_secondary_nav.settings');
        $dbval = $config->get('webny_secondary_nav.menu_section_one.secnav_first_opts');

        return array(
            '#type' => 'radios',
            '#title' => t('Choose an option for the secondary navigation menu\'s left side.'),
            '#options' => array(
                'none_one'=>t('Do not display'),
                'wysiwyg_one'=>t('WYSIWYG'),
            ),
            '#default_value' => $dbval,
            '#attributes' => array(
                'name'=>'secnav_first_opts'
            )
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - WYSIWYG AREA ONE.
     */
    public function WYSIWYGAreaOne() {

        $config = $this->config('webny_secondary_nav.settings');
        $dbval = $config->get('webny_secondary_nav.menu_section_one.wysiwyg_area_one');

        return array(
            '#title' => $this->t('WYSIWYG'),
            '#type' => 'text_format',
            '#format' => 'basic_html',
            '#default_value' => $dbval['value'],
            '#maxlength' => NULL,
            '#prefix' => '<div id="secnav-wysiwyg-one" class="">',
            '#suffix' => '</div>',
            '#attributes' => array(
                'class' => array('field_info_one'),
                'rows' => '5',
                'cols' => '100',
            ),
            '#wysiwyg' => TRUE,
            '#allowed_formats' => array('full_html', 'basic_html'),
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

        $config = $this->config('webny_secondary_nav.settings');
        $dbval = $config->get('webny_secondary_nav.menu_section_two.secnav_second_opts');

        return array(
            '#type' => 'radios',
            '#title' => t('Choose an option for the secondary navigation menu\'s right side.'),
            '#options' => array(
                'none_two'=>t('Do not display'),
                'wysiwyg_two'=>t('WYSIWYG'),
                'links_two'=>t('Links'),
            ),
            '#default_value' => $dbval,
            '#attributes' => array(
                'name'=>'secnav_second_opts'
            )
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - WYSIWYG AREA TWO.
     */
    public function WYSIWYGAreaTwo() {

        $config = $this->config('webny_secondary_nav.settings');
        $dbval = $config->get('webny_secondary_nav.menu_section_two.wysiwyg_area_two');

        return array(
            '#title' => $this->t('WYSIWYG'),
            '#type' => 'text_format',
            '#format' => 'basic_html',
            '#default_value' => $dbval['value'],
            '#maxlength' => NULL,
            '#prefix' => '<div id="secnav-wysiwyg-two">',
            '#suffix' => '</div>',
            '#attributes' => array(
                'class' => array('field_info_two'),
                'rows' => '5',
                'cols' => '100',
            ),
            '#wysiwyg' => TRUE,
            '#allowed_formats' => array('full_html', 'basic_html'),
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
    public function linksArea($n) {

        return array(
            '#type' => 'fieldset',
            '#prefix' => '<div class="secnav-area" id="secnav-linksarea-'.$n.'">',
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

        $config = $this->config('webny_secondary_nav.settings');
        $nid = $config->get('webny_secondary_nav.menu_section_two.entref'.$n);

        if(!empty($nid)){
            $entity = Node::load($nid);
        } else {
            $entity = '';
        }

        return array(
            '#type' => 'entity_autocomplete',
            '#title' => t('URL / Reference'),
            '#maxlength' => NULL,
            '#target_type' => 'node',
            '#default_value' => $entity,
            '#size' => 70,
            '#prefix' => '<div id="secnav-entref-'.$n.'">',
            '#suffix' => '</div>',
            '#selection_setttings' => array(),
            '#attributes' => array(
                'name' => 'entref'.$n
            ),
        );
    }

    /**
     * WEBNY SECONDARY NAVIGATION - URL TEXT FIELD.
     */
    public function URLTitleField($n) {

        $config = $this->config('webny_secondary_nav.settings');
        $dbval = $config->get('webny_secondary_nav.menu_section_two.urltitle'.$n);

        return array(
            '#type' => 'textfield',
            '#title' => $this->t('URL Title'),
            '#default_value' => $dbval,
            '#size' => 70,
            '#maxlength' => 50,
            '#prefix' => '<div id="secnav-urltitle-'.$n.'">',
            '#suffix' => '</div>',
            '#required' => FALSE,
            '#attributes' => array(
                'name' => 'urltitle'.$n
            )
        );
    }


    /**
     * WEBNY SECONDARY NAVIGATION - BUTTON WRAPPER
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
            '#value' => $this->t('Add a Link Field'),
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
