(function ($) {
  Drupal.behaviors.lastUpdated = {
    attach: function (context, settings) {
      // Input fields and elements.
      var lastupdated_date = '#edit-field-webny-event-last-updated-0-value-date';
      var lastupdated_time = '#edit-field-webny-event-last-updated-0-value-time';
      var lastupdated_checkbox = '#edit-field-webny-event-upd-time-value';

      $('#last-updated').once().prepend('<p style="padding:0 1.5em;">Ability to indicate when content was last updated (optional).</p>');

      // if time isn't set, set a default of midnight to pass form validation
      if ($(lastupdated_time).val() === '' && $(lastupdated_date).val() !== '') {
        $(lastupdated_time).val('00:00:00');
      }

      // on load display the time textbox
      if ($(lastupdated_checkbox).is(':checked')) {
        $(lastupdated_time).css('display', 'block');
      } else {
        $(lastupdated_time).css('display', 'none');
      }

      // if checked, toggle the display of the time textbox
      $(lastupdated_checkbox).once().change(function () {
        $(lastupdated_time).toggle();
      });

      // when the value of date changes
      $(lastupdated_date).change(function () {
        // if a value is being added to the date, but the time has no value
        if ($(lastupdated_date).val() !== '' && $(lastupdated_time).val() === '') {
          // set a default value to pass form validation
          $(lastupdated_time).val('00:00:00');
        // if the value of date is being removed
        } else if ($(lastupdated_date).val() === '') {
          // make sure to also update the time to be removed to pass form validation
          $(lastupdated_time).val('');
        }
      });
    }
  };
}(jQuery));