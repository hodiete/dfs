@api
Feature: Contibuted Modules Test
  -Check each contributed module for it's existence and if it is enabled where applicable.

# =======================================================================================
# CONTRIB MODULE TESTS

# =======================================================================================
### CHECK FOR THE EXISTENCE OF WEB FORMS MAIN UI FORM ###
# MODULE NAME: Webforms - MACHINE_NAME: webform
# ROLE: administrator
  Scenario: Check if the YAML Form module is installed
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/modules"
    And I should see text matching "Webform"
    And I should see text matching "Webform Node"
    And I should see text matching "Webform UI"

# CHECK TO ENSURE THE YAML FORM MODULE IS ENABLED
  Scenario: Check if the Webform module is enabled
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/webform"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"