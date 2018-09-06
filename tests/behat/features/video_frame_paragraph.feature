@api 
Feature: Video Frame Tests

  Scenario: Check that all required Video fields are available
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_landing_page"
    Then I should not see "You are not authorized to access this page"
    When I press the "Add Video" button
    #title field - Need to use css selector because we use the generic text "Title" for the label
    Then I should see an ".form-item-field-webny-landing-paragraph-0-subform-field-webny-landing-pg-vid-title-0-value" element
    #headline - Need to use css selector because we use the generic text "Headline" for the label
    And I should see an ".form-item-field-webny-landing-paragraph-0-subform-field-webny-landing-pg-vid-hdlin-0-value" element
    #description - Need to use css selector because we use the generic text "Description" for the label
    And I should see an ".form-item-field-webny-landing-paragraph-0-subform-field-webny-lndng-pg-vid-descrip-0-value" element
    And I should see "Video URL"
    And I should see "Poster Image"
    And I should see "Poster Caption"

  Scenario: Adding a Youtube Video
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_landing_page"
    When I press the "Add Video" button
    And I fill in "Youtube: FANCY PANTS MCGEE" for "Landing Page Title"
    And I fill in "SUPER FANCY DESCRIPTION" for "Summary/Description"
    And I fill in "https://www.youtube.com/watch?v=WTWdP5DMdsM" for "Video URL"
    And I click the ".button.button--primary.js-form-submit.form-submit" element
    Then I should see "Landing Page Youtube: FANCY PANTS MCGEE has been created."

  Scenario: Adding a Vimeo Video
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_landing_page"
    When I press the "Add Video" button
    And I fill in "Vimeo: FANCY PANTS MCGEE" for "Landing Page Title"
    And I fill in "SUPER FANCY DESCRIPTION" for "Summary/Description"
    And I fill in "https://vimeo.com/148198462" for "Video URL"
    And I click the ".button.button--primary.js-form-submit.form-submit" element
    Then I should see "Landing Page Vimeo: FANCY PANTS MCGEE has been created."

  Scenario: Adding a Brightcove Video
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_landing_page"
    When I press the "Add Video" button
    And I fill in "Brightcove: FANCY PANTS MCGEE" for "Landing Page Title"
    And I fill in "SUPER FANCY DESCRIPTION" for "Summary/Description"
    And I fill in "http://players.brightcove.net/2886492229001/default_default/index.html?videoId=5071022272001" for "Video URL"
    And I click the ".button.button--primary.js-form-submit.form-submit" element
    Then I should see the text "Landing Page Brightcove: FANCY PANTS MCGEE has been created."

  Scenario: Optional Fields Video Title, Video Headline, Video Description, Poster Image
    Given I am logged into the distro with the "administrator" role 
    When I am on "/node/add/webny_landing_page"
    When I press the "Add Video" button
    And I fill in "test-page-12" for "Landing Page Title"
    And I fill in "SUPER FANCY DESCRIPTION" for "Summary/Description"
    And I fill in "Great Title - … uh, yahhh…" for "Video Title"
    And I fill in "Great Headline - … uh, yahhh…" for "Video Headline"
    And I fill in "Great Description - … uh, yahhh…" for "Video Description"
    And I fill in "https://www.youtube.com/watch?v=WTWdP5DMdsM" for "Video URL"
    # Commenting out image tests because running into selenium JS issues w/ chrome driver
    #And I attach the file "drupal.png" to "Poster Image"
    #And I wait for AJAX to finish
    #And I enter "Drupal" for "Media name"
    #And I enter "drupal image alt" for "Alternative text"
    #And I enter "drupal image title" for "Title"
    And I press "Save and Save as Draft"
    Then I should see "Great Title"
    Then I should see "Great Headline"
    Then I should see "Great Description"
    #Then I should see an ".vjs-poster" element



  #TODO: Check that multiple videos can get added - too difficult to target elements in dom right now