<?php

namespace Drupal\Tests\PHPUnit;

use Symfony\Component\Yaml\Yaml;

/**
 * Class TestBase.
 *
 * Verifies that behat configuration is as expected.
 */
abstract class TestBase extends \PHPUnit_Framework_TestCase {

  /**
   * {@inheritdoc}
   */
  protected $projectDirectory;

  /**
   * {@inheritdoc}
   */
  protected $drupalRoot;

  /**
   * {@inheritdoc}
   */
  protected $config;

  /**
   * Class constructor.
   */
  public function __construct($name = NULL, array $data = [], $data_name = '') {

    parent::__construct($name, $data, $data_name);
    $this->projectDirectory = dirname(dirname(dirname(__DIR__)));
    $this->drupalRoot = $this->projectDirectory . '/docroot';
    $this->config = Yaml::parse(file_get_contents("{$this->projectDirectory}/blt/project.yml"));
  }

}
