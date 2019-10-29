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
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;


/**
 * Class PublicAppealImportForm.
 *
 * @package Drupal\public_appeal_sync\Form
 */
class PublicAppealImportForm extends ConfigFormBase
{

  public function __construct(
    ConfigFactoryInterface $config_factory
  ) {
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
      'artimporter.baseurl',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'baseurl_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $config = $this->config('public_appeal_sync.baseurl');
    $form['baseurl'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('baseurl'),
      '#description' => $this->t(''),
      '#default_value' => $config->get('baseurl'),
    );

    $form['year'] = array(
      '#type' => 'date',
      '#title' => 'Enter the Month and Year',
      '#required' => true,
      '#default_value' => array('month' => 11, 'year' => 2019),
      '#format' => 'm/Y',
      '#description' => t('i.e. 9/2016'),
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state)
  {

    parent::validateForm($form, $form_state);
    if (!$this->validateUser()) {
      $form_state->setErrorByName('public_appeal_sync', t('You musht be administrator or restful_api role.'));
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
    parent::submitForm($form, $form_state);

    $this->config('public_appeal_sync.baseurl')
      ->set('baseurl', $form_state->getValue('baseurl'))
      ->save();

    $client = \Drupal::httpClient();
    $baseurl = $this->config('public_appeal_sync.baseurl')->get('baseurl');

    try {
      $response = \Drupal::httpClient()->get($baseurl, array('headers' => array('Accept' => 'text/plain')));
      $data = $response->getBody();

      if (empty($data)) {
        drupal_set_message('Empty response.');
      } else {
        list($countUpdate, $countNew) = $this->createPublicAppeal($data, $uid);
      }
    } catch (RequestException $e) {
      watchdog_exception('public_appeal_sync', $e);
    }
  }

  /**
   * Create nodes from JSON feed.
   */
  protected function createUpdatePublicAppeal(string $json, $uid)
  {
    $jsonout = json_decode($json, true);
    $vocabulary = "public_appeal_category";
    $countUpdate = [];
    $countNew = [];
    $countError = [];

    foreach ($jsonout as $item) {

      $title = isset($item['title']) ? $item['title'] : $item['case_number'];

      $age_range = $this->getToxonomyTerm($item['age_range'], 'age_range', $vocabulary);
      $appeal_agent = $this->getToxonomyTerm($item['appeal_agent'], 'appeal_agent', $vocabulary);
      $appeal_type = $this->getToxonomyTerm($item['appeal_type'], 'appeal_type', $vocabulary);
      $decision = $this->getToxonomyTerm($item['decision'], 'decision', $vocabulary);
      $decision_year = $this->getToxonomyTerm($item['decision_year'], 'decision_year', $vocabulary);
      $diagnosis = $this->getToxonomyTerm($item['diagnosis'], 'diagnosis', $vocabulary);
      $gender = $this->getToxonomyTerm($item['gender'], 'gender', $vocabulary);
      $health_plan = $this->getToxonomyTerm($item['health_plan'], 'health_plan', $vocabulary);
      $treatment = $this->getToxonomyTerm($item['treatment'], 'treatment', $vocabulary);


      if ($node = $this->existNode($item['case_number'])) {
        $node->age_range = $age_range;
        $node->appeal_agent = $appeal_agent;
        $node->appeal_type = $appeal_type;
        $node->decision = $decision;
        $node->decision_year = $decision_year;
        $node->diagnosis = $diagnosis;
        $node->gender = $gender;
        $node->health_plan = $health_plan;
        $node->treatment = $treatment;
        $node->references = $item['references'];
        $node->summary = $item['summary'];
        $node->case_number = $item['case_number'];
        $node->save();
        $countUpdate[$node->nid] = $item['case_number'];

      } else {
        $node = Node::create(array(
          'type' => 'public_appeal',
          'uid' => $uid,
          'status' => 1,
          'title' => $title,
          'age_range' => $age_range,
          'appeal_agent' => $appeal_agent,
          'appeal_type' => $appeal_type,
          'decision' => $decision,
          'decision_year' => $decision_year,
          'diagnosis' => $diagnosis,
          'gender' => $gender,
          'health_plan' => $health_plan,
          'treatment' => $treatment,
          'references' => $item['references'],
          'summary' => $item['summary'],
          'case_number' => $item['case_number'],
        ));

        $node->save();
        $countNew[$node->nid] = $item['case_number'];

      }

    }

    return [$countUpdate, $countNew];
  }

  protected function getToxonomyTerm(string $name, string $parent, string $vocabulary)
  {

    $tidParent = $this->getToxonomyTermIdByName($parent, $vocabulary);
    $tid = $this->getToxonomyTermIdByName($name, $vocabulary);

    if (empty($tid)) {
      $tid = $this->createNewTerm($name, $tidParent, $vocabulary);
    }

    return [
      "target_id" => $term->tid,
      "target_type" => "taxonomy_term",
    ];

  }

  protected function getToxonomyTermIdByName(string $name, string $vocabulary)
  {
    $query = \Drupal::entityQuery('taxonomy_term');
    $query->condition('vid', $vocabulary);
    $query->condition('name', $name);
    $tids = $query->execute();
    return reset($tids);

  }

  protected function createNewTerm(string $name, int $tidParent, string $vocabulary)
  {
    $term = \Drupal\taxonomy\Entity\Term::create([
      'vid' => $vocabulary,
      'parent' => $tidParent,
      'name' => $name,
    ]);
    $term->save();
    return $term->tid;
  }

  protected function existNode($caseNumber)
  {
    $nodes = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties(['case_number' => $caseNumber]);

    if ($node = reset($nodes)) {
      return $node;
    } else {
      return false;

    }

  }

}