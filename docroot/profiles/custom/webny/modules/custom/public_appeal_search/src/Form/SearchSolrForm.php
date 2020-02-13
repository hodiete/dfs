<?php

/**
 * @file
 * Contains \Drupal\public_appeal_search\Form\SearchForm.
 */

namespace Drupal\public_appeal_search\Form;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Symfony\Component\HttpFoundation\RedirectResponse;

use Drupal\views\ViewExecutable;
use Drupal\views\Views;
// use Symfony\Component\Validator\Constraints\Url;



/**
 * Class ManualImportForm.
 *
 * @package Drupal\public_appeal_search\Form
 */
class SearchSolrForm extends FormBase
{

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'public_appeal_search_solr_form';
  }

  /**
   * Helper method so we can have consistent dialog options.
   *
   * @return string[]
   *   An array of jQuery UI elements to pass on to our dialog form.
   */
  protected static function getDataDialogOptions() {
    return [
      'width' => '95%',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $nojs = null)
  {

    $form['#attached']['library'][] = 'public_appeal_search/ajax-solr-search';

    // Add a link to show this form in a modal dialog if we're not already in
    // one.
    if ($nojs == 'nojs') {
      $form['use_ajax_container'] = [
        '#type' => 'details',
        '#open' => true,
      ];
      $form['use_ajax_container']['description'] = [
        '#type' => 'item',
        '#markup' => $this->t('In order to show a modal dialog by clicking on a link, that link has to have class <code>use-ajax</code> and <code>data-dialog-type="modal"</code>. This link has those attributes.'),
      ];
      $form['use_ajax_container']['use_ajax'] = [
        '#type' => 'link',
        '#title' => $this->t('See this form as a modal.'),
        '#url' => Url::fromRoute('public_appeal_search.public_appeal_search_form', ['nojs' => 'ajax']),
        '#attributes' => [
            'class' => ['use-ajax'],
            'data-dialog-type' => 'modal',
            'data-dialog-options' => json_encode(static::getDataDialogOptions()),
            // Add this id so that we can test this form.
            'id' => 'ajax-example-modal-link',
        ],
      ];
    }

    // This element is responsible for displaying form errors in the AJAX
    // dialog.
    if ($nojs == 'ajax') {
      $form['status_messages'] = [
        '#type' => 'status_messages',
        '#weight' => -999,
      ];
    }



    /*
    $params = [];
    $params = \Drupal::request()->query->all();

    if (isset($_GET['summary_value'])) {
      $name = $_GET['summary_value'] ;
    }
    elseif(isset($_GET['references_value'])) {
      $name = $_GET['references_value'];
    }
    else {
      $name = "";
    }
    */

    $form['title'] = [
      '#type' => 'hidden',
      '#title' => $this->t('Pulbic Appeal Solr Search'),
      '#required' => false,
    ];

    $form['search'] = array(
      '#type' => 'textfield',
      '#default_value' => $name,
      '#size' => 60,
      '#required' => false,
    );
    $form['search']['#attributes']['placeholder'] = t('Search');

    /*
    $form['references_included'] = array(
      '#type' => 'checkbox',
      '#title' => $this->t('Include References in Search'),
      '#return_value' => 1,
      // '#options' => array('checked' => true, 'unchecked' => false),
      '#default_value' => false,
    );

    if (isset($params['references_value'])) {
      $form['references_included']['#default_value'] = true;
    }

    */
    // $form['submit'] = array(
    //   '#type' => 'submit',
    //   '#value' => $this->t('Search'),
    //   '#button_type' => 'primary',
    // );

    // Group submit handlers in an actions element with a key of "actions" so
    // that it gets styled correctly, and so that other modules may add actions
    // to the form.
    $form['actions'] = [
      '#type' => 'actions',
    ];

    // Add a submit button that handles the submission of the form.
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
      '#ajax' => [
        'callback' => '::ajaxSubmitForm',
        'event' => 'click',
      ],
    ];

    // Set the form to not use AJAX if we're on a nojs path. When this form is
    // within the modal dialog, Drupal will make sure we're using an AJAX path
    // instead of a nojs one.
    if ($nojs == 'nojs') {
      unset($form['actions']['submit']['#ajax']);
    }

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
    $search_words = $form_state->getValue('search');
    $checked = $form_state->getValue('references_included');

    // print "<Pre>checkout:: ";
    // print_r($form_state->getValue('references_included'));
    //  exit(0);
    // \Drupal::messenger()->addStatus(t('formstate @print.', array('@print' => print_r($form_state->references_included))));

    // if ($form_state->hasValue('references_included')) {
    //   if($checked == 'checked') {
    //     $ref = true;
    //   }
    //   // print_r($ref);

    // }
    // else {
    //   $ref = false;
    //   // \Drupal::messenger()->addStatus(t('references NOT included.'));

    // }

    // $params = $this->searchFields($form_state->getValue('search'), $checked);

    $title = $form_state->getValue('title');
    $this->messenger()->addMessage(
      $this->t('Submit handler: You specified a title of @title.', ['@title' => $title])
    );
    /*
    // Change the Action of Submission to the View of Public Appeal Search
    $response = new RedirectResponse(Url::fromRoute('view.public_appeal_search.public_appeals_search_page', $params)->toString());

    $response->send();
    */
  }

  /**
   * Search possible fields: summary or references;
   * @param string $input
   *   String to be searched
   * @return array $params
   *   Params array used in View search URL
   */

  protected function searchFields($input, $ref) {
    $params = [];
    $params = \Drupal::request()->query->all();
    // print "<pre>"; print_r($params); exit();

    if($ref) {
      // \Drupal::messenger()->addStatus(t('references_included @print.', array('@print' => print($ref))));

      if ($this->searchFieldHelp('summary', $input) && $this->searchFieldHelp('references', $input)) {
        $params['summary_value'] = $input;
        $params['references_value'] = $input;

      }
      elseif($this->searchFieldHelp('summary', $input)) {
        $params['summary_value'] = $input;
      }
      else {
        $params['references_value'] = $input;
      }

    }
    else {
      $params['summary_value'] = $input;
      unset($params['references_value']);

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



  
  /**
   * Implements the submit handler for the modal dialog AJAX call.
   *
   * @param array $form
   *   Render array representing from.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Current form state.
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   *   Array of AJAX commands to execute on submit of the modal form.
   */
  public function ajaxSubmitForm(array &$form, FormStateInterface $form_state) {
    // We begin building a new ajax reponse.
    $response = new AjaxResponse();

    // If the user submitted the form and there are errors, show them the
    // input dialog again with error messages. Since the title element is
    // required, the empty string wont't validate and there will be an error.
    if ($form_state->getErrors()) {
      // If there are errors, we can show the form again with the errors in
      // the status_messages section.
      $form['status_messages'] = [
        '#type' => 'status_messages',
        '#weight' => -10,
      ];
      $response->addCommand(new OpenModalDialogCommand($this->t('Errors'), $form, static::getDataDialogOptions()));
    }
    // If there are no errors, show the output dialog.
    else {
      // We don't want any messages that were added by submitForm().
      $this->messenger()->deleteAll();
      // We use FormattableMarkup to handle sanitizing the input.
      // @todo: There's probably a better way to do this.
      $title = new FormattableMarkup(':title', [':title' => $form_state->getValue('title')]);


      $search_words = $form_state->getValue('search');
      // $checked = $form_state->getValue('references_included');
      // $params = $this->searchFields($form_state->getValue('search'), $checked);


      // This will be the contents for the modal dialog.
      // $host ="https://nydfsdev.prod.acquia-sites.com";
      // $host = "http://dfs.test";
      // $search_result = "<iframe src=\"$host/public-appeal/search-all?search_api_fulltext=$search_words\">
      //   <p>Your browser does not support iframes.</p>
      // </iframe>";

      // $search_result = file_get_contents("$host/public-appeal/search-all?search_api_fulltext=$search_words");

      $search_result = $this->getResultsSolrSearchView($search_words);

      $content = [
        '#type' => 'item',
        '#markup' => $search_result,
      ];
      // Add the OpenModalDialogCommand to the response. This will cause Drupal
      // AJAX to show the modal dialog. The user can click the little X to close
      // the dialog.
      $response->addCommand(new OpenModalDialogCommand($title, $content, static::getDataDialogOptions()));
    }

    // Finally return our response.
    return $response;
  }


  public function getResultsSolrSearchView($key) {

    $result = false;
    $args['search_api_fulltext'] = $key;
 
    // Local Site: view michine name local_public_appeal_search
    $view = Views::getView('local_public_appeal_search');
    
    if(!$view) {      
      // Clound Dev: view michine name public_appeal_search_all
      $view = Views::getView('public_appeal_search_all');
    }

    if (is_object($view)) {
      $view->setDisplay('page_1');
      $filters['search_api_fulltext'] = $key;

      $view->setExposedInput($filters);
      $view->execute();

      // Render the view
      $result = \Drupal::service('renderer')->render($view->render());
    }
    return ($result)? $result: "No result found!";
  }

}//END class
