    #!/bin/sh

    #
    env_refresh() {
      env=$1
      drush_alias=$2

      case ${env} in
        "01dev" )
              echo "Making backup of Database..."
              #drush @${drush_alias} ac-database-instance-backup acsfdevdev --endpoint=${endpoint} --email=${email} --key=${key}
              echo "Making any necessary Drupal database updates..."
              drush @${drush_alias} acsf-tools-ml --strict=0 updb --entity-updates -y
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
              drush @${drush_alias} acsf-tools-ml --strict=0 updb --entity-updates -y
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
              drush @${drush_alias} acsf-tools-ml --strict=0 updb --entity-updates -y
              echo "Importing CMI Config"
              drush @${drush_alias} acsf-tools-ml --strict=0 config-import --partial --source=/mnt/www/html/nysits01live/config/default -y
              echo "Reverting features"
              drush @${drush_alias} acsf-tools-ml --strict=0 fia -y
              echo "setting page caching max time to 6 hours..."
              drush @${drush_alias} acsf-tools-ml cset system.performance cache.page.max_age 21600 -y
              echo "enabling css optimization..."
              drush @${drush_alias} acsf-tools-ml cset system.performance css.preprocess 1 -y
              echo "enabling js optimization..."
              drush @${drush_alias} acsf-tools-ml cset system.performance js.preprocess 1 -y
              echo "disable field UI..."
              drush @${drush_alias} acsf-tools-ml pmu field_ui -y
              echo "disable views UI..."
              drush @${drush_alias} acsf-tools-ml pmu views_ui -y
              echo "Clearing caches..."
              drush @${drush_alias} acsf-tools-ml cr
              echo "Clearing Varnish..."
              #drush @${drush_alias}  ac-domain-purge acsf-tools-ml --endpoint=${endpoint} --email=${email} --key=${key}
              echo "Deployment script run for ${env}";;
          * )
      esac

    }
