@api
Feature: Featured Card Paragraph Tests
  -Check to see if Featured Card exists on Landing Page Content Types
  -Check if display modes are present on News/InnerPage/Landing

# Check if fields for Featured Card Exist
  Scenario: See if Add Featured Card button and fields exist
    Given I am logged in as a user with the administrator role
    When I am on "/node/add/webny_landing_page"
    Then I should not see "Access denied"
    When I press the "Add Card" button
    Then I should see "Card Entity Reference"
    And I should see "Paragraph type: Card"

# Display modes checks
  Scenario: Check the display modes to see if Featured Card display exists
    Given I am logged in as a user with the administrator role
    When I am on "/admin/structure/types/manage/webny_landing_page/display/webny_featured_card"
    Then I should not see "Access denied"
    When I am on "/admin/structure/types/manage/webny_news/display/webny_featured_card"
    Then I should not see "Access denied"
    When I am on "/admin/structure/types/manage/webny_page/display/webny_featured_card"
    Then I should not see "Access denied"