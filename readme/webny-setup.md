##Overview

This guide is an aggregation of other readmes and does not replace them. It is intended to be a quickstart guide
for getting set up with Drupal VM

## Initial Setup: Git Repo

Each developer should [fork](https://help.github.com/articles/fork-a-repo) the
primary Git repository for their work. All developers should then checkout a
local copy of the develop branch to begin work -

    git clone git@github.com:username/WebNY-Distribution-D8.git -b develop
    git remote add upstream git@github.com:ny/WebNY-Distribution-D8.git

1. Clone your fork to your local machine.
2. Make sure you are on the `develop` branch for most work.


## Initial Setup: VM Setup

This setup assumes:

1. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant] (https://www.vagrantup.com/downloads.html). 
2. You have some sort of command line tool installed such as [Cygwin](https://cygwin.com/install.html)
3. You have already installed git and cloned your fork locally

The directory where the VM resides is /box. A sample `default.config.yml` has been
provided with the following configuration already completed. You may just copy this file as a starting point. 
The following values in your `config.yml` file may be modified per your
individual preferences.

    # Update the hostname to the local development environment hostname.
    vagrant_hostname: webny.dev
    vagrant_machine_name: WebNY
    vagrant_ip: 192.168.88.90


    # Set drupal_domain to the same thing as the `vagrant_hostname` above.
    drupal_domain: webny.dev
    
4. If you are running Windows, you will need to make sure you are running both Virtualbox and your command prompt as
an administrator. You may also need to run Virtualbox in Windows 7 compatibility mode if you run into issues. This setup
assumes you have administrative access on your host machine. 
5. If you are behind a proxy, you will need to configure your proxy information in (box/provisioning/JJG-Ansible-Windows/windows.sh)
6. Make sure you have the vagrant-hostsupdater plugin installed
     `vagrant plugin install vagrant-hostsupdater`
     `vagrant plugin install vagrant-auto_network`
6. Run `vagrant up` in the /box directory.
7. After this completes, ensure your hosts were created. On Linux and OSX this is likely your /etc/hosts file. On 
Windows this is usually located at C:\Windows\System32\drivers\etc\hosts. 
You will need to edit this file as an administrator to save it. Hosts should follow this format of:

```
192.168.88.90  webny.dev 
192.168.88.90  adminer.webny.dev 
192.168.88.90  xhprof.webny.dev  
192.168.88.90  pimpmylog.webny.dev  
```




##Initial Setup: Drupal Core and Frontend Tools

1. Run `vagrant ssh` from the /box directory
2. Run `cd /var/www/webny`
3. Run `composer install`
4. Install NVM and install and use Node.js version 0.12.7: 

    ```
    cd docroot/profiles/custom/webny/themes/custom/webny_theme
    ./install-node.sh
    ```
    
    Ensure you follow the command prompt instructions to run `source ~/.bashrc && nvm use --delete-prefix 0.12.7`
    
    
5. Run `cd /var/www/webny; ./task.sh setup`. This will build dependencies via composer, install githooks, and install drupal locally. It will also install frontend tools and run a frontend build.
Run `task.sh -l` for a list of available phing tasks. Make sure that you have configured the correct database credentials in local.settings.php. If you are using a VM, these will match the database credentials you put in config.yml.

6. To run a build of the theme, run: `cd docroot/profiles/custom/webny/themes/custom/webny_theme; npm run build`

7. If you go to  http://webny.dev you should see a Drupal install screen. 



*Note that these instructions will change once there is a database of record in ACSF.*
