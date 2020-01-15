<?php

/**
 * @file
 * Contains \Drupal\public_appeal_sync\Form\ManualPurgeDataForm.
 */

namespace Drupal\public_appeal_sync\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Class ManualPurgeDataForm.
 *
 * @package Drupal\public_appeal_sync\Form
 */
class ManualPurgeDataForm extends FormBase
{

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'public_appeal_sync_manual_purge_data';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {

    $form['title'] = array(
      '#markup' => '<h1>Run purge_data service manually to unpublish nodes(Public Appeal) that are 6 Years old</h1>'
    );


    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Manually Purge Data'),
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
    // Run the service to purge data 
    $service = \Drupal::service('public_appeal_sync.purge_data');
    $msg = $service->purgeData();
    if($msg) {
      drupal_set_message($msg);
    }
    else {
      drupal_set_message("Nothing to be purged!");

    }
  }


}//END class