(function ($) {
  Drupal.behaviors.lastUpdated = {
    attach: function (context, settings) {
      // Input fields and elements.
      var lastupdated_date = '#edit-field-webny-event-last-updated-0-value-date';
      var lastupdated_time = '#edit-field-webny-event-last-updated-0-value-time';
      var lastupdated_checkbox = '#edit-field-webny-event-upd-time-value';

      if ($(lastupdated_time).val() === '') {
        $(lastupdated_time).val('00:00:00');
      }

      // on load display the time textbox
      if ($(lastupdated_checkbox).is(':checked')) {
        $(lastupdated_time).css('display', 'block');
      } else {
        $(lastupdated_time).css('display', 'none');
      }

      // if checked, toggle the display of the time textbox
      $(lastupdated_checkbox).change(function () {
        $(lastupdated_time).toggle();
      });
    }
  };
}(jQuery));