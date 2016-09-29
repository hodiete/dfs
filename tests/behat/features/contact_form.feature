@api
Feature: Contact Form Tests

  Scenario: An administrator user should be able to access the contact form results
    Given I am logged in as a user with the "administrator" role
    When I go to "/admin/structure/contact/messages"
    Then I should not see "Access denied"

  Scenario: An anonymous user should be able to access the contact form 
    Given I am an anonymous user
    When I go to "/contact/contact_form"
    Then I should not see "Access denied"