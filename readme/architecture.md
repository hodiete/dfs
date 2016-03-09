Drupal Architecture: WebNY Platform
========================
v1.0

Note: This is a living document that will evolve throughout the lifecycle of the project. Any delivery of this document is a snapshot in time and may be either incomplete or inaccurate as the project/platform evolves. This and related documents will be maintained throughout the project and the goal is to most accurately reflect the current known state of architecture for the various project components.

## Contents

- [Background](#background)
  - [Discovery](#discovery)
	- [Project Methodology](#project-methodology)
	- [Design](#design)
- [Technical Overview](#technical-overview)
  - [Infrastructure](#infrastructure)
      - [Environments](#environments)
      - [Traffic Management and CDN](#traffic-management-and-cdn)
  - [High-level Technical Requirements](#high-level-technical-requirements)
    - [Security](#security)
    - [Performance](#performance)
      - [Content Caching](#content-caching)
  - [Recommended practices](#recommended-practices)
    - [Performance profiling and testing](#performance-profiling-and-testing)
    - [Performance Configuration Review](#performance-configuration-review)
    - [Performance Testing](#performance-testing)
    - [Load and Stress testing](#load-and-stress-testing)
    - [Performance Goals](#performance-goals)
- [Development and deployment strategy](#development-and-deployment-strategy)
   - [Testing](#testing)
      - [QA Testing](#qa-testing)
     - [Performance and Load Testing](#performance-load)
- [User roles](#user-roles)
- [Custom and contributed projects](#custom-and-contributed-projects)
  - [Install Profile](#install-profile)
  - [Contributed Modules](#contributed-modules)
  - [Custom Modules](#custom-modules)
  - [Base Theme](#base-theme)
  - [Custom Themes](#custom-themes)
  - [Libraries](#libraries)
- [Content Architecture](#content-architecture)
  - [News (content type)](#news)
   - [Examples](#examples)
  - [Inner Page (content type)](#inner-page)
    - [Examples](#examples)
  - [Contact Information (content type)](#contact-information)
    - [Examples](#examples)
  - [Tags (vocabulary)](#tags-vocabulary)
- [Features](#features)
  - [Feature A](#feature-a)
   - [Assumptions](#assumptions)
   - [Risks](#risks)
  - [Contact Form](#contact-form)
   - [Assumptions](#assumptions)
   - [Risks](#risks)
  - [Views](#views)
   - [News Listing](#news-listing)   
- [Theme Architecture](#theme-architecture)
- [Integrations Summary](#integrations-summary)
- [Migration](#migration)
   - [Assumptions](#assumptions)
   - [Risks](#risks)



#Background

##Discovery
TODO: Summary of discovery, findings, etc.

##Project methodology
TODO: Proposed or currently used sprint cycle overview, etc.

##Design
TODO: Who is doing design? List dependencies and known risks.


#Technical overview
TODO: High-level technical summary.



##Infrastructure
TODO: High-level overview of hosting infrastructure.

###Environments
TODO: Update this for site factory distro

| Environment | Short name | Audience                | Purpose                                |
|-------------|------------|-------------------------|----------------------------------------|
| Production  | prod       | Public                  | Public traffic                         |
| Staging     | test       | Client, Acquia, Partner | UAT                                    |
| Development | dev        | Acquia, Partner         | Code integration and developer testing |

###Traffic Management and CDN
TODO: Document any use of content delivery networks or other traffic management above the Acquia Cloud platform, including CDN content caching methodology (origin pull, push, both).

##High-level technical requirements
TODO: Browser requirements

###Security
TODO
- Security requirements
- Which domain(s) run over SSL?
- IP-controlled white / black listing

###Performance
####Content Caching
TODO: Outline use of page/component caching with explanation of TTLs or any proactive cache clearing, including Drupal, Varnish, and CDN cache clearing.
##Recommended practices
###Performance profiling and testing
TODO
- Create component performance tracker.
- Create JMeter testing script and add it to the project repository.
- Write test scenarios.
- Configure Varnish, Memcache, APC, etc

####Performance Configuration Review
At a high-level, there are many Drupal configuration options that can affect overall site performance. These settings are likely environment-specific and should be verified only against the production configuration, not local developer environments. Built-in and custom Insight tests can be used to track this data. Automated tools like Cache Audit can also be used locally for reviewing.

Examples include:

- Drupal performance settings (e.g. page cache lifetime, block caching, CSS/JS aggregation)
- Views cache settings (plugin, query, output)
- Panels display/pane cache settings (plugin, output)


####Performance Testing
The platform should be profiled and performance tested during development. This should include XHProf / New Relic code profiling, as well as site configuration and code review for potential issues. Load testing tools like JMeter can be used to simulate traffic to create results, but should not be relied upon to show any scalability issues at this point.

Because platforms are largely composed of sets of independent components, the combination available for building pages is extensive. This makes profiling of full pages largely unpredictable as pages are built and creates a need to identify performance levels on a component by component basis. Each component should be classified by the following characteristics:

- Baseline processing time, generated from the platform demo site
- Functional complexity
    - "Static" - renders without the need to gather external content
    - "Collection" - shows content external to the component, but defined by a specific list (rather than a query); for example, a list of one or many entity references
    - "Dynamic" - uses DB queries/cache requests to determine which content to show
    - "External" - uses an external web service, including Solr, to gather and show content
- Cache interval
    - "Never" - a new copy of the content is rendered within each request
    - "Time" - after a specific period of time, the content must be regenerated
		- "Content" - cache clearing responds to a specific event that is outside of this component


####Load and stress testing
Prior to public launch, the site(s) should be load and stress tested on the hosting cluster’s Staging environment to provide indications of bottlenecks.  Load and stress test need to occur on a timetable of no less than 2-3 weeks prior to launch in order to allow proper remediation of bottlenecks and tuning of hosting environments.

**The base platform should include a basic JMeter performance testing script which can be augmented with site-specific URLs (if relevant) and editorial process for authenticated traffic.** If further modes of testing are required (such as full browser emulation), additional tools or vendors may be required. If extensive AJAX / JS-related functionality exists, "real user" load testing is recommended over request-based tools like JMeter.

*Test scenarios should be made in collaboration with the client.* Using previous traffic analysis, typical user paths should be used for testing rather than a simple list of URLs. This more closely mimics real user traffic and also helps identify specific actions that may be taken, such as filling out forms or other interactions. It also better isolates where problems may exist and allow priorities to be made following test analysis.

The platform as a whole will be tested against total anticipated traffic numbers. Each site will require a new set of scenarios that will be run prior to launch and at each new platform launch. For example, in a multisite configuration, a launch of 4 sites will require 4 sets of scenarios and have the total traffic spread across 4 sites. At the next launch of 4 additional sites, 4 additional sets of scenarios will be created and the total load will be spread across all 8 existing sites.
Performance Goals
In order to quantify the pass / fail criteria for testing, specific goals must be established. These goals are not meant as a requirement of the platform, but will guide the pace at which new features are added if performance slows during development. The following performance metrics are the target for the platform:

- Total page views (per day/week/month)
   - XXX page views per hour, XXX peak
	 - XXX page views per day, XXX peak
- Average page load times (average / max / min)
- Number of concurrent users (max / min / average)
- Response time (time to first and last bytes)
- Requests per second (average / min / max)
- Editor experience: average / min / max time it takes to save an Article into the current CMS once the submit button is pressed.

#Development and deployment strategy
TODO: Compose a high-level summary of the development approach.

- Where is code hosted?
- What issue tracker is being used?
- What is the code review process?
- When will audits occur?
- Is continuous integration an element of the project? If so, describe it.
- How is configuration managed?
- What is the QA and regression testing process? Is there an automated testing strategy?
- What are the code quality and standards expectations? Coding standards, documentation expectations.
- Is this a multisite project? If so, describe the multisite update / rollout approach.
- Are there preconfigured Drush aliases? If so, note their location and configuration details.
- Are specific branches deployed to specific environments?


##Testing
####QA Testing
TODO: Outline testing standards, especially with regards to manual (test script-based) vs. automated.
####Performance and Load Testing
TODO: Outline overall need and acceptable performance metrics.


#User roles
TODO: Outline user roles and their permissions.

| Role name | Permissions (summary) |
|-----------|-----------------------|
| Administrator | 100% control over all aspects of the Drupal site. |
| Authenticated | - Can view published content.  - Can create forum posts. |
| Anonymous | Can view published content. |


#Custom and contributed projects
##Install profile
The State of NY Site Factory platform uses the WebNY distribution for all sites.


##Core modules
 Core              Automated Cron (automated_cron)                                    8.0.5           
 Core              Ban (ban)                                                          8.0.5           
 Core              Block (block)                                                      8.0.5           
 Core              Breakpoint (breakpoint)                                            8.0.5           
 Core              CKEditor (ckeditor)                                                8.0.5           
 Core              Color (color)                                                      8.0.5           
 Core              Comment (comment)                                                  8.0.5           
 Core              Configuration Manager (config)                                     8.0.5           
 Core              Contact (contact)                                                  8.0.5           
 Core              Contextual Links (contextual)                                      8.0.5           
 Core              Custom Block (block_content)                                       8.0.5           
 Core              Custom Menu Links (menu_link_content)                              8.0.5           
 Core              Field (field)                                                      8.0.5           
 Core              Field UI (field_ui)                                                8.0.5           
 Core              Filter (filter)                                                    8.0.5           
 Core              Help (help)                                                        8.0.5           
 Core              History (history)                                                  8.0.5           
 Core              Internal Dynamic Page Cache (dynamic_page_cache)                   8.0.5           
 Core              Internal Page Cache (page_cache)                                   8.0.5           
 Core              Menu UI (menu_ui)                                                  8.0.5           
 Core              Node (node)                                                        8.0.5           
 Core              Path (path)                                                        8.0.5           
 Core              Quick Edit (quickedit)                                             8.0.5           
 Core              RDF (rdf)                                                          8.0.5           
 Core              Responsive Image (responsive_image)                                8.0.5           
 Core              Search (search)                                                    8.0.5           
 Core              Shortcut (shortcut)                                                8.0.5           
 Core              Syslog (syslog)                                                    8.0.5           
 Core              System (system)                                                    8.0.5           
 Core              Taxonomy (taxonomy)                                                8.0.5           
 Core              Text Editor (editor)                                               8.0.5           
 Core              Toolbar (toolbar)                                                  8.0.5           
 Core              Tour (tour)                                                        8.0.5           
 Core              User (user)                                                        8.0.5           
 Core              Views (views)                                                      8.0.5           
 Core              Views UI (views_ui)                                                8.0.5 

##Contributed modules
 Administration    Admin Toolbar (admin_toolbar)                                      8.x-1.14        
 Chaos tool suite  Chaos tools (ctools)                                               8.x-3.0-alpha23 
 Development       Features (features)                                                8.x-3.0-alpha6  
 Development       Features UI (features_ui)                                          8.x-3.0-alpha6  
 Field types       Entity Reference Revisions (entity_reference_revisions)            8.x-1.0-rc4     
 Other             Automated Logout (autologout)                                      8.x-1.0-rc1     
 Other             Configuration Update Base (config_update)                          8.x-1.0         
 Other             Contact storage (contact_storage)                                  8.x-1.0-beta2   
 Other             Login Security (login_security)                                    8.x-1.0-beta3   
 Other             Pathauto (pathauto)                                                8.x-1.0-alpha1  
 Other             Token (token)                                                      8.x-1.0-alpha2  
 Other             WebNY Text Editors (webny_text_editors)                            8.x-1.0         
 Other             WebNY Text Formats (webny_text_formats)                            8.x-1.0         
 Other             Workbench moderation (workbench_moderation)                        8.x-1.0-beta1   
 Paragraphs        Paragraphs (paragraphs)                                            8.x-1.0-rc4     
 Paragraphs        Paragraphs Type Permissions (paragraphs_type_permissions)          8.x-1.0-rc4     
 Security          Password Policy (password_policy)                                  8.x-3.0-alpha2  
 Security          Security Review (security_review)                                                  
 SEO               Metatag (metatag)                                                  8.x-1.0-beta4   
 WebNY             Contact Content Type (webny_contact_content_type)                  8.x-1.0         
 WebNY             Global and Agency Taxonomies (webny_global_and_agency_taxonomies)  8.x-1.0         
 WebNY             Image styles (webny_image_styles)                                                  
 WebNY             Inner Page Content Type (webny_inner_page_content_type)            8.x-1.0         
 WebNY             News Content Type (webny_news_content_type)                        8.x-1.0         
 Webny             Subject Heading Taxonomy (webny_subject_heading_taxonomy)          8.x-1.0                                            
 WebNY             Workflow Basic Configuration (webny_workflow_basic_configuration)       





##Custom modules
An overview of custom modules.

This module is for hook_update functions and other schema changes for deploying configuration. 
 Webny             webny_configuration (webny_configuration)   


##Base theme
The WebNY distro uses Stable as the base theme. 

##Custom themes
TODO: An overview of custom themes, if relevant.

#Libraries
TODO: Any libraries being used in the project.


#Content Architecture
This section includes contain content types, taxonomy vocabularies, and other entity types / bundles, e.g. file types, custom entities, etc. It is assumed that not every entity type will need to list related features, assumptions, or risks.


##Template (content type)
| Field       | Type                   | Notes                |
|-------------|------------------------|----------------------|
| Title       | Text                   |          -           |
| Description | Long text with summary |         -            |

###Assumptions
TODO: Assumptions related to this content type.

###Features/Extended technical notes. 

###Risks
TODO: Risks related to this content type.

Examples: Examples of this content, if relevant.





##News (content type)
The News content type is for News/Press releases.

|Field  | Type                                |  Notes                                                                 |
|-------|-------------------------------------|------------------------------------------------------------------------|
| Title | Text                                |                                                                        |
| Body  | Long text with summary and WYSIWYG  |                                                                        |  
| Image | Image                               | Allowed file types: png, jpg, jpeg. Optional. Alt text required.       |
| Attachment  | File                          | Allowed file types: pdf 
| Contact Information  | Entity reference     | Will need to be refactored to account for Contact Information content type created in sprint 2. Optional. |
| Sub Title  | Short text        |  Multiple values allowed. Optional              |
| Teaser text  | Short text             |                |
| Date  | Date picker                          |                |
| Location  | Short text               | Optional                |
| Global Keywords | Entity reference to Global Keyword vocabulary                |                |
| Agency Keywords | Entity reference to Agency Keyword vocabulary                 |                |
| Subject Heading | Entity reference to Agency Keyword vocabulary                 |                |




###Examples 
TODO: This is dependent on Default content being deployed. 


##Inner Page (content type)
This content type is for basic/generic pages.

|Field  | Type                                |  Notes                                                                 |
|-------|-------------------------------------|------------------------------------------------------------------------|
| Title | Text                                |                                                                        |
| Body  | Long text with summary and WYSIWYG  |                                                                        |  
| Image | Image                               | Allowed file types: png, jpg, jpeg. Optional. Alt text required.       |
| Attachment  | File                          | Allowed file types: txt, doc, docx 
| Sub Title  | Short text         |  Multiple values allowed. Optional              |
| Description / Summary  | Long text            |                |
| Global Keywords | Entity reference to Global Keyword vocabulary                |                |
| Agency Keywords | Entity reference to Agency Keyword vocabulary                 |                |
| Subject Heading | Entity reference to Agency Keyword vocabulary                 |                |




###Examples 
TODO: This is dependent on Default content being deployed. 



##Contact (content type)
This content type contains information needed to contact individuals or offices associated with the content that it is attached to. 
It is used as an entity reference in other content types to "push out" contact information updates to those nodes.

|Field  | Type                                |  Notes                                                                 |
|-------|-------------------------------------|------------------------------------------------------------------------|
| Contact Name | Text                         |   Title field                                                                     |
| Email  | Email  |                                                                        |  
| Fax | Telephone number                      |       |
| Phone | Telephone number                         | 
| Office Address  | Long text        |                |
| Other details | Long text            |                |
| Facebook Link | Link               |                |
| Flickr Link | Link               |                |
| Google+ Link | Link               |                |
| Instagram Link | Link               |                |
| Linkedin Link | Link               |                |
| Pinterest Link | Link               |                |
| RSS Link | Link               |                |
| Snapchat Link | Link               |                |
| Soundcloud Link | Link               |                |
| Tumblr Link | Link               |                |
| Twitter Link | Link               |                |
| Vimeo Link | Link               |                |
| Vine Link | Link               |                |
| Youtube Link | Link               |                |



###Examples 
TODO: This is dependent on Default content being deployed. 



##Tags (vocabulary)

- Global Keywords
- Agency Keywords
- Subject Heading



#Features
TODO: A list of features that need to be built for this project. Should cover the relevant areas below.

If features are discussed but later removed from scope, do not simply delete them from the document. Instead, note in the feature description that the feature is now considered out of scope.

- Misc. integrations
- Internationalization / Localization
- Text formats and filters
- WYSIWYG
- Page building (Panels, Panelizer, Context, etc.)
- Workflow and moderation
- Administrative features
- Search strategy
- Media handling (images, video, documents, etc.)
- Analytics
- Ad provider integration
- Exposed web services
- Menu management
- Meta data and social integration (Metatags, etc.)
- URL structure

Template
##Feature A
TODO: Feature description and notes.

###Assumptions
TODO: List of assumptions.

###Risks
TODO: List of risks.

##Contact Form
The contact form is a set of pre-defined fields so that users can contact the site owner. It uses the core Contact module and reporting will be accomplished via the Contact Storage module.
The Contact Form Description Block is placed on the Contact Form page at /contact/* The default recipient is noreply@its.ny.gov. The contact form includes the following fields:
 Field       | Type                   | Notes                |
|-------------|------------------------|----------------------|
| Salutation       | Select List        |                     |
| First Name | Short text |                     |
| Last Name | Short text |                     |
| Email | Email |                     |
| Address | Short text |                     |
| City | Short text |                     |
| State | Select list |                     |
| Zip Code | Number (int) |                     |
| Subject | Short text |                     |
| Message | Short text |                     |

##Examples
The contact form is located at contact/contact_form. 

###Assumptions
Updating, adding, or deleting form fields must be done on the platform level rather than by site builders.

###Risks
This is a replacement for basic webforms and offers less flexibility by site builders than the current D7 State of NY implementation.


##Workflow and Content Moderation
The Workbench Moderation module is used for content workflow. The standard workbench moderation states are used. 

##Views

###News Listing
- The news listing view shows a list of 10 news article with a pager to navigate to additional news articles. 
- Content is not refreshed via AJAX, it is a full page refresh with anchor tagging so the user returns to the news listing 
- News articles are displayed newest to oldest 
- News items include Title, Date with time, teaser and time with a thumbnail image. 
- This view has exposed filters by category, keyword and date range 

*Note:* There is a known issue with the date picker not appearing in the exposed date filter.


#Theme architecture

##Base theme

##Page regions
##Template file naming
##CSS management

- JS management

- Blocks and block management (if not mentioned earlier)

#Image styles
The responsive images module is used with the core breakpoint module

##Hero image 
 - Uses Breakpoint group: Webny_theme 
 - Wide breakpoint uses: wide lead (1280x427) 
 - Narrow breakpoint uses: narrow lead (768x307) 
 - Mobile breakpoint uses: mobile lead (320x256) 
 - Fallback image: mobile lead (320x256) 

##Hero image tall 
 - Uses Breakpoint group: Webny_theme 
 - Wide breakpoint uses: wide lead tall (1280x512) 
 - Narrow breakpoint uses: narrow lead (768x307) 
 - Mobile breakpoint uses: mobile lead (320x256) 
 - Fallback image: mobile lead (320x256) 

##Cards 
 - Uses Breakpoint group: Webny_theme 
 - Wide breakpoint uses: card vertical (400x225) 
 - Narrow breakpoint uses: card horizontal (225x225) 
 - Mobile breakpoint uses: card vertical (400x225) 
 - Fallback image is card horizontal (225x225) 



#Integrations summary
TODO: A summary of integration points, however slight they might be. Integration details, assumptions, and risks are likely already outlined in the Features section above. This section is purely for reference.

#Migration
TODO: If relevant, an high-level overview of data needing to be migrated and discussion of the migration strategy.


##Assumptions
TODO: Migration-related assumptions, e.g. delivery and access to data.
##Risks
TODO: Migration-related risks, e.g. delayed delivery of data.



