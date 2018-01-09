<?php

namespace Drupal\webny\TwigExtension;


class TwigTrimCardTitle extends \Twig_Extension {

  /**
  * Trims text to fit on a card.
  */
  public function getFilters() {
    return [
      new \Twig_SimpleFilter('webny_trim_card_title', [$this, 'trimCardTitle']),
    ];
  }

  /**
  * Gets a unique identifier for this Twig extension.
  */
  public function getName() {
    return 'webny_trim_card_title';
  }

  /**
  * Trims the card title
  */
  public static function trimCardTitle($string) {
    $target_length = 65;

    if (strlen($string) <= $target_length){
      return $string;
    }

    // Cut off the string to the desired length.
    // We add 1 in case our string is the perfect length. In this case the last character will be a space.
    $output = substr($string, 0, $target_length + 1);

    // Look for the last space character and trim to there so words are not cut off.
    $output = substr($output, 0, strrpos($output, ' '));

    return $output . " ...";
  }
}
