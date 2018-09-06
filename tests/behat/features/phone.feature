@api
Feature: Phone Paragraph Type
  -Check to see if two (2) fields have been added to the phone paragraph type

# Check to see if Three fields have been added to the contact content type
  Scenario: If I go to the phone paragraph type, I should see Two (2) new fields
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/paragraphs_type/webny_phone_contact/fields"
    Then I should not see "You are not authorized to access this page"
    And I should see text matching "Phone Label"
    And I should see text matching "Phone Number"
