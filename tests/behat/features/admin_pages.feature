@api
Feature: Base Admin page tests
  -Check to see if admin has access to important admin pages

# Check Global Nav page access
  Scenario: See if proper access to the Global Nav page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/webny-globalnav"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "GLOBAL HEADER NAVIGATION OPTIONS"

# Check contact page access
  Scenario: See if proper access to the contact page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/content"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "Add content"

# Check feature page access
  Scenario: See if proper access to features page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/development/features"
    Then I should not get a 404 HTTP response
    Then I should not get a 403 HTTP response
    And I should see "Create new feature"

# Check menu page access
  Scenario: See if proper access to menu overview page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/menu"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "Main navigation"

# Check user page access
  Scenario: See if proper access to user page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/people"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "Add user"

# Check moderation states page access
  Scenario: See if proper access to moderation state page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/workbench-moderation/states"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "Add Moderation state"

# Check redirect page access
  Scenario: See if proper access to redirect page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/search/redirect"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "Add redirect"

# Check custom admin theme access - webnycommander
  Scenario: See if proper access to redirect page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/appearance/settings/webnycommander"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "Add redirect"

# Check custom admin theme block access - webnycommander
  Scenario: See if proper access to redirect page exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/block/list/webnycommander"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
    And I should see "Add redirect"
