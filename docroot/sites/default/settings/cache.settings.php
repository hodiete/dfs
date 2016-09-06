<?php

/**
 * @file
 * Contains caching configuration.
 */

# General cache TTL config.
$config['system.performance']['cache']['page']['max_age'] = 900;

if ($is_ah_env) {
  switch ($ah_env) {
    case '01dev':
      # Disable page cache on dev.
      $config['system.performance']['cache']['page']['max_age'] = 0;
      break;
    case '01live':
      $config['system.logging']['error_level'] = 'hide';
      break;
  }
}

# Memcache configuration.
if (isset($_ENV['AH_SITE_ENVIRONMENT']) && $_ENV['AH_SITE_ENVIRONMENT'] != '01live' && isset($conf['memcache_servers'])) {
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
