<?php

/**
 * @file
 * Example implementation of ACSF pre-settings-php hook.
 *
 * @see https://docs.acquia.com/site-factory/tiers/paas/workflow/hooks
 */

// Configure your hash salt here.
$settings['hash_salt'] = 'NZ4pGCYwwI0kPGr5KwDkK1IgC2XOl8jFURj7q8lgAUBw6xxRXlWJNZZ';

require DRUPAL_ROOT . '/sites/default/settings/blt.settings.php';
