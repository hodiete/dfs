@webny @media @api
Feature: Image media creation

  @javascript
  Scenario: Creating an image with the media creator role
    Given I am logged into the distro with the "media_manager" role
    When I visit "/media/add/image"
    And I attach the file "drupal.png" to "Image"
    And I wait for AJAX to finish
    And I enter "Drupal" for "Media name"
    And I enter "drupal image alt" for "Alternative text"
    And I enter "drupal image title" for "Title"
    And I wait 15 seconds
    And I press "Save and publish"
    # Queue the image for deletion now so it will be deleted even if the
    # test fails.
    And I queue the latest media entity for deletion
    Then I should be visiting a media entity
    And I should see "Drupal"
