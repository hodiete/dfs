# Release Checklist Template
 
- [ ] Create releases/[sprint-n] branch. All release related work should be done against this branch so that sprint development can continue concurrently.
- [ ] Check on module and core updates. Pending security updates should have failed the build mid-sprint, but double check that none still need to be applied. 
- [ ] Resolve any security issues or bugs assigned for this release.
- [ ] Make a new directory in readme/releases that corresponds to the tag for this release.
- [ ] Copy this checklist into that directory.
- [ ] Generate release notes.
- [ ] Copy and paste release notes including intro section into release.example.md
- [ ] Clean up release notes - intro section is most important.
- [ ] Ensure release notes are in the /readme/releases/[release] directory
- [ ] Update architecture documentation.
- [ ] Merge release branch to master
- [ ] Cut tag from master.
- [ ] Deploy tag to WebNY repo.


*Remember to do the following after you cut a deploy a tag*
- Change the deployed tag in Prod on ACSFDev
- Rebase master to develop to pull in any changes made to the release branch.
- Delete release branch.
