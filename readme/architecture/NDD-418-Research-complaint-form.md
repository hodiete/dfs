### NDD-418 Research complaint form

# Webform Alternatives in early Drupal 8

Webform has been the "go to" module for creating arbitrary data collection forms for visitors to complete, currently with almost a half million sites reporting using the module, making it one of the top 10 modules in Drupal 7.

However, despite its popularity, as of DrupalCon May 2016, there wasn't even a DEV release of Webform for Drupal 8.

### Recommendation

Continue to use fielded Contact Forms with Contact Storage to create Webforms until the Webform module has a stable Drupal 8 release, most likely not until the end of the year at the earliest.  This will require WebNY development staff to create the forms for most site owners, at least until the addition of Webform is possible.  When Webfrom is added, I do **not** recommend converting forms already created.  Rarely are those forms modified and any development effort to convert them could better be used to develop the distribution or convert additional sites to site factory.

### Drupal 8 Forms Modules
Assuming a port of Webform gets finished for Drupal 8, at this time there appear to be 4 major options for forms in Drupal 8:
1.  core Contact Form (with Contact Storage)
1.  eForm
1.  YAML Form
1.  Webform

### core Contact Form (with Contact Storage)
The core Contact Form module got a major rewrite with Drupal 8.  As part of that rewrite, contact forms became fieldable entities.  With that significant change it has become apparent that for simple use cases the Contact Form could be used as an alternative to Webform.

The largest impediment to using Contact Form as an alternative to Webform was the lack of any storage of results.  That is addressed with the contributed module Contact Storage, [https://www.drupal.org/project/contact_storage](https://www.drupal.org/project/contact_storage).  It would appear that the Contact Storage module is a step in a plan to integrate that functionality into core, perhaps in Drupal 8.2 or later.  The roadmap for the contact module is outlined at [https://www.drupal.org/node/2582955](https://www.drupal.org/node/2582955).  The goal of that roadmap is to provide the 80% use-case of webform. i.e. allowing creation and submission of feedback forms from site-users; and providing editing, listing and administration of submitted form values.

Other perceived issues with using fielded Contact Forms as Webform alternatives include:
- Ability to turn the form on/off. Currently appears you can only edit/delete the contact form.
- Maximum submissions setting (total, per user)
- Permissions at the form level (who can submit the form by role)
- Clearing out a form: Guessing you could use VBO to make this happen if not in contact form itself (alternative appears to be delete submissions one by one?)
- Emails: custom and multiple different emails to recipients (And ability to include data supplied in the submission). Might be able to use actions/rules to fill the gap?
- Download options: CSV, EXCEL export specifically missing. You can replicate the tables and submissions tabs in views. Contact Storage helps with the list tab, and ability to easily filter results per form, etc. Views integration helps with any other way you want to view submissions. REST core functionality gives you data export to XML, JSON, but not CSV/Excel. However, if views data export moves to D8 that solves the CSV/Excel issue.
- Ability to change form button text easily ("send message" not ideal)
- Multi-page forms
- Form validation: some is built-in to contact form/fields, but some of what we had with webform validation module does not exist
- Conditional form fields
- Save form as draft to finish later
- A huge number of different, unrelated webforms (>10,000?)
- A huge number of results per webform (> 100,000)
- A huge number of components per webform (>100)
- Webform as node and as block
- Intra- and inter-page conditional, multi-page, draft, and anonymous webforms (which complicate each other)
- Analysis (which needs to access all the results
- Data migration

In addition our team ran into the issue that there is no markup field, making it difficult to have an introduction paragraph before the form.  We solved it by having a custom block, it would appear a more general, flexible solution would be to create a custom content type that has a body field and an entity reference to the customized content form.

### eForm

I had a long conversation with Ted Bowman, the primary developer and maintainer of this module, which is the Drupal 8 implementation of Entity Form, renamed to avoid confusion with how core handles entities now.

In Drupal 7, he as a big advocate of Entity Form as an alternative to Webform with advantages of using the built in and contributed field definitions, thus in many ways more extensible than Webform.

With Drupal 8, and the slow availability of Webform, I would have predicted that eForm would establish itself as the defacto replacement for Webform.  However that conversation left me thinking he's not convinced that eForm offers any significant advantages over Contact and Contact Storage (they yield very similar results, entities with fields).

He also just took a position with Acquia's Office of the CTO to work on Drupal core.  I noticed the module, which only has a DEV version available, is now labeled Seeking co-maintainer(s), an indication that he likely will be limiting his involvement moving forward.

The project page also has a strong disclaimer against using eForm for forms that contain more than 150 form elements, for performance and memory consumption reasons, as described in the issue [https://www.drupal.org/node/2091819](https://www.drupal.org/node/2091819).

One advantage eForm appears to have over the Contact/Contact Storage option is permissions are stored and managed at the form level and not through the general Drupal level, keeping the number of content permissions more manageable.

### YAML Form

### Webform

