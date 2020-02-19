<?php

namespace Drupal\public_appeal_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;
use Drupal\public_appeal_search\Form\SolrSearchForm;

/**
 * Provides a 'Public Appeal Search Solr' Block.
 *
 * @Block(
 *   id = "public_appeal_search_solr_block",
 *   admin_label = @Translation("Public Appeal Search Solr Block"),
 *   category = @Translation("Custom block"),
 * )
 */
class PublicAppealSearchSolr extends BlockBase
{

  /**
   * {@inheritdoc}
   */
  public function build()
  {
    return "Solr Search Block is under development";
    // Not use
    $form = \Drupal::formBuilder()->getForm('\Drupal\public_appeal_search\Form\SearchSolrForm');
    return $form;
  }


}
