<?php

namespace Drupal;

use Drupal\DrupalExtension\Context\RawDrupalContext;
use Behat\Behat\Context\SnippetAcceptingContext;

/**
 * FeatureContext class defines custom step definitions for Behat.
 */
class FeatureContext extends RawDrupalContext implements SnippetAcceptingContext {

  /**
   * Initializes context.
   *
   * Every scenario gets its own context instance.
   * You can also pass arbitrary arguments to the
   * context constructor through behat.yml.
   */
  public function __construct() {

  }

  /**
   * @Then /^I should see in the header "([^"]*)":"([^"]*)"$/
   */
  public function iShouldSeeInTheHeader($header, $value)
  {
    $headers = $this->getSession()->getResponseHeaders();
    if (array_key_exists($header, $headers)){
      if ($headers[$header][0] != $value) {
        throw new \Exception(sprintf("Did not see %s with value %s.", $header, $value));
      }
    }else{
      throw new \Exception(sprintf("Did not see %s with value %s.", $header, $value));
    }
  }
}
