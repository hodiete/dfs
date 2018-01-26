<?php

namespace Acquia\Blt\Custom\Commands;

use Acquia\Blt\Robo\BltTasks;
use Acquia\Blt\Robo\Exceptions\BltException;

/**
 * Defines commands in the "deploy" namespace.
 */
class DeployAcsfInitCommand extends BltTasks {

  /**
   * Re-initialize ACSF with the settings.php changes required for artifact.
   *
   * @command deploy:acsf:init
   * @description Re-initialize ACSF with the settings.php changes required for artifact.
   *
   * @throws \Exception
   */
  public function deployAcsfInit() {
    $this->taskFilesystemStack()->chmod("{$this->getConfigValue('docroot')}/sites/default/settings.php", 755);
    $result = $this->taskDrush()
      ->drush('acsf-init -r' . $this->getConfigValue('docroot') . ' -y')
      ->alias("")
      ->includePath("{$this->getConfigValue('docroot')}/profiles/custom/webny/modules/contrib/acsf/acsf_init")
      ->run();
    if (!$result->wasSuccessful()) {
      throw new BltException("Failed to re-initialize ACSF.");
    }

    return $result;
  }

}
