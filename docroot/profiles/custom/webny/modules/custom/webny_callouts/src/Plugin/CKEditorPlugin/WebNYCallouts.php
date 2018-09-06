<?php

namespace Drupal\webny_callouts\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginInterface;
use Drupal\ckeditor\CKEditorPluginButtonsInterface;
use Drupal\Component\Plugin\PluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "WebNYCallouts" plugin.
 *
 * @CKEditorPlugin(
 *   id = "webny_callouts",
 *   label = @Translation("WebNYCallouts")
 * )
 */
class WebNYCallouts extends PluginBase implements CKEditorPluginInterface, CKEditorPluginButtonsInterface {
    /**
     * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getDependencies().
     */
    function getDependencies(Editor $editor) {
        return array();
    }

    /**
     * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getLibraries().
     */
    function getLibraries(Editor $editor) {
        return array();
    }

    /**
     * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::isInternal().
     */
    function isInternal() {
        return FALSE;
    }

    /**
     * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getFile().
     */
    function getFile() {
        $plugin = drupal_get_path('module', 'webny_callouts') . '/js/webny_callouts/plugin.js';
        return $plugin;
    }

    /**
     * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getConfig().
     */
    public function getConfig(Editor $editor) {
        return array();
    }

    /**
     * Implements \Drupal\ckeditor\Plugin\CKEditorPluginButtonsInterface::getButtons().
     */
    public function getButtons() {
        return array(
            'WebNYCallouts' => array(
                'label' => t('WebNY Callouts'),
                'image' => drupal_get_path('module', 'webny_callouts') . '/js/webny_callouts/icons/webny_callouts_sm.png',
            ),
        );
    }
}
