#!/usr/bin/env bash

cd /var/www/webny
composer update
cd /var/www/webny/docroot/themes/custom/webny_theme
./install-node.sh
source ~/.bashrc && nvm use --delete-prefix 0.12.7
npm run install-webny_theme
cd /var/www/webny
source ~/.bashrc && nvm use --delete-prefix 0.12.7
./task.sh setup
cd /var/www/webny/docroot/themes/custom/webny_theme
npm run build