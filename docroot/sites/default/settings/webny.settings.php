<?php
/**
 * GA Configuration.
 */

if ($is_ah_env) {
  switch ($ah_env) {
    case '01test':
      $config['google_analytics.settings']['account'] = '';
      break;
    case '01dev':
      $config['google_analytics.settings']['account'] = '';
      break;
  }
}
if ($is_local_env) {
  $config['google_analytics.settings']['account'] = '';
}



/**
 * @file
 * Contains caching configuration.
 */

# General cache TTL config.
$config['system.performance']['cache']['page']['max_age'] = 900;

if ($is_ah_env) {
  switch ($ah_env) {
    case '01dev':
      # Disable page cache on dev. Note that this is set locally in development.services.yml.
      $config['system.performance']['cache']['page']['max_age'] = 5;
      break;
    case '01live':
      $config['system.logging']['error_level'] = 'hide';
      break;
  }
}
