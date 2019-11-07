<?php

/**
 * @file
 * Contains \Drupal\public_appeal_sync\ImportJson.
 */

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
 * Class ImportJson: 
 *   a service to Import Public Appeal JSON data into Public Appeal type.
 */
class ImportJson
{
  /**
   * The count of updated nodes.
   * @var array
   */
  private $countUpdate = [];

  /**
   * The count of new nodes.
   * @var array
   */
  private $countNew = [];

  /**
   * The count of errors.
   * @var array
   */
  private $countError = [];

  /**
   * The list of Taxonomy vocabularies.
   * @var array
   */
  private $vocabulary = [];

  /**
   * The user name.
   * @var string
   */
  private $user;

  /**
   * Baseic Auth Username for GET method .
   * @var string
   */
  private $auth_user;

  /**
   * Baseic Auth Password for GET method .
   * @var string
   */
  private $auth_passwd;

  /**
   * Datetime to run the service .
   * @var string
   */
  public $running_date;

  /**
   * List of JSON data of response.
   * @var array
   */
  public $response = [];

  /**
   * The base URL of JSON file imported.
   * @var array
   */
  public $baseurl;

  /**
   * The URL of response JSON file after import.
   * @var array
   */
  public $path;



  /**
   * Construct to initrialize varaibles.
   */
  public function __construct()
  {
    $this->vocabulary = [
      'diagnosis',
      'treatment',
      'health_plan',
      'decision',
      'appeal_type',
      'gender',
      'age_range',
      'year',
      'agent',
    ];

    $this->user = 'dfs.ny.gov';
    $this->baseurl = \Drupal::config('public_appeal_sync.baseurl')->get('baseurl');
    $this->auth_user = \Drupal::config('public_appeal_sync.auth_user')->get('auth_user');
    $this->auth_passwd = \Drupal::config('public_appeal_sync.auth_passwd')->get('auth_passwd');
    $this->running_date = time();
    
  }

  /**
   * Import JSON data by GET method.
   * It is the main method to be called.
   */
  public function importJson()
  {
    $client = \Drupal::httpClient();
    $user = user_load_by_name($this->user);
    $baseurl = $this->baseurl . "?date=" . strtoupper(date("d-M-y"));
    $config = [
      'headers' => ['Accept' => 'text/plain'],
      'auth' => [$this->auth_user, $this->auth_passwd],
    ];

    try {
      $response = $client->get($baseurl, $config);
      $data = $response->getBody();

      if (empty($data)) {
        drupal_set_message('Empty response: ' . $baseurl);
        $this->countError['json'] = 'Empty response to get JSON data: ' . $baseurl;
        $this->response[] = ['message' => 'Empty response to get JSON data: ' . $baseurl];
      } else {
        $this->createUpdatePublicAppeal($data, $user->id());
        $this->createReport();
      }
    } catch (RequestException $e) {
      $this->countError['get'] = $e;
      $this->response[] = ['message' => $e];
      watchdog_exception('public_appeal_sync', $e);
    }
 
  }

  /**
   * Create or update nodes from JSON feed.
   * @param string $json
   *   JSON data
   * @param int $uid
   *   user ID
   */
  protected function createUpdatePublicAppeal(string $json, int $uid = 8)
  {
    $jsonout = json_decode($json, true);
    $vocabulary = "public_appeal_category";
    $method = "CREATE";
    $message = "Successeful";
    $respson_nid;

    foreach ($jsonout as $item) {
      
      $case_number = $item['Case_number'];
      $summary = $item['Summary'];
      $references = $item['References'];
      $caseid = $item['Caseid'];
      $created = $item['Created'];
      $title = isset($item['Title']) ? $item['Title'] : "Case Number: " . $case_number;
        // : "Case Number: " . $item['Case_number'] . " - Diagnosis: " . $item['Diagnosis'][0];

      list($diagnosis, $diag_resp) = $this->getToxonomyMultTerms($item['Diagnosis'], 'diagnosis');
      list($treatment, $treat_resp) = $this->getToxonomyMultTerms($item['Treatment'], 'treatment');
      list($health_plan, $health_resp) = $this->getToxonomyTerm($item['Health_plan'], 'health_plan');
      list($decision, $dec_resp) = $this->getToxonomyTerm($item['Decision'], 'decision');
      list($appeal_type, $type_resp) = $this->getToxonomyTerm($item['Appeal_type'], 'appeal_type');
      list($gender, $gender_resp) = $this->getToxonomyTerm($item['Gender'], 'gender');
      list($age_range, $age_resp) = $this->getToxonomyTerm($item['Age_range'], 'age_range');
      list($year, $year_resp) = $this->getToxonomyTerm($item['Year'], 'year');
      list($agent, $agent_resp) = $this->getToxonomyTerm($item['Agent'], 'agent');      
   
      // Upload the node if it is exited, otherwise, create a new one
      if ($node = $this->existNode($case_number)) {
        $node->diagnosis = $diagnosis;
        $node->treatment = $treatment;
        $node->health_plan = $health_plan;
        $node->decision = $decision;
        $node->appeal_type = $appeal_type;
        $node->gender = $gender;
        $node->age_range = $age_range;
        $node->decision_year = $year;
        $node->appeal_agent = $agent;
        $node->case_number = $case_number;
        $node->summary = $summary;        
        $node->references = $references;
        $node->caseid = $caseid;
        
        $method = 'UPDATE';
        $node->setPublished(true);
        $node->set('moderation_state', "published");

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
          'decision_year' => $year,
          'appeal_agent' => $agent,
          'case_number' => $case_number,
          'summary' => $summary,
          'references' => $references,
          'caseid' => $caseid,
          'created' => $created,
        ));
        $node->enforceIsNew(true);
        if (!$node->save()) {
          $message = "Failed";
        } else {
          $respson_nid = $node->id();
        }
      }

      // Output data of response.
      $this->response[] = [
        "method" => $method,
        "message" => $message,
        "nid" => $respson_nid,
        'case_number' => $case_number,
        'date' => "$this->running_date",
        // 'diagnosis' => $diag_resp,
        // 'treatment' => $treat_resp,
        // 'health_plan' => $health_resp,
        // 'decision' => $dec_resp,
        // 'appeal_type' => $type_resp,
        // 'gender' => $gender_resp,
        // 'age_range' => $age_resp,
        // 'year' => $year_resp,
        // 'agent' => $agent_resp,
      ];
    }//END foreach()
  }

  /**
   * Get array of toxonomy term
   * @param string $name
   *   term name
   * @param string $vocabulary
   *   parent term name
   * @return array
   *   array([tid, taget_type], [term_id, name])
   */
  protected function getToxonomyTerm(string $name, string $vocabulary)
  {
    $name = isset($name) ? $name : "None";
    $tid = $this->getToxonomyTermIdByName($name, 'name', $vocabulary);
    if (!$tid) {
      $tid = $this->createNewTerm($name, $vocabulary);
    }

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
   * Get array of multiple toxonomy terms.
   * @param string $name
   *   term name
   * @param string $vocabulary
   *   taxonomy vocabulary vid
   * @return array
   *   multiple demention arrary
   */
  protected function getToxonomyMultTerms(array $names, string $vocabulary)
  {
    $tids = [];
    $tids_resp = [];
        // $tidParent = $this->getToxonomyTermIdByName($parent, 'machine_name');
    foreach ($names as $name) {
      $tid = $this->getToxonomyTermIdByName($name, 'name', $vocabulary);
      if (!$tid) {
        $tid = $this->createNewTerm($name, $vocabulary);
      }
      $tids[] = [
        "target_id" => $tid,
        "target_type" => "taxonomy_term",
      ];
      $tids_resp[] = [
        "term_id" => $tid,
        "name" => $name,
      ];
    }
        // drupal_set_message("term:$name, id:$tid, parent:$parent($tidParent)");
    return array($tids, $tids_resp);
  }

  /**
   * Get term id by name.
   * @param string $name
   *   term name
   * @param string $flag
   *   name or machine_name
   * @param string $vocabulary
   *   vocabulary vid
   * @return int or false
   *   term id or false
   */
  protected function getToxonomyTermIdByName(string $name, string $flag = 'name', string $vocabulary)
  { 
    $result = \Drupal::entityQuery('taxonomy_term')
      ->condition($flag, $name)
      ->condition('vid', $vocabulary)
      ->execute();

    $terms = \Drupal::entityTypeManager()
      ->getStorage('taxonomy_term')
      ->loadMultiple($result);

        // print "<pre>$name:\n"; print_r($terms); print "</pre>";
    $term = reset($terms);
    return !empty($term) ? $term->id() : false;
  }

  /**
   * Create a new term.
   * @param string $name
   *   a new term name
   * @param string $vocabulary
   *   vocabulary vid
   * @return int
   *   a new term ID
   */

  protected function createNewTerm(string $name, string $vocabulary)
  {
    $name = isset($name) ? $name : "None";

    $term = Term::create([
      'vid' => $vocabulary,
      'name' => $name,
    ]);
    $term->enforceIsNew();
    $term->save();
    return $term->id();
  }
  /**
   * Check if a nocde exists.
   * @param string $caseNmuber
   *   the case_number in JSON data
   * @return Node 
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
  public function getCountUpdate()
  {
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
  public function msgToString()
  {
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
  public function toStringCount(array $count, string $type)
  {
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
  public function getVocabulary()
  {
    return $this->vocabulary;
  }

  /**
   * Set method
   */
  public function setVocabulary(array $vac)
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
   * Set method
   */
  public function setBaseurl(string $url)
  {
    $this->baseurl = $url;
  }

  /**
   * Create a JSON file for response
   * @return null
   */
  public function createReport()
  {
    $dir = \Drupal::config('public_appeal_sync.outdir')->get('outdir');
    $dir2 = "public://$dir";
    
    if (file_prepare_directory($dir2, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS)) {
      $json_data = json_encode($this->response);
      $filename = "report-import-" . date("Y-m-d--H-i-s") . ".json";    
      $this->saveToJson($json_data, $dir, $filename);      
      
      $Json_date2 = json_encode(["Date" => "$this->running_date"]);
      $filename2 = "running-response.json";
      $this->saveToJson($Json_date2, $dir, $filename2, true);
    }
  }

  /**
   * Help function to save data to JSON
   * @param Object JSON
   * @param String directory
   * @param String filename of JSON
   * @param Boolean flag to send email or not
   * @return null
   */
  public function saveToJson(&$json_data, $dir, $filename, $flag_email=false)
  {
    $file = file_save_data(
      $json_data,
      "public://$dir/$filename",
      FILE_EXISTS_REPLACE
    );
    if(!$file) {
      return false;
    }
    // Get the real file path :
    $this->path = file_create_url($file->getFileUri());
    \Drupal::logger("public_appeal_sync")->notice($this->path);

    if ($flag_email) {
      // Call wrapper method to send email
      $this->sendEmailReport($this->path);
    }




  }

  /**
   * Send a email with the link of report
   * @param string $path
   *   a URL of JSON file
   */
  public function sendEmailReport($path)
  {
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

  public function postRespons() {
    /**
     *  1. get the POST aip username/password;  security token;
     *  2. the format of the POSTed JSON date
     *  3. the path of the JSON data
     */
  }
} //END class
