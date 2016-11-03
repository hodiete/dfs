@api
Feature: Varnish Cache Clearing
  -Check to make sure the Varnish is behaving as expected

# Check that varnish is up and running
  Scenario: See if proper header value is returned
    Given I am an anonymous user
    When I am on "/"
    Then I should see in the header "Via":"1.1 varnish"
