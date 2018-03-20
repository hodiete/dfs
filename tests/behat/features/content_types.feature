@api
Feature: Check for the existence and fields of content types
# NEW CT ###########################################################################################################
### EVENT CONTENT TYPE ###
# Check for the existence of a content type
# CONTENT TYPE: Event
# ROLE: administrator
  Scenario: Determine if a content type exists for event with the administrator role and the given fields
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_event"
    Then I should not see "the page that you are looking for is not found"
    And I should not get a 404 HTTP response
    Then I should see text matching "Title"
    And I should see text matching "Short Title"
    And I should see text matching "Summary/Description"
    And I should see text matching "Date Start"
    And I should see text matching "Date End"
    And I should see text matching "All day"
    And I should see text matching "Venue Name"
    And I should see text matching "Address"
    And I should see text matching "Redirect Url"
    And I should see text matching "Content Categorization"
    And I should see text matching "Filter Terms"
    And I should see text matching "Agency Keywords"
    And I should see text matching "Global Keywords"
    And I should see text matching "Hero Image"
    And I should see text matching "Navigator / Table of Content Toggle"
    And I should see text matching "Content Sections"

# Check for the existence of a content type
# CONTENT TYPE: Event
# ROLE: anonymous user
  Scenario: Determine if a content type exists for events with the anonymous user role and the given fields
    Given I am an anonymous user
    When I am on "/node/add/webny_event"
    Then I should see "the page that you are looking for is not found"
# =======================================================================================
### Default Display Mode ###
# Check if the display mode for the content type exists
# CONTENT TYPE: Event
# ROLE: administrator
  Scenario: Does the event default display mode exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_event/display"
    Then I should not get a 404 HTTP response
    And I should not see "the page that you are looking for is not found"

# Check if the display mode for the content type exists
# CONTENT TYPE: Event
# ROLE: anonymous user
  Scenario: Anon can not access event default display mode
    Given I am an anonymous user
    When I am on "/admin/structure/types/manage/webny_event/display"
    Then I should see "the page that you are looking for is not found"

# NEW CT ###########################################################################################################
### NEWS CONTENT TYPE ###
# Check for the existence of a content type
# CONTENT TYPE: News
# ROLE: administrator
  Scenario: Determine if a content type exists for news with the administrator role and the given fields
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_news"
    Then I should not see "the page that you are looking for is not found"
    And I should not get a 404 HTTP response
    Then I should see text matching "Agency Keywords"
    And I should see text matching "Attached Documents"
    And I should see text matching "Body"
    And I should see text matching "Category"
    And I should see text matching "Contact Information"
    And I should see text matching "Date"
    And I should see text matching "Documents Section Sub Title"
    And I should see text matching "Documents Section Title"
    And I should see text matching "Global Keywords"
  #And I should see text matching "Hero Button"
  #And I should see text matching "Hero Button (additional)"
    And I should see text matching "Filter Terms"
    And I should see text matching "Hero Title"
    And I should see text matching "Image"
    And I should see text matching "Location"
    And I should see text matching "Short Title"
    And I should see text matching "Sub Titles"
    And I should see text matching "Summary / Description"

# Check for the existence of a content type
# CONTENT TYPE: News
# ROLE: content author
#  Scenario: Determine if a content type exists for news with the content author role and the given fields
#    Given I am logged in as a user with the content author role
#    When I am on "/node/add/webny_news"
#    Then I should not see "the page that you are looking for is not found"
#    And I should not get a 404 HTTP response
#    Then I should see text matching "Agency Keywords"
#    And I should see text matching "Attached Documents"
#    And I should see text matching "Attachment"
#    And I should see text matching "Body"
#    And I should see text matching "Contact Information"
#    And I should see text matching "Date"
#    And I should see text matching "Documents Section Sub Title"
#    And I should see text matching "Documents Section Title"
#    And I should see text matching "Global Keywords"
#    And I should see text matching "Image"
#    And I should see text matching "Location"
#    And I should see text matching "Subject Heading"
#    And I should see text matching "Sub Title"
#    And I should see text matching "Teaser Text"

# Check for the existence of a content type
# CONTENT TYPE: News
# ROLE: anonymous user
  Scenario: Determine if a content type exists for news with the anonymous user role and the given fields
    Given I am an anonymous user
    When I am on "/node/add/webny_news"
    Then I should see "the page that you are looking for is not found"
# =======================================================================================
### Default Display Mode ###
# Check if the display mode for the content type exists
# CONTENT TYPE: News
# ROLE: administrator
  Scenario: Does the default display mode exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_news/display"
    Then I should not get a 404 HTTP response
    And I should not see "the page that you are looking for is not found"

# Check if the display mode for the content type exists
# CONTENT TYPE: News
# ROLE: anonymous user
  Scenario: Does the default display mode exist
    Given I am an anonymous user
    When I am on "/admin/structure/types/manage/webny_news/display"
    Then I should see "the page that you are looking for is not found"

# NEW CT ###########################################################################################################
### LANDING PAGE CONTENT TYPE ###
# Check for the existence of a content type
# CONTENT TYPE: Landing Page
# ROLE: administrator
  Scenario: Determine if a content type exists for landing page with the administrator role and the given fields
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_landing_page"
    Then I should not see "the page that you are looking for is not found"
    And I should not get a 404 HTTP response
    And I should see text matching "Agency Keywords"
    And I should see text matching "Global Keywords"
    And I should see text matching "Short Title"
    And I should see text matching "Subtitle"
    And I should see text matching "Summary/Description"
    And I should see text matching "Hero Fields"
    And I should see text matching "Hero Image"
    And I should see text matching "Hero/Title Visibility Options"
    And I should see text matching "Hero Button \(additional\)"
    And I should see text matching "Hero Button"
    And I should see text matching "Hero Video URL"
    And I should see text matching "Frames of Content"
    And I should see text matching "Add Card"
    And I should see text matching "Add Announcement"
    And I should see text matching "Add Bio"
    And I should see text matching "Add Summary"
    And I should see text matching "Add Get Involved"
    And I should see text matching "Add WYSIWYG"
    And I should see text matching "Views Field"
    And I should see text matching "Add Social Media" 
    And I should see text matching "Metadata"
    And I should see text matching "Filter Terms"
    And I should not see text matching "Add Phone Contact"

# Check for the existence of a content type
# CONTENT TYPE: Landing Page
# ROLE: anonymous user
  Scenario: Determine if a content type exists for news with the anonymous user role and the given fields
    Given I am an anonymous user
    When I am on "/node/add/webny_landing_page"
    Then I should see "the page that you are looking for is not found"
# =======================================================================================
### Check Paragraph Types Functionality ###
# Check for the existence of a paragraph type
# CONTENT TYPE: Landing Page
# ROLE: administrator
# FEATURE: Check if announcement button displays correct fields
  Scenario: Does a user see the fields after the announcement button is pressed
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_landing_page"
    And I press "Add Announcement"
    Then I should see text matching "Frames of Content"
    And I should see text matching "Announcement Title"
    And I should see text matching "Announcement Headline"
    And I should see text matching "Announcement Entity Reference"

# Check for the existence of a paragraph type
# CONTENT TYPE: Landing Page
# ROLE: content author
# FEATURE: Check if announcement button displays correct fields
#  Scenario: Does a user see the fields after the announcement button is pressed
#    Given I am logged in as a user with the content author role
#    When I am on "/node/add/webny_landing_page"
#    And I press "Add Announcement"
#   Then I should see text matching "Frames of Content"
#   And I should see text matching "Announcement Title"
#   And I should see text matching "Announcement Headline"
#   And I should see text matching "Announcement Entity Reference"
# Check for the existence of a paragraph type
# CONTENT TYPE: Landing Page
# ROLE: administrator
# FEATURE: Check if Card button displays correct fields
  Scenario: Does a user see the fields after the announcement button is pressed
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_landing_page"
    When I press "Add Card"
    Then I should see text matching "Card Entity Reference"

# Check for the existence of a paragraph type
# CONTENT TYPE: Landing Page
# ROLE: content author
# FEATURE: Check if Card button displays correct fields
#  Scenario: Does a user see the fields after the announcement button is pressed
#   Given I am logged in as a user with the content author role
#   When I am on "/node/add/webny_landing_page"
#   When I press "Add Card"
#   Then I should see text matching "Card Entity Reference"


# =======================================================================================
### Default Display Mode ###
# Check if the display mode for the content type exists
# CONTENT TYPE: Landing Page
# ROLE: administrator
# FEATURE: Default Display Mode
  Scenario: Does the default display mode exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/types/manage/webny_landing_page/display"
    Then I should not get a 404 HTTP response
    And I should not see "the page that you are looking for is not found"

# Check if the display mode for the content type exists
# CONTENT TYPE: Landing Page
# ROLE: anonymous user
# FEATURE: Default Display Mode
  Scenario: The default display mode should not display
    Given I am an anonymous user
    When I am on "/admin/structure/types/manage/webny_landing_page/display"
    Then I should see "the page that you are looking for is not found"
# =======================================================================================
### Announcement Display Mode ###

# Check if the display mode for the content type exists
# CONTENT TYPE: Landing Page
# ROLE: administrator
# FEATURE: Announcement Display Mode
  Scenario: Does the announcement display mode exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/types/manage/webny_landing_page/display/webny_announcement"
    Then I should not get a 404 HTTP response
    And I should not see "the page that you are looking for is not found"
# Check if the display mode for the content type exists
# CONTENT TYPE: Landing Page
# ROLE: anonymous user
# FEATURE: Announcement Display Mode
  Scenario: The default display mode should not display
    Given I am an anonymous user
    When I am on "/admin/structure/types/manage/webny_landing_page/display/webny_announcement"
    Then I should see "the page that you are looking for is not found"

# =======================================================================================
### Feature Card Display Mode ###
# Check if the display mode for the content type exists
# CONTENT TYPE: Landing Page
# ROLE: administrator
# FEATURE: Feature Card Display Mode
  Scenario: Does the feature card display mode exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/types/manage/webny_landing_page/display/webny_featured_card"
    Then I should not get a 404 HTTP response
    And I should not see "the page that you are looking for is not found"
# Check if the display mode for the content type exists
# CONTENT TYPE: Landing Page
# ROLE: anonymous user
# FEATURE: Feature Card Display Mode
  Scenario: The feature card display mode should not display
    Given I am an anonymous user
    When I am on "/admin/structure/types/manage/webny_landing_page/display/webny_featured_card"
    Then I should see "the page that you are looking for is not found"

# NEW CT ###########################################################################################################
### INNER PAGE CONTENT TYPE ###
# Check for the existence of a content type
# CONTENT TYPE: Inner Page
# ROLE: administrator
  Scenario: Determine if a content type exists for news with the administrator role and the given fields
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_page"
    Then I should not see "the page that you are looking for is not found"
    And I should not get a 404 HTTP response
    Then I should see text matching "Agency Keywords"
    And I should see text matching "Attached Documents"
    And I should see text matching "Body"
    And I should see text matching "Description/Summary"
    And I should see text matching "Documents Section Title"
    And I should see text matching "Documents Section Sub Title"
    And I should see text matching "Filter Terms"
    And I should see text matching "Global Keywords"
  #And I should see text matching "Hero Button"
  #And I should see text matching "Hero Button \(Additional\)"
    And I should see text matching "Hero Title"
    And I should see text matching "Hero/Title Visibility Options"
    And I should see text matching "Image"
    And I should see text matching "Short Title"
    And I should see text matching "Sub Title"

# =======================================================================================
# Check for the existence of a content type
# CONTENT TYPE: Inner Page
# ROLE: anonymous user
  Scenario: Determine if a content type exists for news with the anonymous user role and the given fields
    Given I am an anonymous user
    When I am on "/node/add/webny_page"
    Then I should see "the page that you are looking for is not found"

# =======================================================================================
### Default Display Mode ###
# Check if the display mode for the content type exists
# CONTENT TYPE: Inner Page
# ROLE: administrator
  Scenario: Does the default display mode exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/types/manage/webny_page/display"
    Then I should not get a 404 HTTP response
    And I should not see "the page that you are looking for is not found"

# Check if the display mode for the content type exists
# CONTENT TYPE: Inner Page
# ROLE: anonymous user
  Scenario: Does the default display mode exist
    Given I am an anonymous user
    When I am on "/admin/structure/types/manage/webny_page/display"
    Then I should see "the page that you are looking for is not found"

# NEW CT ###########################################################################################################
### CONTACT CONTENT TYPE ###
# Check for the existence of a content type
# CONTENT TYPE: Contact Content Type
# ROLE: administrator
  Scenario: Determine if a content type exists for news with the administrator role and the given fields
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_contact"
    Then I should not see "the page that you are looking for is not found"
    And I should not get a 404 HTTP response
    And I should see text matching "Caption / Quote"
    And I should see text matching "Email"
    And I should see text matching "Facebook Link"
    And I should see text matching "Fax"
    And I should see text matching "Filter Terms"
    And I should see text matching "Flickr Link"
    And I should see text matching "Global Keywords"
    And I should see text matching "Google"
    And I should see text matching "Image"
    And I should see text matching "Instagram Link"
    And I should see text matching "LinkedIn Link"
    And I should see text matching "Link to Resource"
    And I should see text matching "Map Directions"
    And I should see text matching "Name"
    And I should see text matching "Other Details"
    And I should see text matching "Phone"
    And I should see text matching "Pinterest Link"
    And I should see text matching "Professional Title"
    And I should see text matching "Professional Subtitle"
    And I should see text matching "RSS Link"
    And I should see text matching "SnapChat Link"
    And I should see text matching "SoundCloud Link"
    And I should see text matching "Tumblr Link"
    And I should see text matching "Twitter Link"
    And I should see text matching "Vimeo Link"
    And I should see text matching "Vine Link"
    And I should see text matching "YouTube Link"

# Contact Paragraph Type display
# Check for the display Mode GENERIC on paragraph type
  Scenario: Does the generic display mode exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_documents/display/generic"
    Then I should not get a 404 HTTP response

# Check the backend display form. The Generic form should be enabled for content authors
  Scenario: Does the generic display form exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_documents/form-display/generic_form"
    Then I should not get a 404 HTTP response


# =======================================================================================
# Check for the existence of a content type
# CONTENT TYPE: Inner Page
# ROLE: anonymous user
  Scenario: Determine if a content type exists for news with the anonymous user role and the given fields
    Given I am an anonymous user
    When I am on "/node/add/webny_contact"
    Then I should see "the page that you are looking for is not found"

# =======================================================================================
### Default Display Mode ###
# Check if the display mode for the content type exists
# CONTENT TYPE: Cotnact Content Page
# ROLE: administrator
  Scenario: Does the default display mode exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/types/manage/webny_contact/display"
    Then I should not get a 404 HTTP response
    And I should not see "the page that you are looking for is not found"

# =======================================================================================
# Check if the display mode for the content type exists
# CONTENT TYPE: Contact Page
# ROLE: anonymous user
  Scenario: Does the default display mode exist
    Given I am an anonymous user
    When I am on "/admin/structure/types/manage/webny_contact/display"
    Then I should see "the page that you are looking for is not found"

# NEW CT ###########################################################################################################
### GENERIC PAGE CONTENT TYPE ###
# Check for the existence of a content type
# CONTENT TYPE: Generic Page Content
# ROLE: administrator
  Scenario: Determine if a content type exists for generic content page with the administrator role and the given fields
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_generic_page"
    Then I should not see "the page that you are looking for is not found"
    And I should not get a 404 HTTP response
    And I should see text matching "Short Title"
    And I should see text matching "Description"
    And I should see text matching "Summary/Description"
    And I should see text matching "Average Transaction Time \(in minutes\)"
    And I should see text matching "Content Categorization"
    And I should see text matching "Content Sections"
    And I should see text matching "Date"
    And I should see text matching "Hero Image"
    And I should see text matching "How to Apply \(link field\)"
    And I should see text matching "Keywords"
    And I should see text matching "Metatags"
    And I should see text matching "Navigator / Table of Content Toggle"
    And I should see text matching "Filter Terms"
    And I should not see text matching "Add Phone Contact"

# Check for the settings of a content type, incl display modes
# CONTENT TYPE: Generic Page Content
# ROLE: administrator
  Scenario: Determine if a content type for generic content page with the administrator role and the given settings
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_generic_page/fields/node.webny_generic_page.field_webny_gencp_contentsect"
    Then I should not see "the page that you are looking for is not found"
    And the "edit-settings-handler-settings-target-bundles-drag-drop-webny-paragraph-contact-enabled" checkbox should be checked
    And the "edit-settings-handler-settings-target-bundles-drag-drop-webny-documents-enabled" checkbox should be checked
    And the "edit-settings-handler-settings-target-bundles-drag-drop-webny-wysiwyg-pgtype-enabled" checkbox should be checked
    When I am on "/admin/structure/types/manage/webny_generic_page/display/webny_announcement"
    Then I should not see "the page that you are looking for is not found"
    When I am on "/admin/structure/types/manage/webny_generic_page/display/webny_featured_card"
    Then I should not see "the page that you are looking for is not found"

# Check for the existence of a content type
# CONTENT TYPE: Landing Page
# ROLE: anonymous user
  Scenario: Determine if a content type exists for news with the anonymous user role and the given fields
    Given I am an anonymous user
    When I am on "/node/add/webny_generic_page"
    Then I should see "the page that you are looking for is not found"

# NEW CT ###########################################################################################################
### LOCATION CONTENT TYPE ###
# Check for the existence of a content type
# CONTENT TYPE: Location
# ROLE: administrator
  Scenario: Determine if a content type exists for location page with the administrator role and the given fields
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_location"
    Then I should not see "the page that you are looking for is not found"
    And I should not get a 404 HTTP response
    And I should see text matching "Location Title"
    And I should see text matching "Short Title"
    And I should see text matching "Summary/Description"
    And I should see text matching "Location Type"
    And I should see text matching "Address"
    And I should see text matching "Counties Served"
    And I should see text matching "Phone"
    And I should see text matching "Add Phone Contact"
    And I should see text matching "Filter Terms"
    And I should see text matching "Hero Image"
    And I should see text matching "Navigator / Table of Content Toggle"
    And I should see text matching "Add Documents"
    And I should see text matching "Add Contact"
    And I should see text matching "Add WYSIWYG"

# Check for the permission of access on a content type
# CONTENT TYPE: Location
# ROLE: anonymous user
  Scenario: Determine if a content type exists for news with the anonymous user role and the given fields
    Given I am an anonymous user
    When I am on "/node/add/webny_location"
    Then I should see "the page that you are looking for is not found"
