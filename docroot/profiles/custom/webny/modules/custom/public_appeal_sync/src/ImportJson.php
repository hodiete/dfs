<?php

namespace Drupal\public_appeal_sync;

use Drupal\Core\Config\ConfigFactoryInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Component\Utility\SafeMarkup;
use Drupal\Component\Utility\Html;
use Drupal\Core\Utility\Error;


/**
 * ImportJson is a service to Import Public External Appeal JSON data into Public Appeal content type.
 */
class ImportJson
{

  // private $countUpdate;
  private $countUpdate = [];

  // private $countNew;
  private $countNew = [];

  // private $countError;
  private $countError = [];

  // private $vocabulary: taxonomy term
  private $vocabulary;
  private $user;


  /**
   * Part of the DependencyInjection magic happening here.
   */
  public function __construct()
  {
    $this->vocabulary = 'public_appeal_category';
    $this->user = 'dfs.ny.gov';

  }

  /**
   * Import JSON data by GET method
   * @param ConfigFactoryInterface $config
   *   The ConfigFactoryInterface type.
   */
  public function importJson()
  {

    $client = \Drupal::httpClient();
    $baseurl = \Drupal::config('public_appeal_sync.baseurl')->get('baseurl');
    $user = user_load_by_name($this->user);
    // kint($this->user); 
    print "<pre>TEST:\n"; print_r($baseurl); print "</pre>";
    // $uid = $user->id;

    try {
      $response = \Drupal::httpClient()->get($baseurl, array('headers' => array('Accept' => 'text/plain')));
      $data = $response->getBody();

      if (empty($data)) {
        drupal_set_message('Empty response.');
        $this->countError['json'] = 'Empty response to get JSON data: ' . $baseurl;

      } else {
         $this->createUpdatePublicAppeal($data, $user->id());
      }
    } catch (RequestException $e) {
      $this->countError['get'] = $e;
      watchdog_exception('public_appeal_sync', $e);
    }
  }

  /**
   * Validate user (not used currently)
   * @return boolean
   */
  protected function validateUser()
  {
    // $current_user = \Drupal::currentUser();
    $roles = $this->currentUser->getRoles();
    foreach ($roles as $role) {
      if ($role == 'administrator' || $role == 'restful_api') {
        return true;
      }
    }
    return false;
  }

  /**
   * Create or update nodes from JSON feed.
   * @param string $json
   *   JSON data
   * @param int
   *   user ID
   */
  protected function createUpdatePublicAppeal(string $json, int $uid=8)
  {
    $jsonout = json_decode($json, true);
    $vocabulary = "public_appeal_category";

    foreach ($jsonout as $item) {

      $title = isset($item['title']) ? $item['title'] : $item['case_number'];

      $diagnosis = $this->getToxonomyTerm($item['diagnosis'], 'diagnosis');
      $treatment = $this->getToxonomyTerm($item['treatment'], 'treatment');
      $health_plan = $this->getToxonomyTerm($item['health_plan'], 'health_plan', $vocabulary);
      $decision = $this->getToxonomyTerm($item['decision'], 'decision');
      $appeal_type = $this->getToxonomyTerm($item['appeal_type'], 'appeal_type', $vocabulary);
      $gender = $this->getToxonomyTerm($item['gender'], 'gender');
      $age_range = $this->getToxonomyTerm($item['age_range'], 'age_range');
      $decision_year = $this->getToxonomyTerm($item['decision_year'], 'decision_year', $vocabulary);
      $appeal_agent = $this->getToxonomyTerm($item['appeal_agent'], 'appeal_agent', $vocabulary);


      if ($node = $this->existNode($item['case_number'])) {
        $node->diagnosis = $diagnosis;
        $node->treatment = $treatment;
        $node->health_plan = $health_plan;
        $node->decision = $decision;
        $node->appeal_type = $appeal_type;
        $node->gender = $gender;
        $node->age_range = $age_range;
        $node->decision_year = $decision_year;
        $node->appeal_agent = $appeal_agent;
        $node->case_number = $item['case_number'];
        $node->summary = $item['summary'];
        $node->references = $item['references'];
        
        $node->save();
        $this->countUpdate[$node->nid] = $item['case_number'];
        
      } else {
        $node = Node::create(array(
          'type' => 'public_appeal',
          'uid' => $uid,
          'status' => 1,
          'title' => $title,
          'diagnosis' => $diagnosis,
          'treatment' => $treatment,
          'health_plan' => $health_plan,
          'decision' => $decision,
          'appeal_type' => $appeal_type,
          'gender' => $gender,
          'age_range' => $age_range,
          'decision_year' => $decision_year,
          'appeal_agent' => $appeal_agent,
          'case_number' => $item['case_number'],
          'summary' => $item['summary'],
          'references' => $item['references'],
        ));

        $node->save();
        $this->countNew[$node->nid] = $item['case_number'];

      }

    }

    // return [$countUpdate, $countNew];
  }

  /**
   * Get array of toxonomy term
   * @param string $name
   *   term name
   * @param string $parent
   *   parent term name
   * @return array
   *   array(tid, taget_type)
   */
  protected function getToxonomyTerm(string $name, string $parent)
  {

    $tidParent = $this->getToxonomyTermIdByName($parent);
    $tid = $this->getToxonomyTermIdByName($name);

    if (empty($tid)) {
      $tid = $this->createNewTerm($name, [$tidParent]);
    }
    drupal_set_message("term:$name, id:$tid, parent:$parent($tidParent)");

    return [
      "target_id" => $tid,
      "target_type" => "taxonomy_term",
    ];

  }

  /**
   * Get term id by name
   * @param string 
   *   term name
   * @return string
   *   term id
   */
  protected function getToxonomyTermIdByName(string $name)
  {
    // $query = \Drupal::entityQuery('taxonomy_term');
    // $query->condition('vid', $this->vocabulary);
    // $query->condition('name', $name);
    // $tids = $query->execute();

    $properties = [];
    if (!empty($name)) {
        $properties['name'] = $name;
    }
    if (!empty($vid)) {
        $properties['vid'] = $this->vocabulary;
    }
    $terms = \Drupal::entityManager()->getStorage('taxonomy_term')->loadByProperties($properties);
    $term = reset($terms);

    // print "<pre>tids:\n"; print_r($term->id()); print "</pre>"; exit;
    return !empty($term) ? $term->id() : 0;
 
  }

  /**
   * Create a new term
   * @param string $name
   *   a new term name
   * @param array $tidParent
   *   term id of the parent
   * @return int
   *   a new term ID
   */

  protected function createNewTerm(string $name, array $tidParent = [])
  {
    $term = Term::create([
      'vid' => $this->vocabulary,
      'parent' => $tidParent,
      'name' => $name,
    ]);
    $term->save();
    return $term->id();
  }
  /**
   * Check if a nocde exist
   * @param string $caseNmuber
   *   the case_number in JSON data
   * @return Node $node
   *   a node object  or false
   */

  protected function existNode(string $caseNumber)
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

  /**
   * Get method
   */
  public function getCountUpdate() {
    return $this->countUpdate;
  }

  /**
   * Get method
   */
  public function getCountNew()
  {
    return $this->countNew;
  }

  /**
   * Get method
   */
  public function getCountError()
  {
    return $this->countError;
  }

  /**
   * Message to string
   */
  public function msgToString() {
    $msg = "";
    $msg .= $this->toStringCount($this->countError, 'error');
    $msg .= $this->toStringCount($this->countUpdate, 'update');
    $msg .= $this->toStringCount($this->countNew, 'new');

    return $msg;
  }

  /**
   * To string 
   * @param array $count
   *   e.g. $this->countError
   * @param  string $type
   *   update, new, error 
   */
  public function toStringCount(array $count, string $type) {
    $msg = "";
    switch ($type) {
      case 'update':
        $msg .= "UPDATED DATA\nNode ID, \tCase Number";
        break;
      case 'new':
        $msg .= "CREATED DATA\nNode ID, \tCase Number";
        break;
      case 'error':
        $msg .= "ERROR MESSAGES\nType, \tError";
        break;
    }
    $msg .= "\n";

    foreach ($count as $key => $value) {
      $msg .= "$key,\t$value\n";
    }

    $msg .= "\n\n";
    return $msg;
  }

  /**
   * Get method
   */
  public function getVocabulary() {
    return $this->vocabulary;
  }

  /**
   * Set method
   */
  public function setVocabulary(string $vac)
  {
    $this->vocabulary = $vac;
  }

  /**
   * Get method
   */
  public function getUser()
  {
    return $this->user;
  }

  /**
   * Set method
   */
  public function setUser(string $name)
  {
    $this->user = $name;
  }

  /**
   * Create a file of report
   */
  public function createReport() {
    // You can create a file and save data at once .
    $dir = \Drupal::config('public_appeal_sync.outdir')->get('outdir');

    if (file_prepare_directory("public://$dir", FILE_CREATE_DIRECTORY)) {

      $filename = "report-import-". date("Y-m-d--H-i-s") . ".txt";
      $file = file_save_data($this->msgToString(), 
              "public://$dir/$filename", FILE_EXISTS_RENAME);
  
      // Get the real file path :
      $path = drupal_realpath($file->getFileUri());
      $this->sendEmailReport($path);
    }
    

  }

  /**
   * Send a email with the link of report
   * @param string $path
   *   a URL of the report of result
   */
  public function sendEmailReport($path) {
    $to = \Drupal::config('public_appeal_sync.email')->get('email');
    $from = \Drupal::config('system.site')->get('mail');
    // $siteName = \Drupal::config('system.site')->get('name');
    $day = date("Y-m-d");

    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'public_appeal_sync';
    $key = 'import_json_data';

    $message['headers'] = array(
      'content-type' => 'text/html',
      'MIME-Version' => '1.0',
      'reply-to' => $from,
      'from' => 'DFS<' . $from . '>'
    );
    $params['subject'] = "Report of Importing Public Appeal Data on $day";
    $params['message'] = "<h2>The JSON date is imported into Drupal site dfs.ny.gov</h2><p>Please review the Report @ $path</p>";
    $langcode = 'en';
    $send = true;
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, null, $send);
    if ($result['result'] !== true) {
      \Drupal::logger($module)->error('There was a problem sending your message to @email and it was not sent.', array('@email' => $to));
    } else {
      \Drupal::logger($module)->notice('Your message has been sent.');
    }


  }

} //END class