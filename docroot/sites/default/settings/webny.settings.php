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
  // CONNCETION TO DRUPAL VM SOLAR FOR LOCAL SOLR SEARCH
  $config['search_api.server.acquia_search_server'] = [
    'langcode' => 'en',
    'status' => 'true',
    'name' =>  'Acquia Search API Solr server',
    'backend_config' => [
      'connector' => 'basic_auth',
      'connector_config' => [
        'scheme' => 'http',
        'host' => 'webny.dev',
        'port' => '8983',
        'path' => '/solr',
        'core' => 'd8',
        'timeout' => '5',
        'index_timeout' => '5',
        'optimize_timeout' => '10',
        'commit_within' => '1000',
        'username' => 'admin',
        'password' => 'admin',
        'solr_version' => '',
        'http_method' => 'AUTO',
      ],

      'retrieve_data' => 'false',
      'highlight_data' => 'false',
      'excerpt' => 'false',
      'skip_schema_check' => 'false',
      'site_hash' => 'false',
    ],

  ];
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

