#!/usr/bin/env bash

if [ ! -d "$HOME/.nvm" ]; then
  echo "Downloading and installing nvm"
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
fi

NVM_VERISON=0.12.7
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
if [[ $(nvm ls $NVM_VERISON | grep "N/A") ]]; then
  echo "Downloading and installing node version $NVM_VERISON"
  nvm download $NVM_VERISON
  nvm install $NVM_VERISON
fi

echo "Please run the following command":
echo "source ~/.bashrc && nvm use --delete-prefix $NVM_VERISON"
