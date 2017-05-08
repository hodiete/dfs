@api
Feature: Login Screen
  -Check to see if the path is /WebNY50

# Does the Rename Admin Path Module Appear and is it set?
  Scenario: See if login path is set to /WebNY50
    When I visit 'WebNY50/login'
    And I fill in "admin " for "name"
    And I fill in "admin" for "pass"
    And I press the "Log in" button
    When I am on "/admin/config/system/rename-admin-paths"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
