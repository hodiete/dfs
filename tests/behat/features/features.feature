@development @api
Feature: Features
  -Check the existence of features.

# Check to see if Three fields have been added to the contact content type
  Scenario: If I go to the features page, I should see a page.
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/development/features/edit/taxonomies"
    Then I should not get a 404 HTTP response


# Check to see if Features UI detects conflicts/new/missing/changed/moved
  Scenario: If I go to the features page, I should detect feature changes and conflicts.
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/development/features"
    Then I should not see "Conflict"
    And I should not see "Changed"
    And I should not see "Moved"
    And I should not see "New Detected"
    And I should not see "Missing"
