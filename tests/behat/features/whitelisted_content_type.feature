@api
Feature: Whitelist Exists
When I log into the website
As an administrator
I should be able to create whitelisted content

  Scenario: An administrative user should be able create whitelisted content
    Given I am logged in as a user with the administrator role
    When I go to "/node/add/webny_whitelisted_content"
    Then I should not see "Access denied"
    And I should see the text "Create Whitelisted Content"


