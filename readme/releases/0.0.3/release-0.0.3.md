##Release: 0.0.3

## Main Additions
- Document content type
- Landing page content type
- User roles and permissions
- Demo content module for installing sample content
- Featured card frame added to News, Inner Page, and Landing page content type
- Featured Card Frame using the Paragraphs module
- Universal Navigation
- Distribution architecture refactor
- Media library and media integration with WYSIWYG
- Travis CI, build and deploy enhancements
- VM upgrade

## Important Notices
- Modules and themes directories were moved into the WebNY distribution directory to support Site Factory deployments
- This release includes an update VM. Upgrade instructions are below.

If you have not installed Ansible on your host machine (Applies in most cases and always if you are running Windows). Do the following:

1. `vagrant halt`
2. `vagrant destroy`
3. Copy example.config.yml to config.yml
4. In the box/ dir run `vagrant box update`
5. `vagrant up`


If you are on Linux or OSX and have installed ansible on your host machine:
Check if you have ansible installed: `ansible --version`. If this command returned an error follow the instructions above.

If you are running a version of ansible <2.0, do the following:

1.`vagrant halt`
2. `vagrant destroy`
3. Copy example.config.yml to config.yml
4. `sudo easy_install pip && sudo pip install ansible` to install the latest version of ansible. 
5. Reload your ansible roles by `sudo ansible-galaxy install -r provisioning/requirements.yml --force` in the box/ directory. 
6. In the box/ dir run `vagrant box update`
7. `vagrant up`


## Documentation updates
- [Environment Onboarding](../../webny-setup.md)
- [Xdebug Documentation](../../local-development.md)

- - -
# Pull Requests in Detail
- - -

* March 21, 2016: [NDD-300: Nightly build of lightning.](https://github.com/ny/WebNY-Distribution-D8/pull/109) 
* March 21, 2016: [Ndd 80 fix](https://github.com/ny/WebNY-Distribution-D8/pull/108) 
* March 20, 2016: [NDD-0: Removed security review module from build - causing undefined …](https://github.com/ny/WebNY-Distribution-D8/pull/107) 
* March 20, 2016: [NDD-0: Build Fixes from merge conflicts](https://github.com/ny/WebNY-Distribution-D8/pull/106) 
* March 20, 2016: [Ndd 300 media](https://github.com/ny/WebNY-Distribution-D8/pull/105) 
* March 18, 2016: [ndd-183: featurized document content type.](https://github.com/ny/WebNY-Distribution-D8/pull/104) 
* March 18, 2016: [Ndd 167 naming conventions](https://github.com/ny/WebNY-Distribution-D8/pull/103) 
* March 18, 2016: [NDD-171: Updated News Listing View, created templates for the view, a…](https://github.com/ny/WebNY-Distribution-D8/pull/102) 
* March 20, 2016: [NDD-116: Added readme/architecture/ndd-116-whitelisting-external-cont…](https://github.com/ny/WebNY-Distribution-D8/pull/101) 
* March 17, 2016: [Ndd 89 unav top](https://github.com/ny/WebNY-Distribution-D8/pull/99) 
* March 17, 2016: [NDD-131 User Roles Permissions](https://github.com/ny/WebNY-Distribution-D8/pull/98) 
* March 18, 2016: [Ndd 298 implement default content](https://github.com/ny/WebNY-Distribution-D8/pull/97) 
* March 16, 2016: [NDD-293: Updated front end installation instructions.](https://github.com/ny/WebNY-Distribution-D8/pull/96) 
* March 16, 2016: [NDD-172: Added layout strategy decision to /readme/architecture [ci s…](https://github.com/ny/WebNY-Distribution-D8/pull/94) 
* March 17, 2016: [NDD-309: Added ACSF and ACSFdev drush aliases to support phing deploys.](https://github.com/ny/WebNY-Distribution-D8/pull/93) 
* March 14, 2016: [NDD-113: Added file media decision to /readme/architecture [ci skip].](https://github.com/ny/WebNY-Distribution-D8/pull/91) 
* March 14, 2016: [NDD-70: Added private file system decision to /readme/architecture.](https://github.com/ny/WebNY-Distribution-D8/pull/89) 
* March 14, 2016: [Ndd 186 create landing page content type](https://github.com/ny/WebNY-Distribution-D8/pull/88) 
* March 11, 2016: [Ndd 292 git](https://github.com/ny/WebNY-Distribution-D8/pull/87) 
* March 14, 2016: [Ndd 80 card frame featured](https://github.com/ny/WebNY-Distribution-D8/pull/86) 
* March 14, 2016: [Ndd 293 distro](https://github.com/ny/WebNY-Distribution-D8/pull/85) 
* March 10, 2016: [Ndd 278 settings](https://github.com/ny/WebNY-Distribution-D8/pull/84) 
* March 10, 2016: [Ndd 282 lightning](https://github.com/ny/WebNY-Distribution-D8/pull/83) 
* March 10, 2016: [Ndd 153 review](https://github.com/ny/WebNY-Distribution-D8/pull/82) 
* March 9, 2016: [Releases/sprint 2](https://github.com/ny/WebNY-Distribution-D8/pull/80) 
* March 10, 2016: [NDD-153: Added documentation on setting up DrupalVM xdebug in PHPstorm.](https://github.com/ny/WebNY-Distribution-D8/pull/78) 

