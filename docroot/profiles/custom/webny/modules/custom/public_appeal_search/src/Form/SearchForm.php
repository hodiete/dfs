<?php

/**
 * @file
 * Contains \Drupal\public_appeal_search\Form\SearchForm.
 */

namespace Drupal\public_appeal_search\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;


use Symfony\Component\DependencyInjection\ContainerInterface;
// use Symfony\Component\Validator\Constraints\Url;


/**
 * Class ManualImportForm.
 *
 * @package Drupal\public_appeal_search\Form
 */
class SearchForm extends FormBase 
{

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'public_appeal_search_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {

    if (isset($_GET['summary_value'])) {
      $name = $_GET['summary_value'] ;
    }
    elseif(isset($_GET['references_value'])) {
      $name = $_GET['references_value'];
    }
    else {
      $name = "";
    }

    $form['search'] = array(
      '#type' => 'textfield',      
      '#default_value' => $name,
      '#size' => 60,
      '#required' => false,
    );
    $form['search']['#attributes']['placeholder'] = t('Search Summary and Reference');

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Search'),
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
      $form_state->setErrorByName('public_appeal_search', t('You musht be a role of administrator or restful_api.'));
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
    $params = $this->searchFields($form_state->getValue('search'));

    // Change the Action of Submission to the View of Public Appeal Search  
    $response = new RedirectResponse(Url::fromRoute('view.public_appeal_search.public_appeals_search_page', $params)->toString());

    $response->send();
  }

  /**
   * Search possible fields: summary or references;
   * @param string $input
   *   String to be searched
   * @return array $params
   *   Params array used in View search URL
   */

  protected function searchFields($input) {

    if ($this->searchFieldHelp('summary', $input) && $this->searchFieldHelp('references', $input)) {
      $params[] = [
        'summary_value' => $input,
        'references_value' => $input,
      ];
    }
    elseif($this->searchFieldHelp('summary', $input)) {
      $params[] = [
        'summary_value' => $input,
      ];
    }
    elseif($this->searchFieldHelp('references', $input)) {
      $params[] = [
        'references_value' => $input,
      ];
    }
    else {
      $params[] = [
        'summary_value' => $input,
      ];

    }

    return $params;
  }


  /**
   * Help function to query items in DB with conditions;
   * @param string $field
   *   Field name of content type
   * @param string $input
   *   Input Text to be searched
   * @param string $op
   *   Operation (default: CONTAINS)
   * @return bolean 
   *   True for exit; False for not exit
   */

  protected function searchFieldHelp($field, $input, $op = 'CONTAINS') {
    $nids = \Drupal::entityQuery('node')
      ->condition('status', 1)
      ->condition('type', 'public_appeal')
      ->condition($field, $input, $op)
      ->execute();

    return count($nids) > 0;
  }


}//END class