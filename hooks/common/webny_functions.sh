    #!/bin/sh

    #
    env_refresh() {
      env=$1
      drush_alias=$2
      email="lindsey.catlett@acquia.com"
      key="JI9ohfMX3mggb6LVtx9038q/qaRYCQzUOA07/TEaZTQHV4h6pchD4a4CFou5HeeYbYs7EJgIFDoC"
      endpoint="https://cloudapi.acquia.com/v1"

      case ${env} in
        "01dev" )
              echo "Making backup of Database..."
              #drush @${drush_alias} ac-database-instance-backup acsfdevdev --endpoint=${endpoint} --email=${email} --key=${key}
              echo "Making any necessary Drupal database updates..."
              drush @${drush_alias} acsf-tools-ml --strict=0 updb -y
              #config import to set config directory
              drush config-import vcs -y && drush updatedb -y
              echo "Importing CMI Config"
              drush @${drush_alias} acsf-tools-ml --strict=0 config-import --partial --source=/mnt/www/html/nysits01dev/config/default -y
              echo "Reverting features"
              drush @${drush_alias}  acsf-tools-ml --strict=0 fia -y
              echo "Clearing caches..."
              drush @${drush_alias} acsf-tools-ml cr
              #echo "Clearing Varnish..."
              #drush @${drush_alias} ac-domain-purge acsfdevdev.prod.acquia-sites.com --endpoint=${endpoint} --email=${email} --key=${key}
              echo "Deployment script run for ${env}";;
          * )
      esac

      case ${env} in
        "01test" )
              echo "Making backup of Database..."
              #drush @${drush_alias} ac-database-instance-backup acsfdevstg --endpoint=${endpoint} --email=${email} --key=${key}
              echo "Making any necessary Drupal database updates..."
              drush @${drush_alias} acsf-tools-ml --strict=0 updb -y
              echo "Importing CMI Config"
              drush @${drush_alias} acsf-tools-ml --strict=0 config-import --partial --source=/mnt/www/html/nysits01test/config/default -y
              echo "Reverting features"
              drush @${drush_alias} acsf-tools-ml --strict=0 fia -y
              echo "Clearing caches..."
              drush @${drush_alias} acsf-tools-ml cr
              #echo "Clearing Varnish..."
              #drush @${drush_alias} ac-domain-purge acsfdevstg.prod.acquia-sites.com --endpoint=${endpoint} --email=${email} --key=${key}
              echo "Deployment script run for ${env}";;
          * )
      esac

      case ${env} in
        "01live" )
              echo "Making any necessary Drupal database updates..."
              drush @${drush_alias} acsf-tools-ml --strict=0 updb -y
              echo "Importing CMI Config"
              drush @${drush_alias} acsf-tools-ml --strict=0 config-import --partial --source=/mnt/www/html/nysits01live/config/default -y
              echo "Reverting features"
              drush @${drush_alias} acsf-tools-ml --strict=0 fia -y
              echo "Clearing caches..."
              drush @${drush_alias} acsf-tools-ml cr
              echo "Clearing Varnish..."
              #drush @${drush_alias}  ac-domain-purge acsf-tools-ml --endpoint=${endpoint} --email=${email} --key=${key}
              echo "Deployment script run for ${env}";;
          * )
      esac

    }
