<?php

/**
 * @file
 * Contains \Drupal\public_appeal_sync\Form\ManualImportForm.
 */

namespace Drupal\public_appeal_sync\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Class ManualImportForm.
 *
 * @package Drupal\public_appeal_sync\Form
 */
class ManualImportForm extends FormBase
{

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'public_appeal_sync_manual_import';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {

    $form['title'] = array(
      '#markup' => '<h1>Run Import Service Manually</h1>'

    );

    $form['json_url'] = array(
      '#type' => 'textfield',
      '#title' => t('JSON file URL'),
      '#description' => $this->t('E.g.,<br>
      http://nydfs2.local/sites/default/files/public_appeal/test1.json<br>
      https://myportal-t.dfs.ny.gov/peasa-dataextract-portlet/rest/dfsservices/peasaservice?date=07-NOV-19
'),
      '#default_value' => \Drupal::config('public_appeal_sync.baseurl')->get('baseurl'),
      '#size' => 100,
      '#required' => true,
    );

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Manually Import JSON'),
      '#button_type' => 'primary',
    );
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state)
  {
    parent::validateForm($form, $form_state);
    if (!$this->validateUser()) {
      $form_state->setErrorByName('public_appeal_sync', t('You musht be a role of administrator or restful_api.'));
    }
  }


  protected function validateUser()
  {
    $current_user = \Drupal::currentUser();
    $roles = $current_user->getRoles();
    foreach ($roles as $role) {
      if ($role == 'administrator' || $role == 'restful_api') {
        return true;
      }
    }
    return false;
  }


  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    // Run the server to import json data
    $service = \Drupal::service('public_appeal_sync.import_json');

    if(!empty($form_state->getValue('json_url'))) {
      $url = $form_state->getValue('json_url');
      // print_r( $url);
      $service->setBaseurl($url);
    }

    $service->importJson();
    
    drupal_set_message('Response JSON: ' . $service->path);
  }


}//END class