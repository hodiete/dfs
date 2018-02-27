@api
Feature: Global Navigation Module
  -Check to if the module is enbaled and an admin can go to the configuration page. 

# Check to see if Three fields have been added to the contact content type
  Scenario: If I go to the Global Navigation Page, I should see a few main category fields.
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/webny-globalnav"
    Then I should not see "You are not authorized to access this page"
    #And I should see "Agency name"
	#And I should see "Agency grouping color"
	#And I should see "Global navigation header automatic insertion"
