@api
Feature: WYSIWYG Frame Paragraph Tests
  -Check to see if WYSIWYG can be added to Landing Page Content Types
  -Check if WYSIWYG paragraph type is option on Landing Page nodes
  -Create a Landing Page with a WYSIWYG Frame -- Check

# Check if option for WYSIWYG Frame exists
  Scenario: See if WYSIWYG checkbox on Landing Page Content Type exists
    Given I am logged in as a user with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_landing_page/fields/node.webny_landing_page.field_webny_landing_paragraph"
    Then I should not see "Access denied"
    # Given I check the box "WYSIWYG"
    # When I press the "Save" button
    # When I am on "/node/add"
    # Then I should see "Landing Page"
    # When I click "Landing Page"
    # Then I should see "Add Summary"

# Paragraph type checks
  Scenario: Check the paragraphy type to see if the WYSIWYG Frame exists
    Given I am logged in as a user with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype/fields"
    Then I should see "Title"
    And I should see "Headline"
    And I should see "WYSIWYG Body"
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype/display"
    Then I should not get a 404 HTTP response
