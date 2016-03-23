# Release Checklist Template
 
- [ ] Create releases/[sprint-n] branch. All release related work should be done against this branch so that sprint development can continue concurrently. `git checkout -b releases/[sprint-n]
- [ ] Check on module and core updates. Pending security updates should have failed the build mid-sprint, but double check that none still need to be applied. 
- [ ] Resolve any security issues, bugs, and module updates needed for this release.
- [ ] Make a new directory in readme/releases that corresponds to the tag for this release.
- [ ] Copy this checklist into that directory.
- [ ] Generate release notes. (See scripts/release-notes/README.md) Usually `php generate-release-notes.php github user:password ny:WebNY-Distribution-D8:develop > release-notes.md`
- [ ] Copy and paste release notes including intro section into release.example.md.
- [ ] Clean up release notes - intro section is most important.
- [ ] Ensure release notes are saved in the /readme/releases/[release] directory
- [ ] Update architecture documentation. As of Sprint 3 this was moved to the wiki: https://github.com/ny/WebNY-Distribution-D8/wiki.
- [ ] Merge release branch to master
- [ ] Cut tag from master. `git tag [tag]`
- [ ] Deploy tag to WebNY repo. `git push upstream [tag]`


*Remember to do the following after you cut a deploy tag*
- Change the deployed tag in Prod on ACSFDev
- Rebase master to develop to pull in any changes made to the release branch.
- Delete release branch. `git push upstream --delete <branchName>`
