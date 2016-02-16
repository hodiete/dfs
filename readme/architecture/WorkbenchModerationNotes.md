# Workflow Architecture #

**Key Findings:** While there are two, and possibly a third, workflow contributed module suites for Drupal 8, Acquia’s commitment to one, Workbench Moderation, make it the logical choice at this point.  In researching Workbench Moderation, there appear to be unresolved issues about current architecture and future roadmap that would be nice to have documented.  None of the supporting Drupal 7 Workbench supporting modules appear to have stable Drupal 8 versions, so functionality may be limited in the short term.

**Recommendation:**  use Workbench Moderation

**Contrib modules:**  drupal.org/project/workbench_moderation

**Custom code required:**  none other than feature to capture configuration

**Pros:**  Acquia support of port, people involved in port (Larry Garfield)

**Cons:**  Not a stable release, some question if this version will be the long term architecture

-	**Risks:**  If module can handle more complex requirements for later stages (e.g. editor groups and access rights), if revisioning, especially of entity references is appropriately supported, or if community chooses another module to support (workflow was D6 of choice, workbench as D7 of choice, too early to know about D8)

**WebNY integration points:**  every content type and possible content editor dashboard, email?

**3rd party integrations and licensing issues:**  none

**Testing/Research notes:**  see below

**POC:**  none

**Level of effort:**  reasonable (1 sprint to set up)

# Research Notes #

**Alternatives to consider:**

-	Workbench Moderation, 8.x-1.0-beta1
-	Workflow, 8.x-1.0-beta4
-	Content Publishing System (possibly replaced by Deploy)

Only Workbench Moderation researched on strong recommendation of Acquia to use that module.

## Workbench moderation ##

D8 porting tracker:  https://www.drupal.org/node/2579433

No dependencies in current module info.yml file.

Dependencies mentioned during research:

-	https://www.drupal.org/project/drafty
-	https://www.drupal.org/project/state_machine, also mentioned in https://www.drupal.org/node/2579433#comment-10702474 
-	https://www.drupal.org/project/workflow, mentioned in https://www.drupal.org/node/2579433#comment-10602416
-	https://www.drupal.org/project/multiversion, mentioned in https://www.drupal.org/node/2579433#comment-10602416 which would also mean https://drupal.org/project/key_value 
-	https://www.drupal.org/project/entity_reference_revisions, 
-	https://www.drupal.org/project/cps, mentioned in https://www.drupal.org/node/2579433#comment-10625404

The many difference possible dependencies might indicate that there are concerns about supporting revisions beyond simple core content types.  That was a problem in Drupal 7 and likely still has unresolved implications in Drupal 8.  Very likely might require a different approach, I was seeing a lot of interest in the multiversion module’s approach.

Workbench for D8 Architecture Document at https://docs.google.com/document/d/1ATciywmNVepNYCLXlBZMbAWfI49Uncvvwz7_AmmoFlY/edit#,  document is very interesting.  Not sure I’ve seen an architecture document for a contributed module before.
