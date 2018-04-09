<?php

# Memcache configuration - for Local environment only.
if (!isset($_ENV['AH_SITE_ENVIRONMENT']) && isset($conf['memcache_servers'])) {
  /**
  Memcache settings for the memcache API contrib module - from https://www.drupal.org/project/drupal/issues/2766509
   *
   */
  if (class_exists(\Composer\Autoload\ClassLoader::class)) {
    $class_loader = new \Composer\Autoload\ClassLoader();
    $class_loader->addPsr4('Drupal\\memcache\\', 'profiles/custom/webny/modules/contrib/memcache/src');
    $class_loader->register();
    $settings['container_yamls'][] = DRUPAL_ROOT . 'profiles/custom/webny/modules/contrib/memcache/memcache.services.yml';

    // Bootstrap cache.container with memcache rather than database.
    $settings['bootstrap_container_definition'] = [
      'parameters' => [],
      'services' => [
        'database' => [
          'class' => 'Drupal\Core\Database\Connection',
          'factory' => 'Drupal\Core\Database\Database::getConnection',
          'arguments' => ['default'],
        ],
        'settings' => [
          'class' => 'Drupal\Core\Site\Settings',
          'factory' => 'Drupal\Core\Site\Settings::getInstance',
        ],
        'memcache.config' => [
          'class' => 'Drupal\memcache\DrupalMemcacheConfig',
          'arguments' => ['@settings'],
        ],
        'memcache.backend.cache.factory' => [
          'class' => 'Drupal\memcache\DrupalMemcacheFactory',
          'arguments' => ['@memcache.config'],
        ],
        'memcache.backend.cache.container' => [
          'class' => 'Drupal\memcache\DrupalMemcacheFactory',
          'factory' => ['@memcache.backend.cache.factory', 'get'],
          'arguments' => ['container'],
        ],
        'lock.container' => [
          'class' => 'Drupal\memcache\Lock\MemcacheLockBackend',
          'arguments' => ['container', '@memcache.backend.cache.container'],
        ],
        'cache_tags_provider.container' => [
          'class' => 'Drupal\Core\Cache\DatabaseCacheTagsChecksum',
          'arguments' => ['@database'],
        ],
        'cache.container' => [
          'class' => 'Drupal\memcache\MemcacheBackend',
          'arguments' => ['container', '@memcache.backend.cache.container', '@lock.container', '@memcache.config', '@cache_tags_provider.container'],
        ],
      ],
    ];

    // Override default configuration for static cache bins.
    $settings['cache']['bins']['bootstrap'] = 'cache.backend.memcache';

    # E.g. use memcache for cache_discovery
    $settings['cache']['bins']['discovery'] = 'cache.backend.memcache';
    $settings['cache']['bins']['config'] = 'cache.backend.memcache';

    // Use memcache as the default bin.
    $settings['cache']['default'] = 'cache.backend.memcache';

    # Set up a default cache bin for memcache
    $settings['memcache']['bins'] = [ 'default' => 'default' ];

    # Acquia is in the process of upgrading the platform-provided memcache
    # settings. This is the recommended approach for now.
    $settings['memcache']['servers'] = $conf['memcache_servers'];
    $settings['memcache']['key_prefix'] = $conf['memcache_key_prefix'];
  }

}
