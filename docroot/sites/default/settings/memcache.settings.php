<?php

# Memcache configuration for ACSF.
if (isset($_ENV['AH_SITE_ENVIRONMENT'])) {
  // Check for PHP Memcached libraries.
  /**
   * Memcache settings for the memcache API contrib module - from https://docs.acquia.com/article/resolving-installation-problems-drupal-8-memcache
   *
   */
  $memcache_exists = class_exists('Memcache', FALSE);
  $memcached_exists = class_exists('Memcached', FALSE);
  $memcache_module_is_present = file_exists(DRUPAL_ROOT . '/profiles/custom/webny/modules/contrib/memcache/memcache.services.yml');

  if ($memcache_module_is_present && ($memcache_exists || $memcached_exists)) {
    // Use Memcached extension if available.
    if ($memcached_exists) {
      $settings['memcache']['extension'] = 'Memcached';
    }
    // Register required class namespaces.
    if (class_exists(\Composer\Autoload\ClassLoader::class)) {
      $class_loader = new \Composer\Autoload\ClassLoader();
      $class_loader->addPsr4('Drupal\\memcache\\', 'profiles/custom/webny/modules/contrib/memcache/src');
      $class_loader->register();
      $settings['container_yamls'][] = DRUPAL_ROOT . '/profiles/custom/webny/modules/contrib/memcache/memcache.services.yml';
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
            'arguments' => [
              'container',
              '@memcache.backend.cache.container',
              '@lock.container',
              '@memcache.config',
              '@cache_tags_provider.container',
            ],
          ],
        ],
      ];
      // Override default fast chained backend for static bins.
      // @see https://www.drupal.org/node/2754947
      $settings['cache']['bins']['bootstrap'] = 'cache.backend.memcache';
      $settings['cache']['bins']['discovery'] = 'cache.backend.memcache';
      $settings['cache']['bins']['config'] = 'cache.backend.memcache';
      // Use memcache as the default bin.
      $settings['cache']['default'] = 'cache.backend.memcache';
    }
  }
  // Local memcache settings connecting to Drupal VM localhost, 127.0.0.1:11211.
  else {
    $memcache_exists = class_exists('Memcache', FALSE);
    $memcached_exists = class_exists('Memcached', FALSE);
    if ($memcache_exists || $memcached_exists) {
      $class_loader->addPsr4('Drupal\\memcache\\', 'profiles/custom/webny/modules/contrib/memcache/src');

      // Define custom bootstrap container definition to use Memcache for cache.container.
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
            'arguments' => ['@memcache.config']
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
            'arguments' => [
              'container',
              '@memcache.backend.cache.container',
              '@lock.container',
              '@memcache.config',
              '@cache_tags_provider.container'
            ],
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
    }
  }
}

