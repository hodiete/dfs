<?php

/**
 * @file
 * Drupal\default_content\Event\ImportEvent.
 */

namespace Drupal\default_content\Event;

use Symfony\Component\EventDispatcher\Event;
/**
 * Constructs a new import event.
 */
class ImportEvent extends Event {

  /**
   * An array of content entities that were imported.
   *
   * @var \Drupal\Core\Entity\ContentEntityInterface[]
   */
  protected $entities;

  /**
   * The module that provides the default content.
   *
   * @var string
   */
  protected $module;

  /**
   * Constructs a new import event.
   *
   * @param \Drupal\Core\Entity\ContentEntityInterface[] $entities
   *   An array of content entities that were imported.
   * @param string $module
   *   The module that provided the default content.
   */
  public function __construct(array $entities, $module) {
    $this->entities = $entities;
    $this->module = $module;
  }

  /**
   * Get the imported entities.
   *
   * @return \Drupal\Core\Entity\ContentEntityInterface[]
   *   Get entities.
   */
  public function getImportedEntities() {
    return $this->entities;
  }

  /**
   * Gets the module name.
   *
   * @return string
   *   The module name that provided the default content.
   */
  public function getModule() {
    return $this->module;
  }

}
