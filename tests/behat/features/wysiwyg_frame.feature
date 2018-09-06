@api
Feature: WYSIWYG Frame Paragraph Tests
  -Check to see if WYSIWYG can be added to Landing Page Content Types
  -Check if WYSIWYG paragraph type is option on Landing Page nodes
  -Create a Landing Page with a WYSIWYG Frame -- Check

# Check if option for WYSIWYG Frame exists
  Scenario: See if WYSIWYG checkbox on Landing Page Content Type exists
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/types/manage/webny_landing_page/fields/node.webny_landing_page.field_webny_landing_paragraph"
    Then I should not see "You are not authorized to access this page"
    # Given I check the box "WYSIWYG"
    # When I press the "Save" button
    # When I am on "/node/add"
    # Then I should see "Landing Page"
    # When I click "Landing Page"
    # Then I should see "Add Summary"

# Paragraph type checks
  Scenario: Check the paragraphy type to see if the WYSIWYG Frame exists
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype/fields"
    Then I should see "Title"
    And I should see "Add Section to Table of Contents"
    And I should see "Headline"
    And I should see "WYSIWYG Body"
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype/display"
    Then I should not get a 404 HTTP response

# Check for the display Mode GENERIC for WYSIWYG
  Scenario: Does the generic display mode exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype/display/generic"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"

# Check the backend display form. The Generic form should be enabled
  Scenario: Does the generic display form exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/paragraphs_type/webny_wysiwyg_pgtype/form-display/generic_form"
    Then I should not get a 404 HTTP response
    And I should not see "You are not authorized to access this page"
