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
use function Drupal\blazy_ui\Form\drupal_set_message;


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

  public $response = [];

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
    // print "<pre>TEST:\n"; print_r($baseurl); print "</pre>"; 
    // $uid = $user->id;

    try {
      $response = \Drupal::httpClient()->get($baseurl, array('headers' => array('Accept' => 'text/plain')));
      $data = $response->getBody();

      // print "<pre>TEST:\n"; print_r($data); print "</pre>";  
      if (empty($data)) {
        drupal_set_message('Empty response: ' . $baseurl);
        // $this->countError['json'] = 'Empty response to get JSON data: ' . $baseurl;
        $this->response[] = ['message' => 'Empty response to get JSON data: ' . $baseurl]; 

      } else {
        // print "<pre>TEST:\n"; print_r($data); print "</pre>";  
        $this->createUpdatePublicAppeal($data, $user->id());
        $this->createReport();
      }
    } catch (RequestException $e) {
      // $this->countError['get'] = $e;
      $this->response[]= ['message' => $e];
      watchdog_exception('public_appeal_sync', $e);
    }
    // exit;
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
    $method = "POST";
    $message = "Successeful";
    $respson_nid;

    foreach ($jsonout as $item) {

      $title = isset($item['title']) 
        ? $item['title'] 
        : "Case Number: " . $item['case_number'] . " - Diagnosis: " . $item['diagnosis'][0];

      list($diagnosis, $diag_resp)= $this->getToxonomyMultTerms($item['diagnosis'], 'diagnosis');      
      list($treatment, $treat_resp) = $this->getToxonomyMultTerms($item['treatment'], 'treatment');
      list($health_plan, $health_resp) = $this->getToxonomyTerm($item['health_plan'], 'health_plan');
      list($decision, $dec_resp) = $this->getToxonomyTerm($item['decision'], 'decision');
      list($appeal_type, $type_resp) = $this->getToxonomyTerm($item['appeal_type'], 'appeal_type');
      list($gender, $gender_resp) = $this->getToxonomyTerm($item['gender'], 'gender');
      list($age_range, $age_resp) = $this->getToxonomyTerm($item['age_range'], 'age_range');
      list($decision_year, $year_resp) = $this->getToxonomyTerm($item['decision_year'], 'decision_year');
      list($appeal_agent, $agent_resp) = $this->getToxonomyTerm($item['appeal_agent'], 'appeal_agent');
      

      // drupal_set_message("diagnosis:$diagnosis");
      // drupal_set_message(print_r($item), true);
      // print "<pre>$name:\n"; print_r($diagnosis); print "</pre>"; 

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

        $method = 'UPDATE';

        if (!$node->save()) {
          $message = "Failed";
        } else {
          $respson_nid = $node->id();
        }

        
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
        $node->enforceIsNew(true);
        if (!$node->save()) {
          $message = "Failed";
        } else {
          $respson_nid = $node->id();
        }
      }



      $this->response[] = [
        "method" => $method,
        "message" => $message,
        "nid" => $respson_nid,
        'case_number' => $item['case_number'],
        'diagnosis' => $diag_resp,
        'treatment' => $treat_resp,
        'health_plan' => $health_resp,
        'decision' => $dec_resp,
        'appeal_type' => $type_resp,
        'gender' => $gender_resp,
        'age_range' => $age_resp,
        'decision_year' => $year_resp,
        'appeal_agent' => $agent_resp,
      ];

    }//END foreach()
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

    $tidParent = $this->getToxonomyTermIdByName($parent, 'machine_name');
    $tid = $this->getToxonomyTermIdByName($name, 'name');
    if (!$tid) {
      $tid = $this->createNewTerm($name, [$tidParent]);
    } 
    // drupal_set_message("term:$name, id:$tid, parent:$parent($tidParent)");
    return array(
      [
        "target_id" => $tid,
        "target_type" => "taxonomy_term",
      ],
      [
        "term_id" => $tid,
        'name' => $name,
      ],
    );

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
  protected function getToxonomyMultTerms(array $names, string $parent)
  {
    $tids = []; $tids_resp = [];
    $tidParent = $this->getToxonomyTermIdByName($parent, 'machine_name');
    foreach ($names as $name) {
      $tid = $this->getToxonomyTermIdByName($name, 'name');
      if (!$tid) {
        $tid = $this->createNewTerm($name, [$tidParent]);
      }
      $tids[] = [
        "target_id" => $tid,
        "target_type" => "taxonomy_term",
      ];
      $tids_resp [] = [
        "term_id" => $tid, 
        "name" => $name,
      ];
    }
    // drupal_set_message("term:$name, id:$tid, parent:$parent($tidParent)");
    return array($tids, $tids_resp);

  }

  /**
   * Get term id by name
   * @param string 
   *   term name
   * @return string
   *   term id
   */
  protected function getToxonomyTermIdByName(string $name, string $flag ='name')
  {
    
    $result = \Drupal::entityQuery('taxonomy_term')
    ->condition($flag, $name)
    ->condition('vid', $this->vocabulary)
    ->execute();
    
    $terms = \Drupal::entityTypeManager()
    ->getStorage('taxonomy_term')
    ->loadMultiple($result);
    
    // The code doesn't not work for the term machine_name
    //  $terms = taxonomy_term_load_multiple_by_name($name, $this->vocabulary);

    /*  The code below is not working if there are mutiple terms with the same name
    $properties = [];
    if (!empty($name)) {
        $properties['name'] = $name;
    }
    if (!empty($vid)) {
        $properties['vid'] = $this->vocabulary;
    }
    $terms = \Drupal::entityManager()->getStorage('taxonomy_term')->loadByProperties($properties);
    */
    
    // print "<pre>$name:\n"; print_r($terms); print "</pre>"; 
    $term = reset($terms);
    return !empty($term) ? $term->id() : false;
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
    $term->enforceIsNew();
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
    $dir2 = "public://$dir";
    
    // print_r($dir); exit;
    if (file_prepare_directory($dir2, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS)) {

      $json_data = json_encode($this->response);
      $filename = "report-import-". date("Y-m-d--H-i-s") . ".json";
      $file = file_save_data(
        $json_data, 
        "public://$dir/$filename", 
        FILE_EXISTS_RENAME);
  
      // Get the real file path :
      $path = file_create_url($file->getFileUri());
      // print_r($path); exit;
      \Drupal::logger("public_appeal_sync")->notice($path);

      $this->sendEmailReport($path);
    }
    

  }

  /**
   * Send a email with the link of report
   * @param string $path
   *   a URL of the report
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