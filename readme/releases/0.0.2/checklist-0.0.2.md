# Release Checklist Template
 
- [x] Create releases/[sprint-n] branch. All release related work should be done against this branch so that sprint development can continue concurrently.
- [x] Check on module and core updates. Pending security updates should have failed the build mid-sprint, but double check that none still need to be applied. 
- [x] Resolve any security issues or bugs assigned for this release.
- [x] Make a new directory in readme/releases that corresponds to the tag for this release.
- [x] Copy this checklist into that directory.
- [x] Generate release notes.
- [x] Copy and paste release notes including intro section into release.example.md
- [x] Clean up release notes - intro section is most important.
- [x] Ensure release notes are in the /readme/releases/[release] directory
- [x] Update architecture documentation.
- [x] Merge release branch to master
- [x] Cut tag from master.
- [x] Deploy tag to WebNY repo.


*Remember to do the following after you cut a deploy a tag*
- Change the deployed tag in Prod on ACSFDev
- Rebase master to develop to pull in any changes made to the release branch.
- Delete release branch.
