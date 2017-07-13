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

# Memcache configuration.
if (isset($_ENV['AH_SITE_ENVIRONMENT']) && $_ENV['AH_SITE_ENVIRONMENT'] != 'prod' && isset($conf['memcache_servers'])) {
    # E.g. use memcache for cache_discovery
    $settings['cache']['bins']['discovery'] = 'cache.backend.memcache';
    # Set up a default cache bin for memcache
    $settings['memcache']['bins'] = [
        'default' => 'default'
    ];
    # Acquia is in the process of upgrading the platform-provided memcache
    # settings. This is the recommended approach for now.
    $settings['memcache']['servers'] = $conf['memcache_servers'];
    $settings['memcache']['key_prefix'] = $conf['memcache_key_prefix'];
}

// Configuration for using Search API Solr and Acquia Search
if (isset($_ENV['AH_SITE_ENVIRONMENT'])) {
  if ($_ENV['AH_SITE_ENVIRONMENT'] == '01live') {
    $config['acquia_search.settings']['connection_override'] = [
      'scheme' => 'http',
      'port' => 80,
      'host' => 'us-east-1-c26.acquia-search.com',
      'index_id' => 'KQRX-84738.01live.default',
      'derived_key' => '2016267692f98a4af00b38b09b3847e45d15e131',
    ];
  }
  elseif ($_ENV['AH_SITE_ENVIRONMENT'] == '01update') {
    $config['acquia_search.settings']['connection_override'] = [
      'scheme' => 'http',
      'port' => 80,
      'host' => 'us-east-1-c26.acquia-search.com',
      'index_id' => 'KQRX-84738.01update.default',
      'path' => '/solr/KQRX-84738.01update.default',
      'derived_key' => 'ee3b8676625aad1e2e94caab335e946eabadfd60',
    ];
  }
  elseif ($_ENV['AH_SITE_ENVIRONMENT'] == '01dev') {
    $config['acquia_search.settings']['connection_override'] = [
      'scheme' => 'http',
      'port' => 80,
      'host' => 'us-east-1-c26.acquia-search.com',
      'index_id' => 'KQRX-84738.01dev.default',
      'path' => '/solr/KQRX-84738.01dev.default',
      'derived_key' => 'c7af8e5972b65a73357117062872552cac1ca999',
    ];
  }
  elseif ($_ENV['AH_SITE_ENVIRONMENT'] == '01devup') {
    $config['acquia_search.settings']['connection_override'] = [
      'scheme' => 'http',
      'port' => 80,
      'host' => 'us-east-1-c26.acquia-search.com',
      'index_id' => 'KQRX-84738.01devup.default',
      'path' => '/solr/KQRX-84738.01devup.default',
      'derived_key' => 'fcf569d7e6356f7267f6334bfe1dbaaad4cef80b',
    ];
  }
  elseif ($_ENV['AH_SITE_ENVIRONMENT'] == '01test') {
    $config['acquia_search.settings']['connection_override'] = [
      'scheme' => 'http',
      'port' => 80,
      'host' => 'us-east-1-c26.acquia-search.com',
      'index_id' => 'KQRX-84738.01test.default',
      'path' => '/solr/KQRX-84738.01test.default',
      'derived_key' => '8e856b2103602135eb0f49ce63b67e90ee20152c',
    ];
  }
  elseif ($_ENV['AH_SITE_ENVIRONMENT'] == '01testup') {
    $config['acquia_search.settings']['connection_override'] = [
      'scheme' => 'http',
      'port' => 80,
      'host' => 'us-east-1-c26.acquia-search.com',
      'index_id' => 'KQRX-84738.01testup.default',
      'path' => '/solr/KQRX-84738.01testup.default',
      'derived_key' => '9c9566f918869727dbb60dd196d5ee1259f9570d',
    ];
  }
} else {
  // Local or other non-acquia-hosted Drupal environment
  // Currently using 01dev index if Acquia Connector and Acquia Search are enabled for local development
  $config['acquia_search.settings']['connection_override'] = [
    'scheme' => 'http',
    'port' => 80,
    'host' => 'us-east-1-c26.acquia-search.com',
    'index_id' => 'KQRX-84738.01dev.default',
    'path' => '/solr/KQRX-84738.01dev.default',
    'derived_key' => 'c7af8e5972b65a73357117062872552cac1ca999',
  ];
}


