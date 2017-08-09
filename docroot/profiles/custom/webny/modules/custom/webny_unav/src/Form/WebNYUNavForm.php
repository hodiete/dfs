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

        $form['webny_unav_auto'] = $this->_webny_unav_auto_field();
        $form['webny_unav_interactive'] = $this->_webny_unav_interactive_field();

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
        $config->set('webny_unav.webny_unav_interactive', $form_state->getValue('webny_unav_interactive'));
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
     * NYS Universal Navigation footer automatic insertion field.
     *
     * @return array
     *   Form API element for field.
     */
    public function _webny_unav_auto_field() {
        $config = $this->config('webny_unav.settings');
        return array(
            '#type' => 'checkbox',
            '#title' => t('Universal navigation footer automatic insertion'),
            '#default_value' => $config->get('webny_unav.webny_unav_auto'),
            '#multiple' => FALSE,
            '#description' => t('Select if the universal navigation header and footer are to be automatically inserted into the page.  If not selected, make sure to use the webny Universal Navigation blocks'),
        );
    }

    /**
     * NYS Universal Navigation interactive/static header selection.
     *
     * @return array
     *   Form API element for field.
     */
    public function _webny_unav_interactive_field() {
        $config = $this->config('webny_unav.settings');
        $header_options = array(0 => t('Static'), 1 => t('Interactive'));
        return array(
            '#type' => 'radios',
            '#title' => t('Universal navigation header format'),
            '#options' => $header_options,
            '#default_value' => $config->get('webny_unav.webny_unav_interactive'),
            '#description' => t('Select which header format to use, interactive or static.'),
        );
    }


}