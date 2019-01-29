<?php

namespace Acquia\Blt\Custom\Commands;

use Acquia\Blt\Robo\Commands\Setup\ConfigCommand;
use Acquia\Blt\Robo\Exceptions\BltException;

/**
 * Defines commands in the "setup:config*" namespace.
 */
class ConfigImportCommand extends ConfigCommand {

  /**
   * Imports configuration from the config directory according to cm.strategy.
   *
   * @hook replace-command setup:config-import
   */
  public function import() {
    $strategy = $this->getConfigValue('cm.strategy');
    $cm_core_key = $this->getConfigValue('cm.core.key');
    $this->logConfig($this->getConfigValue('cm'), 'cm');

    if ($strategy != 'none') {
      $this->invokeHook('pre-config-import');

      // If using core-only or config-split strategies, first check to see if
      // required config is exported.
      if (in_array($strategy, ['core-only', 'config-split'])) {
        $core_config_file = $this->getConfigValue('docroot') . '/' . $this->getConfigValue("cm.core.dirs.$cm_core_key.path") . '/core.extension.yml';

        if (!file_exists($core_config_file)) {
          $this->logger->warning("BLT will NOT import configuration, $core_config_file was not found.");
          // This is not considered a failure.
          return 0;
        }
      }

      $task = $this->taskDrush()
        ->stopOnFail()
        ->drush('sql-query')
        ->arg('SHOW VARIABLES');

      $task = $this->taskDrush()
        ->stopOnFail()
        // Sometimes drush forgets where to find its aliases.
        ->drush("cc")->arg('drush')
        // Rebuild caches in case service definitions have changed.
        // @see https://www.drupal.org/node/2826466
        ->drush("cache-rebuild")
        // Execute db updates.
        // This must happen before features are imported or configuration is
        // imported. For instance, if you add a dependency on a new extension to
        // an existing configuration file, you must enable that extension via an
        // update hook before attempting to import the configuration.
        // If a db update relies on updated configuration, you should import the
        // necessary configuration file(s) as part of the db update.
        ->drush("updb");

      // Retrieve the config UUID and set site UUID to allow config import
      // for existing sites.
      $cm_uuid = $this->getConfigValue('cm.uuid');
      if ($cm_uuid != NULL) {
        $task = $this->taskDrush()
          ->drush("cset system.site uuid $cm_uuid")
          ->assume(TRUE);
      }

      switch ($strategy) {
        case 'core-only':
          $this->importCoreOnly($task, $cm_core_key);
          break;

        case 'config-split':
          $this->importConfigSplit($task, $cm_core_key);
          break;

        case 'features':
          $this->importFeatures($task, $cm_core_key);
          break;
      }

      $task->drush("cache-rebuild");
      $result = $task->run();
      if (!$result->wasSuccessful()) {
        throw new BltException("Failed to import configuration!");
      }

      if ($this->getConfigValue('cm.features.no-overrides')) {
        $this->logger->warning("Features override checks are currently disabled due to a Drush 9 incompatibility.");
        // @codingStandardsIgnoreLine
        // $this->checkFeaturesOverrides();
      }

      $this->checkConfigOverrides($cm_core_key);

      $result = $this->invokeHook('post-config-import');

      return $result;
    }
  }

}
