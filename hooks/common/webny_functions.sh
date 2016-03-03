#!/bin/sh

#
env_refresh() {
  env=$1
  drush_alias=$2
  email="lindsey.catlett@acquia.com"
  key="JI9ohfMX3mggb6LVtx9038q/qaRYCQzUOA07/TEaZTQHV4h6pchD4a4CFou5HeeYbYs7EJgIFDoC"
  endpoint="https://cloudapi.acquia.com/v1"

  case ${env} in
    "dev" )
          echo "Making backup of Database..."
          #drush @${drush_alias} ac-database-instance-backup brandrefreshdev --endpoint=${endpoint} --email=${email} --key=${key}
          echo "Making any necessary Drupal database updates..."
          drush @${drush_alias} updb -y
          echo "Clearing caches..."
          drush @${drush_alias} cr
          #echo "Clearing Varnish..."
          #drush @${drush_alias} ac-domain-purge acsfdevdev.prod.acquia-sites.com --endpoint=${endpoint} --email=${email} --key=${key}
          echo "Deployment script run for ${env}";;
      * )
  esac

  case ${env} in
    "prod" )
          #echo "Setting site into maintenance_mode..."
          #drush @${drush_alias} vset maintenance_mode 1
          echo "Making backup of Database..."
          drush @${drush_alias} ac-database-instance-backup acsfdev --endpoint=${endpoint} --email=${email} --key=${key}
          echo "Making any necessary Drupal database updates..."
          drush @${drush_alias} updb -y
          echo "Clearing caches..."
          drush @${drush_alias} cr
          echo "Clearing Varnish..."
          drush @${drush_alias} ac-domain-purge acsfdev.prod.acquia-sites.com --endpoint=${endpoint} --email=${email} --key=${key}
          echo "Deployment script run for ${env}";;
      * )
  esac



}
