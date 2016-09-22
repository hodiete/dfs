@api
Feature: Features
  -Check the existence of features.

# Check to see if Three fields have been added to the contact content type
  Scenario: If I go to the features page, I should see a page.
    Given I am logged in as a user with the "administrator" role
    When I am on "/admin/config/development/features/edit/taxonomies"
    Then I should not get a 404 HTTP response
