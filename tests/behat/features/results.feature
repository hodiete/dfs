@api
Feature: Results Listing Tests
  -Check to see if news listing page exists
  

# Check News Listing Exists
  Scenario: See if Add Announcement button and fields exist
    Given I am a user with the anonymous role
    When I am on "/news_listing"
    Then I should not get a 404 HTTP response
    And I should not see "Access denied"
    And I should see text matching "Results Found"
    And I should see text "Filter"
