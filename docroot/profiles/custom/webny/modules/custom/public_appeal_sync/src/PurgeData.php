<?php

/**
 * @file
 * Contains \Drupal\public_appeal_sync\PurgeData.
 */

namespace Drupal\public_appeal_sync;

use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Class PurgeData: 
 *   a service to Import Public Appeal JSON data into Public Appeal type.
 */
class PurgeData
{
  /**
   * The count of updated nodes.
   * @var array
   */
  private $countUpdate = [];

  /**
   * The list of Taxonomy vocabularies.
   * @var array
   */
  private $vocabulary = [];



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
    $this->vocabulary = 'year';
    // $this->user = 'dfs.ny.gov';    
  }

  /**
   * Purge 6 years old data to unpublished.
   * It is the main method to be called.
   */
  public function purgeData()
  {
    // $user = user_load_by_name($this->user);
    // print_r($config); exit;
    $this->purgeOldData();    

    if (empty($this->countUpdate)) {
      $msg = 'No node to be purgeed.';
      // \Drupal::logger("public_appeal_sync")->notice($msg);
    } else {      
      // $this->createReport();
      $msg = '6 years old cases(Public Appeal) are unpublished: ' . count($this->countUpdate) . " nodes";      
    }    
    \Drupal::logger("public_appeal_sync")->notice($msg);
  }

  /**
   * Get a list of data older than 6 years.
   * @return array $countUpdate
   *   list of nid
   */
  protected function purgeOldData() 
  {
    $oldYear = date('Y') - 6;
    $tid = $this->getToxonomyTermIdByName("$oldYear", "name" );
    
    $nids = \Drupal::entityQuery("node")
      ->condition('type', 'public_appeal')
      ->condition('decision_year', $oldYear, '>=')
      ->condition('status', 1)
      ->execute();
    $storage_handler = \Drupal::entityTypeManager()->getStorage("node");
    $nodes = $storage_handler->loadMultiple($nids);
    
    foreach ($nodes as $node)
    {
      // Unpublish nodes
      $node->setPublished(false);
      // Publish nodes
      // $node->setPublished(true);
      if ($node->save()) {
        $this->countUpdate[] = $node->id();
      }
    }
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
  protected function getToxonomyTermIdByName(string $name, string $flag = 'name')
  { 
    $result = \Drupal::entityQuery('taxonomy_term')
      ->condition($flag, $name)
      ->condition('vid', $this->vocabulary)
      ->execute();

    $terms = \Drupal::entityTypeManager()
      ->getStorage('taxonomy_term')
      ->loadMultiple($result);

        // print "<pre>$name:\n"; print_r($terms); print "</pre>";
    $term = reset($terms);
    return !empty($term) ? $term->id() : false;
  }

  /**
   * Get method
   */
  public function getCountUpdate()
  {
    return $this->countUpdate;
  }

} //END class
