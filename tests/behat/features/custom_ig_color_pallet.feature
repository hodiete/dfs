@api
Feature: Select Custom IG Color Pallet

Scenario: See if custom IG Color selection shows up in theme settings
  Given I am logged into the distro with the "administrator" role
  When I go to "/admin/appearance/settings/dfs_ny"
  Then I should not see "You are not authorized to access this page"
  And I should see the text "WEBNY THEME"
  When I select "Custom - Inspector General" from "site_color_pallet"
  And I press the "Save configuration" button
  Then I should see "The configuration options have been saved."
