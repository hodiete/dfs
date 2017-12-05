<?php

namespace Drupal\webny_solr_searches\Plugin\facets\processor;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\facets\FacetInterface;
use Drupal\facets\Processor\BuildProcessorInterface;
use Drupal\facets\Processor\ProcessorPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * A processor to limit the taxonomy to select levels.
 *
 * @FacetsProcessor(
 *   id = "taxonomy_levels",
 *   label = @Translation("Include specified taxonomy levels."),
 *   description = @Translation("Provide a comma-delimited list of accepted taxonomy levels."),
 *   stages = {
 *     "build" = 5
 *   }
 * )
 */
class TaxonomyLevelsProcessor extends ProcessorPluginBase implements BuildProcessorInterface, ContainerFactoryPluginInterface {
  /**
   * Entity Type Manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a TaxonomyLevelsProcessor object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build(FacetInterface $facet, array $results) {
    $processors = $facet->getProcessors();
    $config = $processors[$this->getPluginId()];
    $valid_levels = explode(',', $config->getConfiguration()['include_levels']);
    $storage = $this->entityTypeManager->getStorage('taxonomy_term');

    foreach ($results as $id => $result) {
      // Get term level by retrieving/counting parents.
      $parents = $storage->loadAllParents($result->getRawValue());
      $term_level = count($parents);

      // Unset invalid facet levels.
      if (!in_array($term_level, $valid_levels)) {
        unset($results[$id]);
      }
    }

    return $results;
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state, FacetInterface $facet) {
    $processors = $facet->getProcessors();
    $config = isset($processors[$this->getPluginId()]) ? $processors[$this->getPluginId()] : NULL;

    $build['include_levels'] = [
      '#title' => $this->t('Include taxonomy levels'),
      '#type' => 'textfield',
      '#default_value' => !is_null($config) ? $config->getConfiguration()['include_levels'] : $this->defaultConfiguration()['include_levels'],
      '#description' => $this->t("Comma separated list of taxonomy levels to include (ex. 2, 3, 4)"),
    ];

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'include_levels' => '',
    ];
  }

}
