<?php

/*
 * @file
 * Contains \Drupal\webny\ProfileConfig.
 */

namespace Drupal\webny;

use Drupal\Core\Config\ConfigFactoryInterface;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Yaml\Yaml;

class ProfileConfig {

  /**
   * Config directory.
   */
  const CONFIG_DIR = 'config';

  /**
   * Config directory.
   */
  const FEATURES_DIR = 'modules/custom/features';

  /**
   * Config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * Profile path.
   *
   * @var string
   */
  protected $profilePath;

  /**
   * Profile config constructor.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    $this->configFactory = $config_factory;
  }

  /**
   * Import profile config data.
   *
   * @param string $resource
   *   A resource without the .yml extension.
   * @param array $data
   *   Additional data that's merged with the config data.
   *
   * @return mixed
   *   Return \Drupal\Core\Config\Config; otherwise FALSE.
   */
  public function import($resource, array $data = array()) {
    $loaded_data = $this->load($resource);

    if (!isset($loaded_data)) {
      return FALSE;
    }

    $this->add($resource, array_merge_recursive($loaded_data, $data));
  }

  /**
   * Bulk import resources.
   *
   * @param array $resources
   *   An array of resources keyed by:
   *     - name
   *     - merge_data (optional)
   *   Otherwise an array of resource paths.
   */
  public function bulkImport(array $resources) {
    foreach ($resources as $resource) {
      if (is_string($resource)) {
        $this->import($resource);
      }
      else {
        if (!isset($resource['name'])) {
          continue;
        }
        $data = isset($resource['merge_data'])
          ? $resource['merge_data']
          : [];

        $this->import($resource['name'], $data);
      }
    }
  }

  /**
   * Add profile config data.
   *
   * @param string $resource
   *   A resource without the .yml extension.
   * @param array $data
   *   An array of configuration data.
   *
   * @return mixed
   *   Return \Drupal\Core\Config\Config; otherwise FALSE.
   */
  public function add($resource, array $data) {
    if (!isset($resource)) {
      return FALSE;
    }

    return $this->configFactory->getEditable($resource)->setData($data)->save();
  }

  /**
   * Load profile config data.
   *
   * @param string $resource
   *   A resource without the .yml extension.
   *
   * @return array
   *   An array of the YAML parsed file.
   */
  protected function load($resource) {
    return Yaml::parse($this->locateResource($resource));
  }

  /**
   * Locate resource path.
   *
   * @param string $resource
   *   A resource without the .yml extension.
   *
   * @return string
   *   The resource file path.
   */
  protected function locateResource($resource) {
    if (strpos($resource, '.yml') === TRUE) {
      return NULL;
    }
    $locations = new FileLocator([
      $this->getProfilePath() . '/' . self::CONFIG_DIR . '/install',
      $this->getProfilePath() . '/' . self::CONFIG_DIR . '/optional',
      $this->getProfileFeatureConfigPath('base') . '/install',
      $this->getProfileFeatureConfigPath('news_content_type') . '/install',
      $this->getProfileFeatureConfigPath('news_content_type') . '/optional',
    ]);

    return $locations->locate($resource . '.yml');
  }

  /**
   * Get webny profile path.
   *
   * @return string
   *   Return the installed profile path.
   */
  protected function getProfilePath() {
    if (!empty($this->profilePath)) {
      return $this->profilePath;
    }
    return $this->profilePath = drupal_get_path('profile', 'webny');
  }

  /**
   * Get a profile feature path.
   *
   * @param string $feature_name
   *   Feature machine name without the feature bundle name, e.g. base, not
   *   webny_base.
   *
   * @return string
   *   Path to the feature.
   */
  protected function getProfileFeaturePath($feature_name) {
    return $this->getProfilePath() . '/' . self::FEATURES_DIR . '/webny_' . $feature_name;
  }

  /**
   * Get a profile feature configuration path.
   *
   * @param string $feature_name
   *   Feature machine name without the feature bundle name, e.g. base, not
   *   webny_base.
   *
   * @return string
   *   Path to the feature configuration base directory.
   */
  protected function getProfileFeatureConfigPath($feature_name) {
    return $this->getProfileFeaturePath($feature_name) . '/' . self::CONFIG_DIR;
  }

}
