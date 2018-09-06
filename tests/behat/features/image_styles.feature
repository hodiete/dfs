@api
Feature: Image style Tests
  -Check to see that webny image styles are present
  -Check to see that webny responsive image styles are present
  -Check to see that webny image view modes are present
  -Check to see that webny image media bundles are present
  -Check to see that the Media Embed button has wysiwyg image styles applied

# Check WebNY Image Styles are present
  Scenario: See if WebNY custom image styles exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/media/image-styles"
    Then I should see "Bio Frame (286×264)"
    And I should see "Card horizontal (225x225)"
    And I should see "Card vertical (400x225)"
    And I should see "Category Tiles Desktop (1600x 730)"
    And I should see "Category Tiles Mobile (461x 730)"
    And I should see "Category Tiles Tablet (768x 730)"
    And I should see "Large (480×480)"
    And I should see "Media Image"
    And I should see "Media thumbnail (241x138)"
    And I should see "Medium (220×220)"
    And I should see "mobile lead (320x256)"
    And I should see "narrow lead (768x307)"
    And I should see "Quick Links Square (100x100)"
    And I should see "Results (240x240)"
    And I should see "Teaser"
    And I should see "Thumbnail (100×100)"
    And I should see "wide lead (1280x427)"
    And I should see "wide lead tall (1280x512)"
    And I should see "wysiwyg (660x400)"
    And I should see "wysiwyg portrait (300x300)"

# Check WebNY Responsive Image Styles are present
  Scenario: See if WebNY custom responsive image styles exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/config/media/responsive-image-style"
    Then I should see "Bio Frame"
    And I should see "Cards"
    And I should see "Category Tiles"
    And I should see "Hero image"
    And I should see "Hero image tall"
    And I should see "Results Image"
    And I should see "wysiwyg"

# Check WebNY Media Display Mode Views are present
  Scenario: See if WebNY custom media display mode views exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/display-modes/view"
    Then I should see "Bio Frame"
    And I should see "Cards"
    And I should see "Category Tiles"
    And I should see "Embedded"
    And I should see "Hero image"
    And I should see "Hero image tall"
    And I should see "Media Library"
    And I should see "Results image"
    And I should see "Thumbnail"
    And I should see "Token"
    And I should see "wysiwyg"
    And I should see "wysiwyg portrait"

# Check WebNY Media Bundles for Image displays are present
  Scenario: See if WebNY custom media bundles for image displays exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/media/manage/image/display"
    Then I should see "Bio Frame"
    And I should see "Cards"
    And I should see "Category Tiles"
    And I should see "Embedded"
    And I should see "Hero image"
    And I should see "Hero image tall"
    And I should see "Media Library"
    And I should see "Results image"
    And I should see "Thumbnail"
    And I should see "wysiwyg"
    And I should see "wysiwyg portrait"

# Check WebNY Bio Frame Image display is present
  Scenario: See if WebNY Bio Frame Image display exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/media/manage/image/display/bio_frame"
    Then I should see "Bio Frame"
    And I should see "Image style: Bio Frame (286×264)"

# Check WebNY Cards Image display is present
  Scenario: See if WebNY Cards Image display exist
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/media/manage/image/display/cards"
    Then I should see "Cards"
    And I should see "Responsive image style: cards"

# Check WebNY Embedded Image display is present
  Scenario: See if WebNY Embedded Image display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/embedded"
    Then I should see "Embedded"
    And I should see "Original image"

# Check WebNY Hero Image display is present
  Scenario: See if WebNY Hero Image display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/hero_image"
    Then I should see "Hero image"
    And I should see "Responsive image style: Hero image"

# Check WebNY Hero Image Tall display is present
  Scenario: See if WebNY Hero Image Tall display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/hero_image_tall"
    Then I should see "Hero image tall"
    And I should see "Responsive image style: Hero image tall"

# Check WebNY Media Library Image display is present
  Scenario: See if WebNY Media Library Image display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/media_library"
    Then I should see "Media Library"
    And I should see "Image style: Medium (220×220)"

# Check WebNY Results Image display is present
  Scenario: See if WebNY Results Image display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/results_image"
    Then I should see "Results image"
    And I should see "Responsive image style: Results Image"

# Check WebNY Thumbnail Image display is present
  Scenario: See if WebNY Thumbnail Image display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/thumbnail"
    Then I should see "Thumbnail"
    And I should see "Image style: Media thumbnail (241x138)"

# Check WebNY wysiwyg Image display is present
  Scenario: See if WebNY wysiwyg Image display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/wysiwyg"
    Then I should see "wysiwyg"
    And I should see "Image style: wysiwyg (660x400)"
    And I should see "Responsive image style: wysiwyg"

# Check WebNY wysiwyg portrait Image display is present
  Scenario: See if WebNY wysiwyg portrait Image display exist
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/structure/media/manage/image/display/wysiwyg_portrait"
    Then I should see "wysiwyg portrait"
    And I should see "Image style: wysiwyg portrait (300x300)"
    And I should see "Breakpoints: none"

# Check that Media Embed button has wysiwyg image styles applied
  Scenario: Check the Media Embed button to see that the wysiwyg image styles are applied
    Given I am logged into the distro with the "administrator" role 
    When I am on "/admin/config/content/embed/button/manage/media"
    Then I should see "wysiwyg"
    And I should see "wysiwyg portrait"

# Check that WebNY Category Tiles Image display is present
  Scenario: Check the Media Embed button to see that the wysiwyg image styles are applied
    Given I am logged into the distro with the "administrator" role
    When I am on "/admin/structure/media/manage/image/display/category_tiles"
    Then I should see "Image style: Media Image"
    And I should see "Thumbnail style: Thumbnail (100×100)"
    And I should see "Responsive image style: category_tiles"
