@api
Feature: Announcement Highlight Paragraph Tests
  -Check to see if Announcements exists on Landing Page Content Types
  -Check if display modes are present on News/InnerPage/Landing
  -Create a Landing Page with an Announcement Highlight -- Check

# Check if fields for Announcement Exist
  Scenario: See if Add Announcement button and fields exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_landing_page"
    Then I should not see "You are not authorized to access this page"
    When I press the "Add Announcement" button
    Then I should see "Announcement Title"
    And I should see "Announcement Headline"
    And I should see text matching "Announcement Entity Reference"
    And I should see the heading "Frames of Content"

# Display modes checks
  Scenario: Check the display modes to see if Announcement display exists
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_landing_page/display/webny_announcement"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/types/manage/webny_news/display/webny_announcement"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/types/manage/webny_page/display/webny_announcement"
    Then I should not get a 404 HTTP response
    When I am on "/admin/structure/types/manage/webny_whitelisted_content/display/webny_announcement"
    Then I should not get a 404 HTTP response

# Create a Landing Page with specific fields for Announcements
#  Scenario: Check if there are 6 entity references
#    Given I am logged in as a user with the administrator role
#    And I am on /node/add/webny_landing_page:
#      | title  | Summary/Teaser | Announcement Title | Announcement Headline | Announcement Entity Reference | Announcement Entity Reference | Announcement Entity Reference | Announcement Entity Reference | Announcement Entity Reference | Announcement Entity Reference |
#     | Page One Test Content | This summary body | This Title One | This headline One                       | g                             | g                             | homepage                      | services                      | g                             | g                             |
#    When I go to "admin/content"
#    Then I should see "Page One"
