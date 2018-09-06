@api
Feature: Summary Frame Paragraph Tests
  -Check to see if Summary can be added to Landing Page Content Types
  -Check if Summary paragraph type is option on Landing Page nodes
  -Create a Landing Page with a Summary Frame -- Check

# Paragraph type checks
  Scenario: Check the paragraphy type to see if the Summary Frame exists
    Given I am logged into the distro with the "administrator" role 
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
