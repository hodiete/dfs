<?php

if (!isset($drush_major_version)) {
  $drush_version_components = explode('.', DRUSH_VERSION);
  $drush_major_version = $drush_version_components[0];
}
// Site nysits, environment 01dev
$aliases['01dev'] = array(
  'root' => '/var/www/html/nysits.01dev/docroot',
  'ac-site' => 'nysits',
  'ac-env' => '01dev',
  'ac-realm' => 'enterprise-g1',
  'uri' => 'nysits01dev.enterprise-g1.acquia-sites.com',
  'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
  'remote-user' => 'nysits.01dev',
  'path-aliases' => array(
    '%drush-script' => 'drush' . $drush_major_version,
  )
);
// Site nysits, environment 01dev dev
$aliases['01dev.dev'] = array(
  'root' => '/var/www/html/nysits.01dev/docroot',
  'ac-site' => 'nysits',
  'ac-env' => '01dev',
  'ac-realm' => 'enterprise-g1',
  'uri' => 'http://dev.dev-nysits.acsitefactory.com',
  'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
  'remote-user' => 'nysits.01dev',
  'path-aliases' => array(
    '%drush-script' => 'drush' . $drush_major_version,
  )
);
$aliases['01dev.livedev'] = array(
  'parent' => '@nysits.01dev',
  'root' => '/mnt/gfs/nysits.01dev/livedev/docroot',
);

if (!isset($drush_major_version)) {
  $drush_version_components = explode('.', DRUSH_VERSION);
  $drush_major_version = $drush_version_components[0];
}
// Site nysits, environment 01devup
$aliases['01devup'] = array(
  'root' => '/var/www/html/nysits.01devup/docroot',
  'ac-site' => 'nysits',
  'ac-env' => '01devup',
  'ac-realm' => 'enterprise-g1',
  'uri' => 'nysits01devup.enterprise-g1.acquia-sites.com',
  'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
  'remote-user' => 'nysits.01devup',
  'path-aliases' => array(
    '%drush-script' => 'drush' . $drush_major_version,
  )
);
$aliases['01devup.livedev'] = array(
  'parent' => '@nysits.01devup',
  'root' => '/mnt/gfs/nysits.01devup/livedev/docroot',
);

if (!isset($drush_major_version)) {
  $drush_version_components = explode('.', DRUSH_VERSION);
  $drush_major_version = $drush_version_components[0];
}
// Site nysits, environment 01live
$aliases['01live'] = array(
  'root' => '/var/www/html/nysits.01live/docroot',
  'ac-site' => 'nysits',
  'ac-env' => '01live',
  'ac-realm' => 'enterprise-g1',
  'uri' => 'nysits01live.enterprise-g1.acquia-sites.com',
  'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
  'remote-user' => 'nysits.01live',
  'path-aliases' => array(
    '%drush-script' => 'drush' . $drush_major_version,
  )
);
$aliases['01live.livedev'] = array(
  'parent' => '@nysits.01live',
  'root' => '/mnt/gfs/nysits.01live/livedev/docroot',
);

if (!isset($drush_major_version)) {
  $drush_version_components = explode('.', DRUSH_VERSION);
  $drush_major_version = $drush_version_components[0];
}
// Site nysits, environment 01test
$aliases['01test'] = array(
  'root' => '/var/www/html/nysits.01test/docroot',
  'ac-site' => 'nysits',
  'ac-env' => '01test',
  'ac-realm' => 'enterprise-g1',
  'uri' => 'nysits01test.enterprise-g1.acquia-sites.com',
  'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
  'remote-user' => 'nysits.01test',
  'path-aliases' => array(
    '%drush-script' => 'drush' . $drush_major_version,
  )
);
$aliases['01test.livedev'] = array(
  'parent' => '@nysits.01test',
  'root' => '/mnt/gfs/nysits.01test/livedev/docroot',
);

if (!isset($drush_major_version)) {
  $drush_version_components = explode('.', DRUSH_VERSION);
  $drush_major_version = $drush_version_components[0];
}
// Site nysits, environment 01testup
$aliases['01testup'] = array(
  'root' => '/var/www/html/nysits.01testup/docroot',
  'ac-site' => 'nysits',
  'ac-env' => '01testup',
  'ac-realm' => 'enterprise-g1',
  'uri' => 'nysits01testup.enterprise-g1.acquia-sites.com',
  'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
  'remote-user' => 'nysits.01testup',
  'path-aliases' => array(
    '%drush-script' => 'drush' . $drush_major_version,
  )
);
$aliases['01testup.livedev'] = array(
  'parent' => '@nysits.01testup',
  'root' => '/mnt/gfs/nysits.01testup/livedev/docroot',
);

if (!isset($drush_major_version)) {
  $drush_version_components = explode('.', DRUSH_VERSION);
  $drush_major_version = $drush_version_components[0];
}
// Site nysits, environment 01update
$aliases['01update'] = array(
  'root' => '/var/www/html/nysits.01update/docroot',
  'ac-site' => 'nysits',
  'ac-env' => '01update',
  'ac-realm' => 'enterprise-g1',
  'uri' => 'nysits01update.enterprise-g1.acquia-sites.com',
  'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
  'remote-user' => 'nysits.01update',
  'path-aliases' => array(
    '%drush-script' => 'drush' . $drush_major_version,
  )
);
$aliases['01update.livedev'] = array(
  'parent' => '@nysits.01update',
  'root' => '/mnt/gfs/nysits.01update/livedev/docroot',
);
