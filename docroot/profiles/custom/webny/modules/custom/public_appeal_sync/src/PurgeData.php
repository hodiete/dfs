<?php

/**
 * @file
 * Contains \Drupal\public_appeal_sync\PurgeData.
 */

namespace Drupal\public_appeal_sync;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Class PurgeData: 
 *   a service to purge 6-year Data.
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
   * Construct to initrialize varaibles.
   */
  public function __construct()
  {
    $this->vocabulary = 'year';  
  }

  /**
   * Purge 6 years old data to unpublished.
   * It is the main method to be called.
   * @return string $msg or false
   */
  public function purgeData()
  {
    // $user = user_load_by_name($this->user);
    $this->purgeOldData();       

    if (empty($this->countUpdate)) {
      $msg = 'No node to be purgeed.';
      \Drupal::logger("public_appeal_sync")->notice($msg);
      return false;
    } else {      
      $msg = '6 years old nodes (Public Appeal) are set to unpublished: ' . count($this->countUpdate) . " nodes";  
      \Drupal::logger("public_appeal_sync")->notice($msg);
      return $msg;    
    }    
    // \Drupal::logger('public_appeal_sync')->warning(print_r($this->countUpdate, true));
  }

  /**
   * Get a list of data older than 6 years.
   * @return array $countUpdate
   *   list of nid
   */
  protected function purgeOldData() 
  {
    $nids = [];
    $oldYear = date('Y') - 6;
    $tids = $this->getToxonomyTermIdByName($oldYear, "name" );

    $results = \Drupal::entityQuery("node")
      ->condition('type', 'public_appeal')
      ->condition('decision_year', $tids, 'in')
      ->condition('status', 1)
      ->execute();
    
    foreach ($results as $key => $value) {
      $nids[] = $value;
    }

    $storage_handler = \Drupal::entityTypeManager()->getStorage("node");
    $nodes = $storage_handler->loadMultiple($nids);

    foreach ($nodes as $node)
    {
      // Unpublish nodes
      $nid = $node->id();
      $node->setPublished(false);
      $node->set('moderation_state', "unpublished");

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
   * @return array $tids
   *   term ids
   */
  protected function getToxonomyTermIdByName(int $name, string $flag = 'name')
  { 
    $names = []; $tids = [];
    for ($i=0; $i<=5; $i++) {
      $names[] = $name - $i;
    }

    $result = \Drupal::entityQuery('taxonomy_term')
      ->condition($flag, $names, 'in')
      ->condition('vid', $this->vocabulary)
      ->execute();

    $terms = \Drupal::entityTypeManager()
      ->getStorage('taxonomy_term')
      ->loadMultiple($result);

    foreach ($terms as $term) {
      $tids[] = $term->id();
    }
    return $tids;
  }

  /**
   * Get method
   */
  public function getCountUpdate()
  {
    return $this->countUpdate;
  }

} //END class
