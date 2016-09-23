@api
Feature: Sitemap Tests

  Scenario: An authenticated user should be able to access the sitemap page
    Given I am logged in as a user with the authenticated role
    When I go to "/sitemap"
    Then I should not see "Access denied"

  Scenario: An authenticated user should be able to access the sitemap.xml page
    Given I am logged in as a user with the authenticated role
    When I go to "/sitemap.xml"
    Then I should not get a 404 HTTP response

  Scenario: An anonymous user should be able to access the sitemap page
    Given I am an anonymous user
    When I go to "/sitemap"
    Then I should not see "Access denied"

  Scenario: An anonymous user should be able to access the sitemap.xml page
    Given I am an anonymous user
    When I go to "/sitemap.xml"
    Then I should not get a 404 HTTP response
 