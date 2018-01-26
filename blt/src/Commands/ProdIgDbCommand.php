<?php

namespace Acquia\Blt\Custom\Commands;

use Acquia\Blt\Robo\BltTasks;

/**
 * Defines commands in the "sync" namespace.
 *
 * As of BLT version 8.9.0 all Phing commands are obsolete.
 * See https://github.com/acquia/blt/releases/tag/8.9.0.
 * This is a port of a custom Phing command to Robo.
 * The original Phing commands are located in /blt/custom/phing.
 */
class ProdIgDbCommand extends BltTasks {

  /**
   * Copies prod-ig db to local db.
   *
   * @command sync:db:prod-ig
   */
  public function prodIgsyncDbDefault() {
    $this->invokeCommand('setup:settings');

    $local_alias = '@' . $this->getConfigValue('drush.aliases.local');
    $remote_alias = '@' . $this->getConfigValue('drush.aliases.remote-ig-prod');

    $task = $this->taskDrush()
      ->alias('')
      ->drush('cache-clear drush')
      ->drush('sql-drop')
      ->drush('sql-sync')
      ->arg($remote_alias)
      ->arg($local_alias)
      ->option('structure-tables-key', 'lightweight')
      ->option('create-db')
      ->assume(TRUE);

    if ($this->getConfigValue('drush.sanitize')) {
      $drush_version = $this->getInspector()->getDrushMajorVersion();
      if ($drush_version == 8) {
        $task->option('sanitize');
      }
      else {
        $task->drush('sql-sanitize');
      }
    }

    $task->drush('cache-clear drush');

    $result = $task->run();

    return $result;
  }

}
