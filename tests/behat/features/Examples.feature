@javascript
Feature: Selenium Test
  In order to test if Selenium is working
  As a user
  I need to be able to load the homepage

  Scenario: Load a page
    Given I am on "/"
    Then I should not see the text "Subscribe to"

# @todo Add @api example.
