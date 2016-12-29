@api
Feature: Contibuted Modules Test
  -Check each contributed module for it's existence and if it is enabled where applicable.

# =======================================================================================
# CONTRIB MODULE TESTS

# =======================================================================================
### CHECK FOR THE EXISTENCE OF YAML FORMS MAIN UI FORM ###
# MODULE NAME: YAML Forms - MACHINE_NAME: yamlform
# ROLE: administrator
Scenario: Check if the YAML Form module is installed
Given I am logged in as a user with the administrator role
When I am on "/admin/modules"
And I should see text matching "YAML Form"
And I should see text matching "YAML Form Node"
And I should see text matching "YAML Form UI"

# CHECK TO ENSURE THE YAML FORM MODULE IS ENABLED
Scenario: Check if the YAML Form module is enabled
Given I am logged in as a user with the administrator role
When I am on "/admin/structure/yamlform"
Then I should not get a 404 HTTP response
And I should not see "Access denied"