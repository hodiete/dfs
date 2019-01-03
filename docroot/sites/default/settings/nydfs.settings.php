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

# General cache TTL config. Set to 1 year, recommended for Purge and Acquia Purge cache invalidation using Varnish.
$config['system.performance']['cache']['page']['max_age'] = 31536000;

if ($is_ah_env) {
  switch ($ah_env) {
    case '01dev':
      # Disable page cache on dev. Note that this is also set locally in development.services.yml.
      # Set to 1 year for dev Purge and Acquia Purge testing on dev server.
      $config['system.performance']['cache']['page']['max_age'] = 31536000;
      break;
    case '01live':
      $config['system.logging']['error_level'] = 'hide';
      break;
  }
}

/*
$settings['trusted_host_patterns'] = [
  '^localhost$',
  '^127\.0\.0\.1$',
  '^webny\.local$',
  '^nydfs\.local$',
  '^nydfs2\.local$',
  '^nydfs*\.local$',
];

$databases['default']['default'] = array(
  'database' => 'drupal',
  'username' => 'root',
  'password' => 'root',
  'prefix' => '',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);

*/