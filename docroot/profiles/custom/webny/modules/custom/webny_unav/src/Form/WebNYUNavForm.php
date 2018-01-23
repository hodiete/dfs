<?php

/**
 * @file
 * Contains Drupal\webny_unav\Form\WebNYUNavForm
 */

namespace Drupal\webny_unav\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\system\Entity\Menu;

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
        $config->save();
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
        '#title' => t('NYS Universal navigation options'),
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
       '#title' => t('Enable the NYS Alternate Universal Navigation'),
       '#default_value' => $config->get('webny_unav.webny_alt_unav_auto'),
       '#multiple' => FALSE,
       '#description' => t('Select if the alternate universal navigation header is to be automatically inserted into the page.  If not selected, make sure to use the WebNY Alternate Universal Navigation block'),
     );
   }
    
}