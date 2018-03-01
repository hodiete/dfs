@api
Feature: Category Tiles Paragraph Tests
  -Check to see if Category Tiles exists on Landing Page Content Types
  -Check if display modes are present for Category Tiles

# Check if fields for Category Tiles Exist
  Scenario: See if Add Category Tiles button and fields exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_landing_page"
    Then I should not see "You are not authorized to access this page"
    When I press the "Add Category Tiles" button
    Then I should see text matching "Category Tiles"
    And I should see "BACKGROUND IMAGE"
    And I should see "Title"
    And I should see "Subtitle"
    And I should see "Body"
    And I should see the heading "Category Tiles"
    And I should see "URL"
    And I should see "Link text"


# Paragraph Frames of Content check if Category Tiles exist
  Scenario: Check the Paragraph Frames of Content to see that Category Tiles exists
    Given I am logged into the distro with the "administrator" role
    When I am on "admin/structure/types/manage/webny_landing_page/fields/node.webny_landing_page.field_webny_landing_paragraph"
    Then I should see text matching "Category Tiles"

