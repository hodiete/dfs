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
// Site nysits, environment 01dev knowledgebank
$aliases['01dev.knowledgebank'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://knowledgebank.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev combataddiction
$aliases['01dev.combataddiction'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://combataddiction.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev jcope
$aliases['01dev.jcope'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://jcope.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev amber
$aliases['01dev.amber'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://amber.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev wcb
$aliases['01dev.wcb'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://wcb.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev demo
$aliases['01dev.demo'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://demo.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev ig
$aliases['01dev.ig'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://ig.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev qa
$aliases['01dev.qa'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://qa.dev-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01dev',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01dev uat
$aliases['01dev.uat'] = array(
    'root' => '/var/www/html/nysits.01dev/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01dev',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://uat.dev-nysits.acsitefactory.com',
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
// Site nysits, environment 01live dev
$aliases['01live.dev'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://dev.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live combataddiction
$aliases['01live.combataddiction'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://combataddiction.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live demo
$aliases['01live.demo'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://demo.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live ig
$aliases['01live.ig'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://ig.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live qa
$aliases['01live.qa'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://qa.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live uat
$aliases['01live.uat'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://uat.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live amber
$aliases['01live.amber'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://amber.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live knowledgebank
$aliases['01live.knowledgebank'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://knowledgebank.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live jcope
$aliases['01live.jcope'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://jcope.nysits.acsitefactory.com',
    'remote-host' => 'web-536.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01live',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01live wcb
$aliases['01live.wcb'] = array(
    'root' => '/var/www/html/nysits.01live/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01live',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://wcb.nysits.acsitefactory.com',
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
// Site nysits, environment 01test dev
$aliases['01test.dev'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://dev.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test knowledgebank
$aliases['01test.knowledgebank'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://knowledgebank.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test combataddiction
$aliases['01test.combataddiction'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://combataddiction.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test jcope
$aliases['01test.jcope'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://jcope.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test amber
$aliases['01test.amber'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://amber.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test wcb
$aliases['01test.wcb'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://wcb.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test ig
$aliases['01test.ig'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://ig.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test demo
$aliases['01test.demo'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://demo.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test qa
$aliases['01test.qa'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://qa.test-nysits.acsitefactory.com',
    'remote-host' => 'staging-538.enterprise-g1.hosting.acquia.com',
    'remote-user' => 'nysits.01test',
    'path-aliases' => array(
        '%drush-script' => 'drush' . $drush_major_version,
    )
);
// Site nysits, environment 01test uat
$aliases['01test.uat'] = array(
    'root' => '/var/www/html/nysits.01test/docroot',
    'ac-site' => 'nysits',
    'ac-env' => '01test',
    'ac-realm' => 'enterprise-g1',
    'uri' => 'http://uat.test-nysits.acsitefactory.com',
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