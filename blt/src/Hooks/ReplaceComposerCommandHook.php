<?php

namespace Acquia\Blt\Custom\Hooks;

use Acquia\Blt\Robo\BltTasks;

/**
 * Defines commands in the "validate:composer*" namespace.
 */
class ReplaceComposerCommandHook extends BltTasks {

  /**
   * Validates root composer.json and composer.lock files.
   *
   * @hook replace-command validate:composer
   */
  public function replaceValidate() {
    $this->say("Validating composer.json and composer.lock...");
    $result = $this->taskExecStack()
      ->dir($this->getConfigValue('repo.root'))
      ->exec('composer validate --no-check-all --ansi')
      ->setVerbosityThreshold(VerbosityThresholdInterface::VERBOSITY_VERBOSE)
      ->run();
    if (!$result->wasSuccessful()) {
      $this->say($result->getMessage());
      $this->logger->error("composer.lock is invalid.");
      throw new BltException("composer.lock is invalid!");
    }
  }

}
