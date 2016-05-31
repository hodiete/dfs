@api
Feature: Document Content Type Exists
When I log into the website
As an administrator
I should be able to create a document from the Document content type
# Check that administrator role can create document content
  Scenario: An administrative user should be able create document content
    Given I am logged in as a user with the administrator role
    When I go to "/node/add/webny_document"
    Then I should not see "Access denied"
    And I should see the text "Create Document"
    
    
# Check that an anonymous user cannot create a document
  Scenario: An anonymous user should not be able to create a document
    Given I am not logged in
    When I go to "/node/add/webny_document"
    Then I should see a "Access denied"
    
# Check that the Document Content type contains the appropriate fields
  Scenario: An administrative user should be able to see all the fields of the content type
    Given I am logged in as a user with the administrator role
    When I go to "/node/add/webny_document"
    Then I should see "Document Title"
    And I should see "Body"
    And I should see "Subtitle"
    And I should see "File Upload"
    And I should see "Agency Keyword"
    And I should see "Global Keyword"
    And I should see "Document Category"
    And I should see "Date"
    And I should see "Last Updated"
    And I should see "Language"