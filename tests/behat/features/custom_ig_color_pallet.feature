@api
Feature: Select Custom IG Color Pallet

Scenario: See if custom IG Color selection shows up in theme settings
  Given I am logged in as a user with the "administrator" role
    When I go to "/admin/appearance/settings/webny_theme"
    Then I should not see "Access denied"
    And I should see the text "WEBNY THEME"
  When I select "Custom - Inspector General" from "site_color_pallet"
  And I press the "Save configuration" button
  Then I should see "The configuration options have been saved."
