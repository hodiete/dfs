# DFS.ny.gov

A brief description of My Project.

## BLT

Please see the [BLT documentation](http://blt.readthedocs.io/en/latest/) for information on build, testing, and deployment processes.

## Docksal Setup

This site was originally constructed using Drupal VM and the vendor is still using this kind of local environment. We don't want to harm their ability to develop seamlessly, so we have a special case for building this site locally in docksal.

The repo contains the .docksal folder you should use on mac as well as the Acquia aliases you need for this purpose. 

Then, after **deleting the vendor folder**, you can run `fin init`

You should, then, be able to run `fin exec blt` commands as you need.

When this is done, you should be able to navigate to docroot and run:

```
fin exec drush sql-sync @prod @self
fin exec updb
```

Then, you should be able to navigate to the site in your browser: [https://dfsnygov.docksal/WebNY50/](https://dfsnygov.docksal/WebNY50/)

## Other Gotchas
 - In order for the configurations to match after development, you need to do the following (https://github.com/acquia/blt/issues/2955):
   - Sync database from produciton
   - Export configuration
   - blt setup, which will fail on config import
   - Export configuration again
   - blt setup again
   - Commit new exported config
   - Push to your working branch
 - The shortcut.set.default.yml file should have the uuid removed from the top of the file or else the site won't build locally or on the server
   - [Github Issue](https://github.com/acquia/blt/issues/1948)
   - [Blog Post](https://danepowell.com/blog/installing-sites-existing-config-drupal-8)

## Deprecated, but Documented

 - The twig/twig version has been pegged at 1.31.1 in order to avoid breaking the classy module because the site is currently stuck on an older version of drupal