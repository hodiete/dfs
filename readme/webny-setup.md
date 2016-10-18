##Overview

This guide is an aggregation of other readmes and does not replace them. It is intended to be a quickstart guide
for getting set up with Drupal VM and the WebNY distro. 

## Initial Setup: Host Machine tools

1. Ensure that Xcode is installed. On OSX 10.9+ you can install Xcode with:


    xcodebuild -license
    xcode-select --install

1. Install the minimum dependencies for BLT. The preferred method is via Homebrew, though you could install these
 yourself without a package manager.
 
 
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”
    brew install php56 git composer drush
    composer global require "hirak/prestissimo:^0.3”

1. Install the VM dependencies


    brew tap caskroom/cask
    brew install ansible
    brew cask install virtualbox vagrant
    
1. Install host machine test dependencies


     brew cask install java
     brew install chromedriver


## Initial Setup: Git Repo

Each developer should [fork](https://help.github.com/articles/fork-a-repo) the
primary Git repository for their work. All developers should then checkout a
local copy of the develop branch to begin work:

    git clone git@github.com:username/WebNY-Distribution-D8.git -b develop
    git remote add upstream git@github.com:ny/WebNY-Distribution-D8.git

1. Clone your fork to your local machine.
1. Make sure you are on the `develop` branch for most work.


## Initial Setup: VM Setup

This setup assumes:

1. You have installed the needed versions of Vagrant and Virtualbox following the steps above. 
1. You have some sort of command line tool installed such as OSX Terminal or [Cygwin](https://cygwin.com/install.html)
1. You have already installed git and cloned your fork locally

To spin up a VM with default configuration run the following from your repo "box" directory: 

    vagrant plugin install vagrant-hostsupdater
    vagrant plugin install vagrant-auto_network
    cp default.config.yml config.yml
    vagrant up

You may modify values in config.yml to install any additional tools or configuration you need. See below for notes on 
running a VM in Windows.

##Initial Setup: Drupal Core and Frontend Tools

1. Run `vagrant ssh` from the /box directory
1. Run `cd /var/www/webny && composer install`
1. Install NVM and install and use Node.js version 0.12.7: 


    ./docroot/profiles/custom/webny/themes/custom/webny_theme/install-node.sh
    source ~/.bashrc && nvm use --delete-prefix 0.12.7
    
        
1. Run `blt setup:settings` . This will generate docroot/sites/default/settings/local.settings.php 
and docroot/sites/default/local.drushrc.php. Update `local.drushrc.php`with your local site URL (likely http://webny.dev).
1. Run `blt local:setup.` This will build all project dependencies and install drupal.
1. Edit your local drush alias file. Modify drush/site-aliases/local.aliases.drushrc.php with your local path.
1. Run `blt` for a list of available phing tasks.
1. To run a build of the theme, run: `cd docroot/profiles/custom/webny/themes/custom/webny_theme && npm run build`
1. If you go to  http://webny.dev you should see a site using the WebNY distro. 


##Notes for Windows Installation
      
1. If you are running Windows, you will need to make sure you are running both Virtualbox and your command prompt as
an administrator. You may also need to run Virtualbox in Windows 7 compatibility mode if you run into issues. This setup
assumes you have administrative access on your host machine. 
1. If you are behind a proxy, you will need to configure your proxy information in (box/provisioning/JJG-Ansible-Windows/windows.sh)
1. After `vagrant up1 completes, ensure your hosts were created. On Windows this is usually located at 
C:\Windows\System32\drivers\etc\hosts. 
  You will need to edit this file as an administrator to save it if your hosts were not created.
   Hosts should follow the format of:
  
  ```
  192.168.88.90  webny.dev 
  192.168.88.90  adminer.webny.dev 
  192.168.88.90  xhprof.webny.dev  
  192.168.88.90  pimpmylog.webny.dev  
  ```
