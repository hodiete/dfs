# NDD-70 Private File System

**Date:**  March 14, 2016 

**Who:**  Acquia Recommentation

**Problem:**  Drupal defaults to using a public file system, which allows anyone with the URL of the file to access it.  If the site owner wants to have any files with restricted access, the private file system needs to be enabled before the file is uploaded.  Deciding after the fact requires the file be deleted and re-uploaded or, for a large number of files, a significant migration effort.

**Recommendation:** 
1.  Private file system be enabled on all sites, but not made default.
2.  Site discovery checklist will be updated to ensure the implications of private/public files is fully understood by site owner.
3.  Gregg Marshall recommends that all webform with file uploads be configured to use private file system.

**Reasoning:**  There would be a significant performance penalty to have all files be private.  Private files cannot be cached, either by Drupal or via Varnish or a CDN.
