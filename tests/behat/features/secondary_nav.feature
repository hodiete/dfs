@api
Feature: Secondary Navigation Module
  -Check to if the module is enabled. An admin or site builder should have access to this module settings.

  Scenario: If I go to the Secondary Navigation Page, Three Main Sections Should be Displayed.
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/webny/secondary-navigation"
    Then I should not see "You are not authorized to access this page"

  Scenario: If I go to the Secondary Navigation Page, Three Main Sections Should be Displayed.
    Given I am logged into the distro with the "site_builder" role
    When I am on "/admin/config/webny/secondary-navigation"
    Then I should not see "You are not authorized to access this page"