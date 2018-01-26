<?php

namespace Acquia\Blt\Custom\Commands;

use Acquia\Blt\Robo\BltTasks;

/**
 * Synchronize local environment from remote (remote [prod-ig] --> local).
 *
 * As of BLT version 8.9.0 all Phing commands are obsolete.
 * See https://github.com/acquia/blt/releases/tag/8.9.0.
 * This is a port of a custom Phing command to Robo.
 * The original Phing commands are located in /blt/custom/phing.
 */
class ProdIgLocalSyncCommand extends BltTasks {

  /**
   * Synchronize local env from prod-ig.
   *
   * @command sync:prod-ig
   */
  public function prodIgSync($options = [
    'sync-files' => FALSE,
  ]) {

    $commands = [
      'sync:db:prod-ig',
    ];

    if ($options['sync-files'] || $this->getConfigValue('sync.files')) {
      $commands[] = 'sync:files:prod-ig';
    }

    $this->invokeCommands($commands);

  }

}
