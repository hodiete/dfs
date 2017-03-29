@api
Feature: Summary Frame Paragraph Tests
  -Check to see if Summary can be added to Landing Page Content Types
  -Check if Summary paragraph type is option on Landing Page nodes
  -Create a Landing Page with a Summary Frame -- Check

# Check if option for Summary Frame exists
  Scenario: See if Summary checkbox on Landing Page Content Type exists
    Given I am logged in as a user with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_landing_page/fields/node.webny_landing_page.field_webny_landing_paragraph"
    Then I should not see "Access denied"
    Given I check the box "Summary"
    And I check the box "Card"
    And I check the box "Announcement"
    Then I press the "Save settings" button
    When I am on "/node/add"
    Then I should see "Landing Page"
    When I click "Landing Page"
    Then I should see "Add Summary"

# Paragraph type checks
  Scenario: Check the paragraphy type to see if the Summary Frame exists
    Given I am logged in as a user with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_summary_pgtype"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/paragraphs_type/webny_summary_pgtype/fields"
    Then I should see "Call to Action"
    And I should see "Headline"
    And I should see "Key Point 1"
    And I should see "Key Point 2"
    And I should see "Key Point 3"
    And I should see "Supporting Argument"
    And I should see "field_webny_summary_argument2"
    And I should see "Title"
    When I am on "/admin/structure/paragraphs_type/webny_summary_pgtype/display"
    Then I should not get a 404 HTTP response
