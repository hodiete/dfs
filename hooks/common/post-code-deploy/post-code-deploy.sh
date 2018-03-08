#!/bin/bash
#
# Cloud Hook: post-code-deploy
#
# The post-code-deploy hook is run whenever you use the Workflow page to
# deploy new code to an environment, either via drag-drop or by selecting
# an existing branch or tag from the Code drop-down list. See
# ../README.md for details.
#
# Usage: post-code-deploy site target-env source-branch deployed-tag repo-url
#                         repo-type

set -ev

site="$1"
target_env="$2"
source_branch="$3"
deployed_tag="$4"
repo_url="$5"
repo_type="$6"


# Ensure that post-code-deploy Cloud Hooks are never executed in the 01live environment 
# since they have been deprecated in favor of the db-update Factory Hook.
# Note the updated scripts were not backported to BLT 8.9.x so blt_backport_functions.sh 
# should be removed after updating to BLT 9.x 

acsf_file="/mnt/files/$site.$target_env/files-private/sites.json"
if [ ! -f $acsf_file ]; then
  . `dirname $0`/../blt_backport_functions.sh
  deploy_updates
fi

set +v
