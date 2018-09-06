@varnish @api
Feature: Varnish Cache Clearing
  -Check to make sure the Varnish is behaving as expected

  # Check that varnish is up and running
  Scenario: See if proper header value is returned
    Given I am an anonymous user
    When I am on "/"
#    Then I should see in the header "Via":"1.1 varnish"
#
#
#  Scenario: Create and News node with fields
#    Given I am viewing an "webny_news" content:
#    | title | My article with fields! |
#    | body  | A placeholder           |
#    | field_webny_news_short_title | Behat |
#    Then I should see the heading "My article with fields!"
#    And I should see the text "A placeholder"
#    Then I should see in the header "X-Cache":"MISS"
#    When I reload the page
#    Then I should see in the header "X-Cache":"HIT"
#    Then I want the varnish cache to go the way of the dinosaurs