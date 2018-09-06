@api
Feature: WebNY Media Transliteration
  -Check that transliteration is enabled for all media.

# Check if option for Tranliteration on media files is checked
  Scenario: See if Transliteration is enabled for all media uploads
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/config/webny_media/configuration"
    Then the "edit-enable-filename-transliteration" checkbox should be checked
