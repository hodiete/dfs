@api 
Feature: Featured Card Paragraph Tests
  -Check to see if Featured Card exists on Landing Page Content Types
  -Check if display modes are present on News/InnerPage/Landing

# Check if fields for Featured Card Exist
  Scenario: See if Add Featured Card button and fields exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_landing_page"
    Then I should not see "You are not authorized to access this page"
    When I press the "Add Card" button
    Then I should see "Card Entity Reference"
    And I should see "Card"
    And I should see "Card Title"
    And I should see "Card Headline"

# Display modes checks
  Scenario: Check the display modes to see if Featured Card display exists
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/types/manage/webny_landing_page/display/webny_featured_card"
    Then I should not see "You are not authorized to access this page"
    When I am on "/admin/structure/types/manage/webny_news/display/webny_featured_card"
    Then I should not see "You are not authorized to access this page"
    When I am on "/admin/structure/types/manage/webny_page/display/webny_featured_card"
    Then I should not see "You are not authorized to access this page"

# Check if card is created on landing page
#  Scenario: An administrator should be able to create cards on a landing page
#    Given "webny_page" content:
#      | title      | summary/description   |
#      | testpage5  | test content          |
#    And "webny_landing_page" content:
#      | title     | edit-field-webny-landing-paragraph-0-subform-field-webny-card-entity-ref-0-target-id |
#      | Testpage2 | testpage5|
#    When I go to "testpage5"
#    #Given I wait for AJAX to finish.
#    Then I should not see "You are not authorized to access this page"
#    When I go to "Testpage2"
#    Then I should not see "You are not authorized to access this page"
#    #And I should see "LEARN MORE" -- this won't work until GoutteDriver changed due to iframes
    
