<?php

namespace Acquia\Blt\Custom\Hooks;

use Acquia\Blt\Robo\BltTasks;

/**
 * Defines commands in the "acsf" namespace.
 */
class ReplaceAcsfCommandHook extends BltTasks {

  /**
   * Initializes ACSF support for project.
   *
   * @hook replace-command acsf:init
   */
  public function replaceAcsfInitialize($options = ['acsf-version' => '^1.37.0']) {
    $this->say('Adding acsf module as a dependency...');
    $package_options = [
      'package_name' => 'drupal/acsf',
      'package_version' => $options['acsf-version'],
    ];
    $this->invokeCommand('composer:require', $package_options);
    $this->say("In the future, you may pass in a custom value for acsf-version to override the default version. E.g., blt acsf:init --acsf-version='8.1.x-dev'");
    $this->acsfDrushInitialize();
    $this->say('Adding acsf-tools drush module as a dependency...');
    $package_options = [
      'package_name' => 'acquia/acsf-tools',
      'package_version' => '^8.1',
    ];
    $this->invokeCommand('composer:require', $package_options);
    $this->say('<comment>ACSF Tools has been added. Some post-install configuration is necessary.</comment>');
    $this->say('<comment>See /drush/contrib/acsf-tools/README.md. </comment>');
    $this->say('<info>ACSF was successfully initialized.</info>');
  }

  /**
   * Refreshes the ACSF settings and hook files.
   *
   * @hook replace-command acsf:init:drush
   */
  public function replaceAcsfDrushInitialize() {
    $this->say('Executing initialization command provided acsf module...');
    $this->taskFilesystemStack()->chmod("{$this->getConfigValue('docroot')}/sites/default", 755);
    $result = $this->taskDrush()
      ->drush('acsf-init')
      ->alias("")
      ->includePath("{$this->getConfigValue('docroot')}/profiles/custom/webny/modules/contrib/acsf/acsf_init")
      ->run();
    $this->say('<comment>Please add acsf_init as a dependency for your installation profile to ensure that it remains enabled.</comment>');
    $this->say('<comment>An example alias file for ACSF is located in /drush/site-aliases/example.acsf.aliases.drushrc.php.</comment>');
    return $result;
  }

}
