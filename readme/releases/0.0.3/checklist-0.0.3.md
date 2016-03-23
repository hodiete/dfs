# Release Checklist Template
 
- [x] Create releases/[sprint-n] branch. All release related work should be done against this branch so that sprint development can continue concurrently. `git checkout -b releases/[sprint-n]
- [x] Check on module and core updates. Pending security updates should have failed the build mid-sprint, but double check that none still need to be applied.
- [x] Resolve any security issues, bugs, and module updates needed for this release.
- [x] Make a new directory in readme/releases that corresponds to the tag for this release.
- [x] Copy this checklist into that directory.
- [x] Generate release notes. (See scripts/release-notes/README.md) Usually `php generate-release-notes.php github user:password ny:WebNY-Distribution-D8:develop > release-notes.md`
- [x] Copy and paste release notes including intro section into release.example.md.
- [x] Clean up release notes - intro section is most important.
- [x] Ensure release notes are saved in the /readme/releases/[release] directory
- [ ] Update architecture documentation. As of Sprint 3 this was moved to the wiki: https://github.com/ny/WebNY-Distribution-D8/wiki. *Note: this migration is a work in progress as of 3/23/2016.*
- [x] Merge release branch to master
- [x] Cut tag from master. `git tag [tag]`
- [x] Deploy tag to WebNY repo. `git push upstream [tag]`


*Remember to do the following after you cut a deploy tag*
- Change the deployed tag in Prod on ACSFDev
- Rebase master to develop branch to apply any changes made to the release branch. 
- Delete release branch. `git push upstream --delete <branchName>`
