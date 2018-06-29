(function ($) {
  Drupal.behaviors.lastUpdated = {
    attach: function (context, settings) {
      // Input fields and elements.
      var lastupdated_date = '#edit-field-webny-event-last-updated-0-value-date';
      var lastupdated_time = '#edit-field-webny-event-last-updated-0-value-time';
      var lastupdated_checkbox = '#edit-field-webny-event-upd-time-value';

      if ($(lastupdated_checkbox).checked) {
        $(lastupdated_time).css('display', 'block');
      } else {
        $(lastupdated_time).css('display', 'none');
      }

      $(lastupdated_checkbox).change(function () {
        $(lastupdated_time).toggle();
        /*if ($(lastupdated_checkbox).checked) {
          $(lastupdated_time).css('display', 'block');
        } else {
          $(lastupdated_time).css('display', 'none');
        }*/
      });
    }
  };
}(jQuery));