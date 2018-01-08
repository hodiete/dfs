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
 * A processor to remove taxonomy terms for the filter term views.
 *
 * @FacetsProcessor(
 *   id = "webny_taxonomy_filter_term",
 *   label = @Translation("WebNY: Restrict filter term taxonomy to a views argument."),
 *   description = @Translation("Nodes tagged with terms from multiple parents may end up adding facets from the non-filtered parent. This happens because they show up in the search result."),
 *   stages = {
 *     "build" = 5
 *   }
 * )
 */
class TaxonomyFilterArgProcessor extends ProcessorPluginBase implements BuildProcessorInterface, ContainerFactoryPluginInterface {
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
    // No results, nothing to do.
    if (count($results) == 0) {
      return $results;
    }

    $parent_tid = '';
    $config = $this->getConfiguration();
    $term_storage = $this->entityTypeManager->getStorage('taxonomy_term');
    $term_vocab = $config['term_vocab'];
    $route_parameters = reset($results)->getUrl()->getRouteParameters();

    // Check a page with an arg or a node with a views block.
    if (isset($route_parameters['arg_0'])) {
      // Get argument value from first result.
      $arg_value = $route_parameters['arg_0'];

      // Check for numeric value or name.
      if (is_numeric($arg_value)) {
        $parent_tid = $arg_value;
      }
      else {
        $filter_term_machine = str_replace('-', '_', $arg_value);
        // Load term by machine name.
        $term = taxonomy_term_machine_name_load($filter_term_machine, $term_vocab);
        $parent_tid = $term->tid->value;
      }
    }
    elseif (isset($route_parameters['node'])) {
      // No arg parameter, check node for views paragraph type.
      $pathinfo = ltrim(\Drupal::service('path.current')->getPath(), '/');
      $url_object = \Drupal::service('path.validator')
        ->getUrlIfValid($pathinfo);
      // Get current route params because ajax request will reference home node.
      $ajax_route_params = $url_object->getRouteParameters();
      // Get the landing page paragraphs from the current node.
      $paragraph_storage = $this->entityTypeManager->getStorage('paragraph');
      $node = $this->entityTypeManager
        ->getStorage('node')
        ->load($ajax_route_params['node']);
      $paragraphs = $node->field_webny_landing_paragraph->getValue();

      // Find paragraph with the filter listing view.
      foreach ($paragraphs as $key => $value) {
        $paragraph = $paragraph_storage->load($paragraphs[$key]['target_id']);
        if ($paragraph->getType() == 'webny_filter_term_listing') {
          // Set the $parent_tid to the taxonomy id.
          $parent_tid = $paragraph->webny_filter_term->getValue()[0]['target_id'];
          break;
        }
      }
    }

    // If parent term id filter is found, discard terms from other parents.
    if (!empty($parent_tid)) {
      foreach ($results as $id => $result) {
        $parents = $term_storage->loadAllParents($result->getRawValue());

        // Unset if the facet item does not have the filtered parent term id.
        if (!array_key_exists($parent_tid, $parents)) {
          unset($results[$id]);
        }
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

    $build['term_vocab'] = [
      '#title' => $this->t('Taxonomy vocabulary machine name'),
      '#type' => 'textfield',
      '#default_value' => !is_null($config) ? $config->getConfiguration()['term_vocab'] : $this->defaultConfiguration()['term_vocab'],
      '#description' => $this->t("Provide the vocabulary machine name to query against."),
    ];

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'term_vocab' => '',
    ];
  }

}
