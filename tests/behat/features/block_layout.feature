@api
Feature: Block Layout Config
  -Check to see that Page Title block no longer exists

# Check to see that Page Title block no longer exists
  Scenario: If I go to the Block Layout page, I should not see a Page Title block.
    Given I am logged into the distro with the "administrator" role
    When I am on "admin/structure/block"
    Then I should not see "Page Title"
    