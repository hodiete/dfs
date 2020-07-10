<?php

/**
 * @file
 * Custom theme settings for WebNY Theme that
 * uses form_system_theme_settings_alter hook. From the Drupal API:
 * "With this hook, themes can alter the theme-specific settings form in any
 * way allowable by Drupal's Form API, such as adding form elements, changing
 * default values and removing form elements. See the Form API documentation
 * on api.drupal.org for detailed information."
 * https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Render!theme.api.php/
 * function/hook_form_system_theme_settings_alter/8
 *
 */

use Drupal\Core\Form;

/**
 * Implementation of hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 *
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function dfs_ny_form_system_theme_settings_alter(&$form, &$form_state) {
  // keep options for radio buttons, and drop-downs as variables in a separate file
  // so it's easier to manage when changes are needed.
  require_once(drupal_get_path('theme', 'dfs_ny') . '/inc/theme_settings.options.inc');
  // Set up a fieldset for WebNY theme options
  $form['dfs_ny_settings'] = array(
    '#type'         => 'details',
    '#title'        => t('WebNY DFS Theme'),
    '#description'  => t('Settings for the WebNY DFS theme.'),
    '#weight' => -1000,
    '#open' => TRUE,
  );
  // Set up a drop-down for the flavor options
  $form['dfs_ny_settings']['site_color_pallet'] = array(
    '#type' => 'select',
    '#title' => t('Site color palettes:'),
    '#default_value' => theme_get_setting('site_color_pallet'),
    '#options' => $agency_groupings,
    '#description'  => t('Select a color palettes. None, the default, uses ny.gov colors.  Note that if you change this value you need to clear the theme cache'),
  );
}
