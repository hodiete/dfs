<?php

namespace Acquia\Blt\Custom\Hooks;

use Acquia\Blt\Robo\BltTasks;

/**
 * Defines commands in the "tests" namespace.
 */
class ReplaceTestsAllCommandHook extends BltTasks {

  /**
   * Runs all tests, including Behat, PHPUnit, and security updates check.
   *
   * @hook replace-command tests
   *
   * @executeInDrupalVm
   */
  public function replaceTests() {
    $this->invokeCommands([
      'tests:behat',
      'tests:phpunit',
      'frontend:test',
    ]);
  }

}
