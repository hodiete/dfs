<?php

// Application 'nydfs', environment 'dev'.
$aliases['dev'] = array (
  'root' => '/var/www/html/nydfs.dev/docroot',
  'ac-site' => 'nydfs',
  'ac-env' => 'dev',
  'ac-realm' => 'prod',
  'uri' => 'nydfsdev.prod.acquia-sites.com',
  'path-aliases' => 
  array (
    '%drush-script' => 'drush8',
  ),
  'dev.livedev' => 
  array (
    'parent' => '@nydfs.dev',
    'root' => '/mnt/gfs/nydfs.dev/livedev/docroot',
  ),
  'remote-host' => 'nydfsdev.ssh.prod.acquia-sites.com',
  'remote-user' => 'nydfs.dev',
);

// Application 'nydfs', environment 'prod'.
$aliases['prod'] = array (
  'root' => '/var/www/html/nydfs.prod/docroot',
  'ac-site' => 'nydfs',
  'ac-env' => 'prod',
  'ac-realm' => 'prod',
  'uri' => 'nydfs.prod.acquia-sites.com',
  'path-aliases' => 
  array (
    '%drush-script' => 'drush8',
  ),
  'prod.livedev' => 
  array (
    'parent' => '@nydfs.prod',
    'root' => '/mnt/gfs/nydfs.prod/livedev/docroot',
  ),
  'remote-host' => 'nydfs.ssh.prod.acquia-sites.com',
  'remote-user' => 'nydfs.prod',
);

// Application 'nydfs', environment 'test'.
$aliases['test'] = array (
  'root' => '/var/www/html/nydfs.test/docroot',
  'ac-site' => 'nydfs',
  'ac-env' => 'test',
  'ac-realm' => 'prod',
  'uri' => 'nydfsstg.prod.acquia-sites.com',
  'path-aliases' => 
  array (
    '%drush-script' => 'drush8',
  ),
  'test.livedev' => 
  array (
    'parent' => '@nydfs.test',
    'root' => '/mnt/gfs/nydfs.test/livedev/docroot',
  ),
  'remote-host' => 'nydfsstg.ssh.prod.acquia-sites.com',
  'remote-user' => 'nydfs.test',
);

