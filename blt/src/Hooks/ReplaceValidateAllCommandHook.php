<?php

namespace Acquia\Blt\Custom\Hooks;

use Acquia\Blt\Robo\BltTasks;

/**
 * Defines commands in the "validate:all*" namespace.
 */
class ReplaceValidateAllCommandHook extends BltTasks {

  /**
   * Runs all code validation commands.
   *
   * @hook replace-command validate
   */
  public function replaceAll() {
    $status_code = $this->invokeCommands([
      'validate:composer',
      'validate:lint',
      'validate:phpcs',
      'validate:yaml',
    ]);

    return $status_code;
  }

}
