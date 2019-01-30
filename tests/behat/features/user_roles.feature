@api
Feature: Administrator role exists
When I log into the website
As an administrator
I should be able to view user roles that exists

# Check that administrator role exists
  Scenario: An administrative user should be able to view user roles
    Given I am logged into the distro with the "administrator" role 
    When I go to "/admin/people/roles"
    Then I should not see "You are not authorized to access this page"
    And I should see "Administrator"
    And I should see "Anonymous user"
    And I should see "Authenticated user"

  # the following tests should be uncommented once the behat log in issue is resolved
# Check that Site Admin role has appropriate access
#  Scenario: A site admin user should be able to view blocks but not people
 #   Given I am logged in as a user with the 'site_admin' role
 #   When I go to "/admin/structure/block"
#    Then I should not see "You are not authorized to access this page"
 #   When I go to "/admin/people"
#    Then I should see "You are not authorized to access this page"

# Check that Content Author role has appropriate access
#  Scenario: A content author user should be able to add a news node but not have access to moderation states
 #   Given I am logged in as a user with the 'content_author' role
#    When I go to "/node/add/webny_news"
#    Then I should see "Save and Save as Draft"
 #   When I go to "/admin/structure/workbench-moderation/states"
#    Then I should see "You are not authorized to access this page"

# Check that Workflow Approver role has appropriate access
  # commenting this out until click are supported
#  Scenario: A workflow approver should be able to publish nodes
#    Given I am logged in as a user with the "workflow_approver" role
#    When I go to "/node/add/webny_news"
#    When I click the ".dropbutton-arrow" element
 #   Then I should see "Save and Publish"
