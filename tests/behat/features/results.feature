@api
Feature: Results Listing Tests
  -Check to see if news listing page exists
  

# Check News Listing Exists
  Scenario: See if Add Announcement button and fields exist
    Given I am an anonymous user
    When I am on "/news_listing"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see text matching "Results Found"
    And I should see text matching "Filter"
