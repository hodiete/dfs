@api
Feature: Document Content Type Exists
When I log into the website
As an administrator
I should be able to create a document from the Document content type
# Check that administrator role can create document content
  Scenario: An administrative user should be able create document content
    Given I am logged into the distro with the "administrator" role 
    When I go to "/node/add/webny_document"
    Then I should not see "You are not authorized to access this page"
    And I should see the text "Create Document"
    
    
# Check that an anonymous user cannot create a document
  Scenario: An anonymous user should not be able to create a document
    Given I am not logged in
    When I go to "/node/add/webny_document"
    Then I should see "You are not authorized to access this page"
    
# Check that the Document Content type contains the appropriate fields
  Scenario: An administrative user should be able to see all the fields of the content type
    Given I am logged into the distro with the "administrator" role 
    When I go to "/node/add/webny_document"
    Then I should see "Document Title"
    And I should see "Description"
    And I should see "Subtitle"
    And I should see "File Upload"
    And I should see "External Link"
    And I should see "Agency Keyword"
    And I should see "Global Keyword"
    And I should see "Document Category"
    And I should see "Date"
    And I should see "Last Updated"
    And I should see "Language"
    And I should see "Filter Terms"

# Document Paragraph Type display
# Check for the display Mode GENERIC
  Scenario: Does the generic display mode exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_documents/display/generic"
    Then I should not get a 404 HTTP response

# Check the backend display form. The Generic form should be enabled for content authors
  Scenario: Does the generic display form exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_documents/form-display/generic_form"
    Then I should not get a 404 HTTP response

# Check if option for basic and full text format's are checked for the description field
  Scenario: See if Transliteration is enabled for all media uploads
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_document/fields/node.webny_document.body"
    Then the "edit-third-party-settings-allowed-formats-basic-html" checkbox should be checked
    And the "edit-third-party-settings-allowed-formats-full-html" checkbox should be checked

# Check if option for basic and full text format's are checked for the subtitle
  Scenario: See if Transliteration is enabled for all media uploads
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_document/fields/node.webny_document.field_webny_document_subtitle"
    Then the "edit-third-party-settings-allowed-formats-basic-html" checkbox should be checked
    And the "edit-third-party-settings-allowed-formats-full-html" checkbox should be checked
