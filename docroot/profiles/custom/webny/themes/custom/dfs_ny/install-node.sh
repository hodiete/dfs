#!/usr/bin/env bash

if [ ! -d "$HOME/.nvm" ]; then
  echo "Downloading and installing nvm"
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | sudo bash
fi

NVM_VERISON=10.15.0
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
if [[ $(nvm ls $NVM_VERISON | grep "N/A") ]]; then
  echo "Downloading and installing node version $NVM_VERISON"
  nvm install $NVM_VERISON
fi

unset NPM_CONFIG_PREFIX

echo "Please run the following command":
echo "source ~/.bash_profile && nvm use --delete-prefix $NVM_VERISON"
