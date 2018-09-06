@api
Feature: Sitemap Tests

  Scenario: An administrator user should be able to access the sitemap page
    Given I am logged into the distro with the "administrator" role 
    When I go to "/sitemap"
    Then I should not see "You are not authorized to access this page"

  Scenario: An administrator user should be able to access the sitemap.xml page
    Given I am logged into the distro with the "administrator" role 
    When I go to "/sitemap.xml"
    Then I should not get a 404 HTTP response

  Scenario: An anonymous user should be able to access the sitemap page
    Given I am an anonymous user
    When I go to "/sitemap"
    Then I should not see "You are not authorized to access this page"

  Scenario: An anonymous user should be able to access the sitemap.xml page
    Given I am an anonymous user
    When I go to "/sitemap.xml"
    Then I should not get a 404 HTTP response
 