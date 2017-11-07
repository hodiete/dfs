@api
Feature: Secondary Navigation Module
  -Check to if the module is enabled. An admin or site builder should have access to this module settings.

  Scenario: If I go to the Secondary Navigation Page, Three Main Sections Should be Displayed.
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/webny/secondary-navigation"
    Then I should not see "Access denied"

  Scenario: If I go to the Secondary Navigation Page, Three Main Sections Should be Displayed.
    Given I am logged into the distro with the "site_builder" role
    When I am on "/admin/config/webny/secondary-navigation"
    Then I should not see "Access denied"

  Scenario: Determine if the secondary navigation block is placed.
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/block/list/webny_theme"
    Then I should see text matching "Secondary Navigation Block"
