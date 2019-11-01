<?php

/**
 * @file
 * Contains \Drupal\public_appeal_sync\Form\PublicAppealImportForm.
 */

namespace Drupal\public_appeal_sync\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Class PublicAppealImportForm.
 * Set up configuration fields for the module.
 *
 * @package Drupal\public_appeal_sync\Form
 */
class PublicAppealImportForm extends ConfigFormBase
{

  public function __construct(ConfigFactoryInterface $config_factory) {
    parent::__construct($config_factory);
  }

  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames()
  {
    return [
      'public_appeal_sync.baseurl',
      'public_appeal_sync.outdir',
      'public_appeal_sync.email'
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'public_appeal_sync';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {

    // $form['#title'] = $this->t('Config for Public Appeal JSON Importing Service');

    $form['baseurl'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('JSON Base URL'),
      '#description' => $this->t('The JSON data base URL for GET method'),
      '#default_value' => $this->config('public_appeal_sync.baseurl')->get('baseurl'),
      '#required' => true,
    );

    $form['outdir'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('The Output Directory'),
      '#default_value' => $this->config('public_appeal_sync.outdir')->get('outdir'),
      '#description' => $this->t('E.g., public_appeal/output, which will be  "sites/default/files/public_appeal/output/"'),
      '#required' => true,
    );
    $form['email'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Email to receive a report'),
      '#default_value' => $this->config('public_appeal_sync.email')->get('email'),
      '#description' => $this->t('Email address to receive a report after importing JSON data into Drupal'),
      '#required' => true,
    );


    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state)
  {

    parent::validateForm($form, $form_state);
    // if (!$this->validateUser()) {
    //   $form_state->setErrorByName('public_appeal_sync', t('You musht be a role of administrator or restful_api.'));
    // }
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
    parent::submitForm($form, $form_state);

    $this->config('public_appeal_sync.baseurl')
      ->set('baseurl', $form_state->getValue('baseurl'))
      ->save();
    $this->config('public_appeal_sync.outdir')
      ->set('outdir', $form_state->getValue('outdir'))
      ->save();

      $this->config('public_appeal_sync.email')
      ->set('email', $form_state->getValue('email'))
      ->save();
  }
}//END class