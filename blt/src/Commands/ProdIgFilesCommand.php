<?php

namespace Acquia\Blt\Custom\Commands;

use Acquia\Blt\Robo\BltTasks;

/**
 * Defines commands in the "acsf" namespace.
 *
 * As of BLT version 8.9.0 all Phing commands are obsolete.
 * See https://github.com/acquia/blt/releases/tag/8.9.0.
 * This is a port of a custom Phing command to Robo.
 * The original Phing commands are located in /blt/custom/phing.
 */
/**
 * Synchronize Files from remote (remote [prod-ig] --> local).
 */
class ProdIgFilesCommand extends BltTasks {

  /**
   * Copies prod-ig files to local machine.
   *
   * @command sync:files:prod-ig
   */
  public function prodIgSyncFiles() {
    $remote_alias = '@' . $this->getConfigValue('drush.aliases.remote-ig-prod');
    $site_dir = $this->getConfigValue('site');

    $task = $this->taskDrush()
      ->alias('')
      ->assume('')
      ->uri('')
      ->drush('rsync')
      ->arg($remote_alias . ':%files/')
      ->arg($this->getConfigValue('docroot') . "/sites/$site_dir/files")
      ->option('exclude-paths', implode(':', $this->getConfigValue('sync.exclude-paths')));

    $result = $task->run();

    return $result;
  }

}
