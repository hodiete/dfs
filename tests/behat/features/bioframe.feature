@api
Feature: Bioframe / Contact Content Type
  -Check to see if Three fields have been added to the contact content type
  -Check if paragraph type for bioframe entity reference exists
  -See if there is a display mode for bioframe in the contact content type

# Check to see if Three fields have been added to the contact content type
  Scenario: If I go to the contact content type, I should see Five (5) new fields and a title of BIO FRAME
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_contact"
    Then I should not see "You are not authorized to access this page"
    And I should see text matching "Professional Title"
    And I should see text matching "Name"
    And I should see text matching "Professional Subtitle"
    And I should see text matching "Caption / Quote"
	And I should see text matching "Link to Resource"
	And I should see text matching "Image"

# Display modes checks for Bio Frame
  Scenario: Check the display modes to see if Announcement display exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/display-modes/view"
    And I should see "Bio Frame"
    When I am on "/admin/structure/types/manage/webny_contact/display/webny_contact_bio_frame"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/paragraphs_type/webny_bio_pgtype/display"
	Then I should not get a 404 HTTP response 
	And I should see text matching "Bio Wrapper"
	And I should see text matching "Bio Frame Reference"

