# NDD-131 User Roles and Permissions

**Date:**  March 14, 2016 

**Who:**  Gregg Marshall

**Problem:**  We need a consistent way of handling user roles and permissions that is compatible with Features and our modular approach.

**Recommendation:** 
- That roles be semantic, that is each major piece of functionality that might be enabled or disabled independently have its own roles to control permissions.  Examples of functionality with independent roles are workflow and WYSIWYG configuration.
- Permissions should be stored with the feature that uses them, avoiding storing any permissions that might be used by another feature or functionality.
- The following pre-defined roles will be created for permissions that don't fit with a feature that defines role(s):
	- Administrator, normally reserved for WebNY, full access to site
	- Site Builder, limited administration to enforce decision not to allow sites the ability to add/modify content types and views.
	- Site Administrator, site wide administration by site owner, such as taxonomy term, block content, etc.  No user functions such as new users or password resets.
	- User Administrator, can add new users, assign limited set of user roles, reset passwords.
	- Content Author, can create and edit content subject to workflow role restrictions.
- Permissions not configured via features will be configured during a late development sprint feature or configuration management.
- It is possible that the number of roles will require creating a capability to have bundles of roles to make administration easier.

**Reasoning:** We want to keep features as independent as possible and make roles flexible.  We don't want one role having several meanings, e.g. a content editor might not have workflow approval but would have access to the standard WYSIWYG buttons and not the advanced.  That role would limit options for sites and possibly require exposing more permissions than desirable.  Plus features should be able to be enabled or disabled on a site by site basis without any dependencies on other features for roles.
