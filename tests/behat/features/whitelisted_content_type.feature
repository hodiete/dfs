@api
Feature: Whitelist Exists
When I log into the website
As an administrator
I should be able to create whitelisted content
# Check that administrator role can create whitelisted content
  Scenario: An administrative user should be able create whitelisted content
    Given I am logged into the distro with the "administrator" role 
    When I go to "/node/add/webny_whitelisted_content"
    Then I should not see "the page that you are looking for is not found"
    And I should see the text "Create Whitelisted Content"
    
# Check that an anonymous user cannot create whitelisted content
  Scenario: An anonymous user should not be able to create whitelisted content
    Given I am not logged in
    When I go to "/node/add/webny_whitelisted_content"
    Then I should see "the page that you are looking for is not found"
    
# Check that the Whitelisted Content type contains the appropriate fields
  Scenario: An administrative user should be able to see all the fields of the content type
    Given I am logged into the distro with the "administrator" role 
    When I go to "/node/add/webny_whitelisted_content"
    Then I should see "Title"
    And I should see "Description"
    And I should see "Date"
    And I should see "URL"
    And I should see "Link text"
    And I should see "Image"
    And I should see "Agency Keyword"
    And I should see "Global Keyword"
    And I should see "Filter Terms"
  
# Check that the Whitelisted Content Display Mode exists
  Scenario: An administrative user should be able to see the Display Mode for Whitelisted Content
  Given I am logged into the distro with the "administrator" role 
  When I go to "/admin/structure/types/manage/webny_whitelisted_content/display"
  Then I should not see "the page that you are looking for is not found"