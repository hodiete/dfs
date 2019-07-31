# DFS.ny.gov

A brief description of My Project.

## BLT

Please see the [BLT documentation](http://blt.readthedocs.io/en/latest/) for information on build, testing, and deployment processes.

## Docksal Setup

This site was originally constructed using Drupal VM and the vendor is still using this kind of local environment. We don't want to harm their ability to develop seamlessly, so we have a special case for building this site locally in docksal.

The repo contains the .docksal folder you should use on mac as well as the Acquia aliases you need for this purpose. You can start by running

```fin init```

Docksal will spin up the appropriate files, then it will die. 

Then you can run 

```blt setup```

Again, the install will fail up to a point because your local settings file will have the wrong database settings. Go into `docroot/sites/default/settings` and edit the `local.settings.php` file to use the correct docksal database. Thanks to the gitignore settings, this should not be included in the repo. You may feel compelled to edit the default local settings file, but you don't want to do this because that will affect the vendor's ability to spin up their environment.

```
/**
 * Database configuration.
 */
$databases = array(
  'default' =>
  array(
    'default' =>
    array(
      'database' => 'default',
      'username' => 'user',
      'password' => 'user',
      'host' => 'db',
      'port' => '3306',
      'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
      'driver' => 'mysql',
      'prefix' => '',
    ),
  ),
);
```

Then, after deleting the vendor folder, you can run each of these commands in order:

```
fin exec composer install
fin exec vendor/acquia/blt/bin/blt setup
```

You should, then, be able to run `fin exec blt` commands as you need.

When this is done, you should be able to navigate to docroot and run:

```
fin exec drush sql-sync @prod @self
fin exec updb
```

Then, you should be able to navigate to the site in your browser: [https://dfsnygov.docksal/WebNY50/](https://dfsnygov.docksal/WebNY50/)
