<?php

namespace Drupal\webny_solr_searches\Plugin\search_api\processor;

use Drupal\search_api\Datasource\DatasourceInterface;
use Drupal\search_api\Item\ItemInterface;
use Drupal\search_api\Processor\ProcessorPluginBase;
use Drupal\search_api\Processor\ProcessorProperty;

/**
 * Adds a combined type field to the indexed data.
 *
 * @SearchApiProcessor(
 *   id = "combined_type",
 *   label = @Translation("Combined Type field"),
 *   description = @Translation("Adds a combined taxonomy/content type field to the indexed data."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 * )
 */
class CombinedType extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {
    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('Combined Type'),
        'description' => $this->t('A combined taxonomy/content type'),
        'type' => 'string',
        'processor_id' => $this->getPluginId(),
      ];
      $properties['webny_combined_type'] = new ProcessorProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $item_bundle = $item->getDatasource()->getItemBundle($item->getOriginalObject());
    
    // Types without content categorization taxonomy.
    $types_without_content_ctgy = [
        'webny_news' => 'News', 
        'webny_location' => 'Locations',
        'webny_whitelisted_content' => 'Services',
        'webny_contact' => 'Contacts',
    ];
    // Types with content categorization taxonomy.
    $types_with_content_ctgy = [
        'webny_event' => 'Events', 
        'webny_landing_page' => 'Programs',
        'webny_generic_page' => 'Services',
        'webny_page' => 'Services',
        'webny_document' => 'Documents',
    ];

    // Types with no content category term, fallback to value in above array.
    if (array_key_exists($item_bundle, $types_without_content_ctgy)) {
      $combined_type = $types_without_content_ctgy[$item_bundle];
    }

    // Types that may have category term.
    if (array_key_exists($item_bundle, $types_with_content_ctgy)) {
      $fields = $this->index->getFields();
      foreach ($item->getField('field_webny_contentcat__name') as $value) {
        $content_category_name = $value;
      }

      // Use category term name or fallback to value from above array.
      if ($content_category_name) {
        $combined_type = $content_category_name;
      }
      else {
        $combined_type = $types_with_content_ctgy[$item_bundle];
      }
    }

    // Assign the constructed value to the custom field.
    if ($combined_type) {
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($item->getFields(), NULL, 'webny_combined_type');
      foreach ($fields as $field) {
        $field->addValue($combined_type);
      }
    }
  }

}
