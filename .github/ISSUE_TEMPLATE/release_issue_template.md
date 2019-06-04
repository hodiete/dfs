---
name: 'Deployment Request Checklist'
about: Gives the steps necessary to deploy code to a WebNY site.
title: "[New Functionality Name and Suggested Tag Number]"
labels: ''
assignees: ''

---

# WebNY: Deploy Checklist

## Title: [Issue Title]

**Summary:**  Note the deployment request must be made at least as early as the Monday 
of the same week as the requested deployment otherwise an exception with 
our director (Tim Crommie) must be made directly.

* Deployment requested by (WebNY, Vendor, Agency): 
* Request Contact (Name, Email, Phone): 
* Target Deployment Date: 
* WebNY Deployment Manager: 
* Webny Deployment Assignment: 
* Release Version Number: 
  
---

### Checklist

- [ ] Release Branch Created (Github)
- [ ] PR(s)/commit hash Identified for Release
- [ ] PR(s) Created to Release Branch and Pipelines Builds Passing
- [ ] WebNY: Merged PR(s) to Release Branch
- [ ] WebNY: Code Reviewed
- [ ] WebNY: Merge Release Branch to Master branch
- [ ] WebNY: Tag/Release created off Master branch (Github)
- [ ] WebNY: New CD Environment for Release Created
- [ ] WebNY: Staged for Deployment on CD environment (Acquia) 
- [ ] WebNY: Contacted Vendor and Agency with link and details for review
- [ ] Agency Approval
- [ ] Change control created
- [ ] Deployed
- [ ] Agency Notification
- [ ] Agency Approval
