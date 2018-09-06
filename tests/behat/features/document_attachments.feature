@api
Feature: Attached Documents to Nodes
  -Check to see if fields exist for News and Page: 
  -Check if there is a display mode for the document content type called Attached Document 

# Check if fields for Document Attachments, Sub Title, and Title of Inner Page Content Type Exist
  Scenario: See if document attachment fields exist on adding a Page
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_page"
    Then I should not see "You are not authorized to access this page"
    And I should see "Documents Section Title"
    And I should see "Documents Section Sub Title"
    And I should see text matching "Attached Documents"
	And I should not get a 404 HTTP response
	
# Check if fields for Document Attachments, Sub Title, and Title of the News Content Type Exist
  Scenario: See if document attachment fields exist on adding a News Page
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_news"
    Then I should not see "You are not authorized to access this page"
    And I should see "Documents Section Title"
    And I should see "Documents Section Sub Title"
    And I should see text matching "Attached Documents"
	And I should not get a 404 HTTP response	
	
# Check if the display mode Attached Documents exists
  #Scenario: Does Attached Documents display mode exist
    #Given I am logged into the distro with the "administrator" role 
	#When I am on "/admin/structure/display-modes/view/manage/node.attached_documents"
    #Then I should not get a 404 HTTP response
	#When I am on "/admin/structure/types/manage/webny_document/display/attached_documents"
    #Then I should not get a 404 HTTP response
