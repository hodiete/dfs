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
   * Features directory.
   */
  const FEATURES_DIR = 'modules/custom/features';

  /**
   * Contrib directory.
   */
  const CONTRIB_DIR = 'modules/contrib';

  /*
   * Themes directory.
   */
  const THEME_DIR = 'themes/custom/';

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
      return Yaml::parse(file_get_contents($this->locateResource($resource)));
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
      $this->getProfilePath() . '/modules/custom/webny_media/' . self::CONFIG_DIR . '/install',
      $this->getProfilePath() . '/modules/custom/webny_media/' . self::CONFIG_DIR . '/optional',
      $this->getProfilePath() . '/modules/custom/webny_global_nav/' . self::CONFIG_DIR . '/install',
      $this->getProfilePath() . '/modules/custom/webny_global_nav/' . self::CONFIG_DIR . '/optional',
      $this->getProfilePath() . '/modules/custom/webny_secondary_nav/' . self::CONFIG_DIR . '/install',
      $this->getProfilePath() . '/modules/custom/webny_secondary_nav/' . self::CONFIG_DIR . '/optional',
      $this->getProfilePath() . '/modules/custom/webny_photo_gallery/' . self::CONFIG_DIR . '/install',
      $this->getProfilePath() . '/modules/custom/webny_photo_gallery/' . self::CONFIG_DIR . '/optional',
      $this->getProfilePath() . '/modules/custom/webny_unav/' . self::CONFIG_DIR . '/install',
      $this->getProfileFeatureConfigPath('base') . '/install',
      $this->getProfileFeatureConfigPath('news_content_type') . '/install',
      $this->getProfileFeatureConfigPath('news_content_type') . '/optional',
      $this->getProfileFeatureConfigPath('landing_page_content_type') . '/install',
      $this->getProfileFeatureConfigPath('landing_page_content_type') . '/optional',
      $this->getProfileFeatureConfigPath('contact_content_type') . '/install',
      $this->getProfileFeatureConfigPath('contact_content_type') . '/optional',
      $this->getProfileFeatureConfigPath('event_content_type') . '/install',
      $this->getProfileFeatureConfigPath('event_content_type') . '/optional',
      $this->getProfileFeatureConfigPath('global_navigation_footer') . '/install',
      $this->getProfileFeatureConfigPath('global_navigation_footer') . '/optional',
      $this->getProfileFeatureConfigPath('image_styles') . '/install',
      $this->getProfileFeatureConfigPath('image_styles') . '/optional',
      $this->getProfileFeatureConfigPath('inner_page_content_type') . '/install',
      $this->getProfileFeatureConfigPath('inner_page_content_type') . '/optional',
      $this->getProfileFeatureConfigPath('taxonomies') . '/install',
      $this->getProfileFeatureConfigPath('taxonomies') . '/optional',
      $this->getProfileContribModulePath('yamlform') . '/' . self::CONFIG_DIR . '/install',
      $this->getProfileContribModulePath('webform') . '/' . self::CONFIG_DIR . '/install',
      $this->getProfileFeatureConfigPath('whitelisted_content') . '/install',
      $this->getProfileFeatureConfigPath('whitelisted_content') . '/optional',
      $this->getProfileThemeConfigPath('dfs_ny') . '/install',
      $this->getProfileFeatureConfigPath('document_content_type') . '/install',
      $this->getProfileFeatureConfigPath('document_content_type') . '/optional',
      $this->getProfileFeatureConfigPath('paragraphs_types') . '/install',
      $this->getProfileFeatureConfigPath('paragraphs_types') . '/optional',
      $this->getProfileFeatureConfigPath('generic_content_type') . '/install',
      $this->getProfileFeatureConfigPath('generic_content_type') . '/optional',
      $this->getProfileFeatureConfigPath('wysiwyg_frame') . '/install',
      $this->getProfileFeatureConfigPath('wysiwyg_frame') . '/optional',
      $this->getProfileFeatureConfigPath('webny_bio_frame') . '/install',
      $this->getProfileFeatureConfigPath('webny_bio_frame') . '/optional',
      $this->getProfileFeatureConfigPath('get_involved_frame') . '/install',
      $this->getProfileFeatureConfigPath('get_involved_frame') . '/optional',
      $this->getProfilePath() . '/themes/custom/webnycommander/' . self::CONFIG_DIR . '/install',
      $this->getProfilePath() . '/themes/custom/webnycommander/' . self::CONFIG_DIR . '/optional',
      $this->getProfileFeatureConfigPath('workflow_basic_configuration') . '/install',
      $this->getProfileFeatureConfigPath('workflow_basic_configuration') . '/optional',
        $this->getProfileFeatureConfigPath('what_s_related_frame') . '/install',
        $this->getProfileFeatureConfigPath('what_s_related_frame') . '/optional',
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

  /**
   * Get a contrib modules path.
   *
   * @param string $module_machine_name
   *   This is the modules name as used on it's d.o oveview page
   *    ie, module_name, better_views, other_module
   *
   * @return string
   *   Path to the webny contrib modules specific directory as declared via $module_machine_name
   */
  protected function getProfileContribModulePath($module_machine_name) {
    return $this->getProfilePath() . '/' . self::CONTRIB_DIR . '/' . $module_machine_name;
  }

  /**
   * Get a profile theme path.
   *
   * @param string $theme_name
   *   Theme machine name WITH the theme bundle name, e.g. dfs_ny, not
   *   theme.
   *
   * @return string
   *   Path to the theme.
   */
  protected function getProfileThemePath($theme_name) {
    return $this->getProfilePath() . '/' . self::THEME_DIR . $theme_name;
  }
  /**
   * Get a profile theme configuration path.
   *
   * @param string $theme_name
   *   Theme machine name WITH the theme bundle name, e.g. dfs_ny, not
   *   theme.
   *
   * @return string
   *   Path to the theme configuration base directory.
   */
  protected function getProfileThemeConfigPath($theme_name) {
    return $this->getProfileThemePath($theme_name) . '/' . self::CONFIG_DIR;
  }
}
