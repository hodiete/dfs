@api
Feature: Administrator role exists
When I log into the website
As an administrator
I should be able to view user roles that exists

# Check that administrator role exists
  Scenario: An administrative user should be able to view user roles
    Given I am logged in as a user with the "administrator" role
    When I go to "/admin/people/roles"
    Then I should not see "Access denied"
    And I should see "Administrator"
    And I should see "Anonymous user"
    And I should see "Authenticated user"
    And I should see "Media Creator"
    And I should see "Media Manager"
    And I should see "Site Builder"
    And I should see "Site Administrator"
    And I should see "User Administrator"
    And I should see "Content Author"