<?php

namespace Drupal\public_appeal_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;
use Drupal\public_appeal_search\Form\SearchForm;

/**
 * Provides a 'Hello' Block.
 *
 * @Block(
 *   id = "public_appeal_search_block",
 *   admin_label = @Translation("Public Appeal Search Block"),
 *   category = @Translation("Custom block"),
 * )
 */
class PublicAppealSearch extends BlockBase
{

  /**
   * {@inheritdoc}
   */
  public function build()
  {
    $form = \Drupal::formBuilder()->getForm('\Drupal\public_appeal_search\Form\SearchForm');
    return $form;
  }


}
