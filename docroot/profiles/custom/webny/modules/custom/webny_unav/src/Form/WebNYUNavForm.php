<?php

/**
 * @file
 * Contains Drupal\webny_unav\Form\WebNYUNavForm
 */

namespace Drupal\webny_unav\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\system\Entity\Menu;
use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;

class WebNYUNavForm extends ConfigFormBase {

    /**
     * {@inheritdoc}.
     */
    public function getFormId() {
        return 'webny_unav_form';
    }

    /**
     * {@inheritdoc}.
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        // Form constructor
        $form = parent::buildForm($form, $form_state);
        // Default settings
        $config = $this->config('webny_unav.settings');
        $form['webny_unav_fieldset'] = $this->webnyNYUNavFieldsetField();
        $form['webny_unav_fieldset']['webny_unav_auto'] = $this->_webny_unav_auto_field();
        $form['webny_unav_fieldset']['webny_alt_unav_auto'] = $this->_webny_alt_unav_auto_field();

        $form['webny_alt_unav_fieldset'] = $this->webnyAltUNavFieldsetField();
        if ($config->get('webny_unav.webny_alt_unav_image') != '') {
          $form['webny_alt_unav_fieldset']['webny_alt_unav_image_render'] = $this->_webny_alt_unav_image_render();
        }
        $form['webny_alt_unav_fieldset']['webny_alt_unav_image'] = $this->_webny_alt_unav_image();
        $form['webny_alt_unav_fieldset']['webny_alt_unav_translate'] = $this->_webny_alt_unav_translation_field();
        $form['webny_alt_unav_fieldset']['webny_alt_unav_search'] = $this->_webny_alt_unav_search_field();

        $form['webny_alt_unav_fieldset']['webny_alt_unav_search_fieldset'] = $this->webnyAltUNavSearchFieldsetField();
        $form['webny_alt_unav_fieldset']['webny_alt_unav_search_fieldset']['webny_alt_unav_search_client'] = $this->_webny_alt_unav_search_client_field();
        $form['webny_alt_unav_fieldset']['webny_alt_unav_search_fieldset']['webny_alt_unav_search_collection'] = $this->_webny_alt_unav_search_collection_field();
        $form['webny_alt_unav_fieldset']['webny_alt_unav_search_fieldset']['webny_alt_unav_search_proxy_stylesheet'] = $this->_webny_alt_unav_search_proxy_stylesheet_field();

        return $form;
    }

    /**
     * {@inheritdoc}.
     */
    public function validateForm(array &$form, FormStateInterface $form_state)
    {

    }

    /**
     * {@inheritdoc}.
     */
    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        $config = \Drupal::configFactory()->getEditable('webny_unav.settings');
        $config->set('webny_unav.webny_unav_auto', $form_state->getValue('webny_unav_auto'));
        $config->set('webny_unav.webny_alt_unav_auto', $form_state->getValue('webny_alt_unav_auto'));
        $config->set('webny_unav.webny_alt_unav_translate', $form_state->getValue('webny_alt_unav_translate'));
        $config->set('webny_unav.webny_alt_unav_search', $form_state->getValue('webny_alt_unav_search'));
        $config->set('webny_unav.webny_alt_unav_search_client', $form_state->getValue('webny_alt_unav_search_client'));
        $config->set('webny_unav.webny_alt_unav_search_collection', $form_state->getValue('webny_alt_unav_search_collection'));
        $config->set('webny_unav.webny_alt_unav_search_proxy_stylesheet', $form_state->getValue('webny_alt_unav_search_proxy_stylesheet'));

        // check if image is uploaded
        $fids = $form_state->getValue(['webny_alt_unav_fieldset' => 'webny_alt_unav_image']);
        if (!empty($fids)) {
          $fid = $fids[0];
          $file = File::load($fid);
          // verify file is set as permanent and saved to database
          $file->setPermanent();
          $file->save();
          // register the file with the webny_unav module so it is not deleted via cron
          $file_usage = \Drupal::service('file.usage');
          $file_usage->add($file, 'webny_unav', 'webny_unav', \Drupal::currentUser()->id());

          $file_uri = $file->getFileUri();
          $style = ImageStyle::load('alternative_universal_navigation');
          $destination = $style->buildUri($file_uri);
          // create image style applied image and if successful add destination to config
          if ($style->createDerivative($file_uri, $destination)) {
            // pass url created by file_create_url to parse_url to pull path to save
            $parsed_url = parse_url(file_create_url($destination));
            $config->set('webny_unav.webny_alt_unav_image', $parsed_url['path']);
          }
        }

        $config->save();

        // CLEAR CACHE
        drupal_flush_all_caches();

        return parent::submitForm($form, $form_state);
    }

    /**
     * {@inheritdoc}.
     */
    protected function getEditableConfigNames()
    {
        return [
            'webny_unav.settings',
        ];
    }

    /**
     * NYS Universal Navigation fieldset field.
     *
     * @return array
     *   Form API element for field.
     */
    public function webnyNYUNavFieldsetField() {
      return array(
        '#type' => 'fieldset',
        '#title' => t('NYS Universal navigation Insertion options'),
        '#collapsible' => FALSE,
        '#collapsed' => FALSE,
      );
    }


    /**
     * NYS Universal Navigation automatic insertion field.
     *
     * @return array
     *   Form API element for field.
     */
    public function _webny_unav_auto_field() {
        $config = $this->config('webny_unav.settings');
        return array(
            '#type' => 'checkbox',
            '#title' => t('Enable the NYS Universal Navigation'),
            '#default_value' => $config->get('webny_unav.webny_unav_auto'),
            '#multiple' => FALSE,
            '#description' => t('Select if the universal navigation header and footer are to be automatically inserted into the page.  If not selected, make sure to use the WebNY Universal Navigation blocks'),
        );
    }

   /**
    * NYS Universal Alternate Navigation automatic insertion field.
    *
    * @return array
    *   Form API element for field.
    */
   public function _webny_alt_unav_auto_field() {
     $config = $this->config('webny_unav.settings');
     return array(
       '#type' => 'checkbox',
       '#title' => t('Enable the NYS Alternative Universal Navigation'),
       '#default_value' => $config->get('webny_unav.webny_alt_unav_auto'),
       '#multiple' => FALSE,
       '#description' => t('Select if the alternative universal navigation header is to be automatically inserted into the page.  If not selected, make sure to use the WebNY Alternate Universal Navigation block'),
     );
   }

  /**
   * NYS Alternative Universal Navigation options fieldset field
   *
   * @return array
   *   Form API element for field
   */
  public function webnyAltUNavFieldsetField() {
    return array(
      '#type' => 'fieldset',
      '#title' => t('NYS Alternative Universal Navigation Options'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );
  }

  /**
   * NYS Alternative Universal Navigation translation option
   *
   * @return array
   *   Form API element for field
   */
  public function _webny_alt_unav_translation_field() {
    $config = $this->config('webny_unav.settings');
    return array(
      '#type' => 'checkbox',
      '#title' => t('Enable translate for the NYS Alternative Universal Navigation'),
      '#default_value' => $config->get('webny_unav.webny_alt_unav_translate'),
      '#multiple' => FALSE,
      '#description' => t('Select if you would like to display a translate option in the Alternative Universal Navigation'),
    );
  }

  /**
   * NYS Alternative Universal Navigation search option
   *
   * @return array
   *   Form API element for field
   */
  public function _webny_alt_unav_search_field() {
    $config = $this->config('webny_unav.settings');
    return array(
      '#type' => 'checkbox',
      '#title' => t('Enable search for the NYS Alternative Universal Navigation'),
      '#default_value' => $config->get('webny_unav.webny_alt_unav_search'),
      '#multiple' => FALSE,
      '#description' => t('Select if you would like to display search on the Alternative Universal Navigation'),
    );
  }

  /**
   * NYS Universal Navigation fieldset field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyAltUNavSearchFieldsetField() {
    return array(
      '#type' => 'fieldset',
      '#title' => t('Google Search Appliance'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );
  }

  /**
   * NYS Alternative Universal Navigation search client data
   *
   * @return array
   *   Form API element for field
   */
  public function _webny_alt_unav_search_client_field() {
    $config = $this->config('webny_unav.settings');
    return array(
      '#type' => 'textfield',
      '#title' => t('GSA Client'),
      '#default_value' => $config->get('webny_unav.webny_alt_unav_search_client'),
      '#description' => t('Enter your GSA client name'),
    );
  }

  /**
   * NYS Alternative Universal Navigation search collection data
   *
   * @return array
   *   Form API element for field
   */
  public function _webny_alt_unav_search_collection_field() {
    $config = $this->config('webny_unav.settings');
    return array(
      '#type' => 'textfield',
      '#title' => t('GSA Collection'),
      '#default_value' => $config->get('webny_unav.webny_alt_unav_search_collection'),
      '#description' => t('Enter your GSA collection name'),
    );
  }

  /**
   * NYS Alternative Universal Navigation search proxy stylesheet data
   *
   * @return array
   *   Form API element for field
   */
  public function _webny_alt_unav_search_proxy_stylesheet_field() {
    $config = $this->config('webny_unav.settings');
    return array(
      '#type' => 'textfield',
      '#title' => t('GSA Proxy Stylesheet'),
      '#default_value' => $config->get('webny_unav.webny_alt_unav_search_proxy_stylesheet'),
      '#description' => t('Enter your GSA proxy stylesheet'),
    );
  }

  /**
   * NYS Alternative Universal Navigation image
   *
   * @return array
   *    Form API element for field
   */
  public function _webny_alt_unav_image() {
    return array(
      '#type' => 'managed_file',
      '#title' => t('Image'),
      '#multiple' => FALSE,
      '#description' => t('The uploaded image will be displayed on the Alternative Universal Navigation. Recommended: for optimal results, use a square image with a height of 70px (all images uploaded will be scaled down to 70px high).'),
      '#upload_location' => 'public://alternative_unav/',
    );
  }

  /**
   * NYS Alternative Universal Navigation rendered image
   *
   * @return array
   *    Form API element for field/markup
   */
  public function _webny_alt_unav_image_render() {
    $config = $this->config('webny_unav.settings');
    return array(
      '#type' => 'markup',
      '#markup' => '<p><strong>Current Image</strong></p><img id="alternative-unav-image" src="'. $config->get('webny_unav.webny_alt_unav_image') .'" />',
    );
  }
}