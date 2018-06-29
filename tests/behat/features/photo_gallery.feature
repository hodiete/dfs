@api
Feature: Photo Gallery Frame
  -Check photo gallery displays and general page for proof of existence

# Check and ensure the gallery has been added to the landing page
  Scenario: If I go to the landing page content type, I should see a paragraph frame for add a gallery
    Given I am logged into the distro with the "administrator" role
    When I am on "/node/add/webny_landing_page"
    Then I should not see "You are not authorized to access this page"
    And I should see text matching "Add Gallery"

# Check admin pages for gallery
  Scenario: Check displays and existence of gallery in admin pages
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/paragraphs_type"
    And I should see "Gallery"

    When I am on "/admin/structure/paragraphs_type/webny_gallery/fields"
    Then I should not get a 404 HTTP response
    And I should see "Description"
    And I should see "Headline"
    And I should see "Image Description"
    And I should see "Images"
    And I should see "Title"

    When I am on "/admin/structure/paragraphs_type/webny_gallery/form-display"
    Then I should not get a 404 HTTP response

    When I am on "/admin/structure/paragraphs_type/webny_gallery/display"
    Then I should not get a 404 HTTP response
