@api
Feature: What's Related Frame Paragraph Tests
   - Check to see if What's Related Frame exists on Generic Page
   - Check to see if What's Related Frame can be added to a Generic Page


# Check if option for What's Related Frame exists on a Generic Page Content Type
  Scenario: See if What's Related Frame exists on the Generic Page content type
     Given I am logged into the distro with the "administrator" role
     When I am on "/admin/structure/types/manage/webny_generic_page/fields/node.webny_generic_page.field_webny_gencp_contentsect"
     Then I should not see "You are not authorized to access this page"
     And I should see "What's Related"

# Check if What's Related button appears on Generic Content type
  Scenario: See if What's Related button appears on Generic Content type page
   Given I am logged into the distro with the "administrator" role
   When I am on "/node/add/webny_generic_page"
   Then I should not see "You are not authorized to access this page"
   And I should see "Related"

# Check if What's Related frame can be added to a Generic Page
  Scenario: See if What's Related frame can be added to a Generic Page
  Given I am logged into the distro with the "administrator" role
  When I am on "/node/add/webny_generic_page"
  Then I should see "Related"
  # And I should see "Add Section to Table of Contents"
  # And I should see "Title"
  # And I should see "Related Links"
  # And I should see "URL"
  # And I should see "Link text"

