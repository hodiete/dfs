<?php

namespace Acquia\Blt\Custom\Commands;

use Acquia\Blt\Robo\BltTasks;

/**
 * Composer install, builds frontend, copies prod-ig db & executes db updates.
 *
 * As of BLT version 8.9.0 all Phing commands are obsolete.
 * See https://github.com/acquia/blt/releases/tag/8.9.0.
 * This is a port of a custom Phing command to Robo.
 * The original Phing commands are located in /blt/custom/phing.
 */
class ProdIgRefreshCommand extends BltTasks {

  /**
   * Syncs local db from prod-ig and rebuilds local site.
   *
   * @command sync:refresh:prod-ig
   * @description Executes composer install, runs frontend command, copies prod-ig db to local db, re-imports config, and executes db updates.
   */
  public function replaceRefreshDefault() {
    $this->invokeCommands([
      'setup:composer:install',
      'sync:prod-ig',
      'setup:update',
      'frontend',
    ]);
  }

}
