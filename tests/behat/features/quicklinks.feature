@api
Feature: Check for the existence of the quick links display mode and it's use
###########################################################################################################
### QUICK LINKS SQUARE EXIST? ###
# Check for the existence of a the quick links image style
# ROLE: administrator

  Scenario: Determine if the quick links square image style is in the list of styles
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/media/image-styles"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
    Then I should see text matching "Quick Links Square \(100x100\)"

  Scenario: Determine if the quick links square image style page exists and there is a focal point style applied
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/media/image-styles/manage/quick_links_square"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
    Then I should see text matching "Focal Point Scale and Crop 100×100 "
    And I should see text matching "Quick Links Square \(100x100\)"


# Check for the existence of a the quick links image style on each content type display mode for
# Landing Page, Inner Page, Generic Page Content, News Page, Whitelisted Content
# ROLE: administrator

  ### LANDING PAGE ###
  Scenario: Determine if the image style of quick links square is applied to Landing Page Content Type
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_landing_page/display/quick_links_card"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
    Then I should see text matching "Image style: Quick Links Square \(100x100\)"

  ### INNER PAGE ###
  Scenario: Determine if the image style of quick links square is applied to Inner Page Content Type
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_page/display/quick_links_card"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
    Then I should see text matching "Image style: Quick Links Square \(100x100\)"

  ### GENERIC PAGE CONTENT ###
  Scenario: Determine if the image style of quick links square is applied to Generic Page Content Type
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_generic_page/display/quick_links_card"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
    Then I should see text matching "Image style: Quick Links Square \(100x100\)"

  ### NEWS PAGE ###
  Scenario: Determine if the image style of quick links square is applied to News Page Content Type
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_news/display/quick_links_card"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
    Then I should see text matching "Image style: Quick Links Square \(100x100\)"

  ### WHITELISTED PAGE ###
  Scenario: Determine if the image style of quick links square is applied to Whitelisted Page Content Type
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/types/manage/webny_whitelisted_content/display/quick_links_card"
    Then I should not see "Access denied"
    And I should not get a 404 HTTP response
    Then I should see text matching "Image style: Quick Links Square \(100x100\)"
