@api
Feature: Get Involved Frame Paragraph Tests
  -Check to see if Get Involved can be added to Landing Page Content Type
  -Check if Get Involved paragraph type is option on Landing Page nodes
  -Create a Landing Page with a Get Involved Frame -- Check
  
# Check if option for Get Involved Frame exists
  Scenario: See if Get Involved checkbox on Landing Page Content Type exists
    Given I am logged in as a user with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_landing_page/fields/node.webny_landing_page.field_webny_landing_paragraph"
    Then I should not see "Access denied"
    # Given I check the box "Get Involved"
    # And I check the box "Card"
    # And I check the box "Announcement"
    # When I press the "Save" button
    # When I am on "/node/add"
    # Then I should see "Landing Page"
    # When I click "Landing Page"
    # Then I should see "Add Get Involved"
	
# Paragraph type checks
  Scenario: Check the paragraph type to see if the Get Involved Frame exists
    Given I am logged in as a user with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_get_involved_pgtype"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/paragraphs_type/webny_get_involved_pgtype/fields"
    Then I should see "Title"
	And I should see "Share Title"
    And I should see "Headline"
    And I should see "Description"
    And I should see "Call To Action Button"
    And I should see "URL"
    When I am on "/admin/structure/paragraphs_type/webny_get_involved_pgtype/display"
    Then I should not get a 404 HTTP response