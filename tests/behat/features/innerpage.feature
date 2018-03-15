@api
Feature: Innerpage Tests

  Scenario: An administrative user should be able create innerpage content
    Given I am logged into the distro with the "administrator" role 
    When I go to "/node/add/webny_page"
    Then I should not see "the page that you are looking for is not found"
    And I should see the text "Create Page"
    
  Scenario: An administrative user should be able to add to all fields
    Given I am logged into the distro with the "administrator" role 
    When I go to "/node/add/webny_page"
    Then I should see "Page Title"
	Then I should see "Short Title"
    Then I should see "Sub Title"
    Then I should see "Description/Summary"
    Then I should see "Body"
    Then I should see "Image"
    Then I should see "Global Keywords"
    Then I should see "Agency Keywords"
    Then I should see "Documents Section Title"
    Then I should see "Documents Section Sub Title"
    Then I should see "Attached Documents"
    
  Scenario: An administrative user should be able to access the announcements display type
    Given I am logged into the distro with the "administrator" role 
    When I go to "/admin/structure/types/manage/webny_page/display/webny_announcement"
    Then I should not get a 404 HTTP response
    
  Scenario: An administrative user should be able to access the featured card display type
    Given I am logged into the distro with the "administrator" role 
    When I go to "/admin/structure/types/manage/webny_page/display/webny_featured_card"
    Then I should not get a 404 HTTP response

  Scenario: An anonymous user should not be able create innerpage content
    Given I am an Anonymous user 
    When I go to "/node/add/webny_page"
    Then I should see "the page that you are looking for is not found"
