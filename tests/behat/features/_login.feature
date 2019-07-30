@api
Feature: Login Screen
  -Check to see if the path is //WebNY50

# Does the Rename Admin Path Module Appear and is it set?
  Scenario: See if login path is set to /WebNY50
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/system/rename-admin-paths"
    Then I should not see "You are not authorized to access this page"
    And I should not get a 404 HTTP response
