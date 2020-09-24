(function ($) {
  Drupal.behaviors.dateTimeCombine = {
    attach: function (context, settings) {
      // Input fields and elements.
      var start_date_value = '#edit-field-webny-event-date-start-0-value-date';
      var start_time_value = '#edit-field-webny-event-date-start-0-value-time';
      var end_date_value = '#edit-field-webny-event-date-end-0-value-date';
      var end_time_value = '#edit-field-webny-event-date-end-0-value-time';
      var start_fieldset = '#edit-field-webny-event-date-start-0 .fieldset-wrapper';
      var end_value_fields = '#edit-field-webny-event-date-end-0-value';
      var date_to_divider = '<span class="date-to-divider">to</span>';
      var all_day_checkbox = '#edit-field-webny-event-all-day-value';
      // Random date for hour comparisons.
      var rand_date_prefix = '2017-01-01T';

      // Move end date into start date fieldset.
      /*
      $(start_fieldset).closest('fieldset').find('legend span').text('DATE');
      $(end_time_value).closest('fieldset').hide();
      $(end_value_fields + ' ' + end_time_value).prependTo(end_value_fields);
      $(date_to_divider).prependTo(end_value_fields);
      $(end_value_fields).appendTo(start_fieldset);
      */

      // All day toggle.
      $(all_day_checkbox).change(function () {
        $(start_time_value).toggle(!this.checked);
        $(end_time_value).toggle(!this.checked);
        // All day, so set time to 12am-11:59pm.
        if (this.checked) {
          $(start_time_value).val('00:00');
          $(end_time_value).val('23:59:59');
        }
      }).change();

      // Force end date to greater than from date.
      $(start_date_value).focusout(function () {
        var start_date = new Date($(start_date_value).val());
        var end_date = new Date($(end_date_value).val());
        if (start_date > end_date) {
          $(end_date_value).val($(start_date_value).val());
        }
      });
      $(end_date_value).focusout(function () {
        var start_date = new Date($(start_date_value).val());
        var end_date = new Date($(end_date_value).val());
        if (end_date < start_date) {
          $(start_date).val($(end_date_value).val());
        }
      });
      // Force end time to greater than from time.
      $(start_time_value).focusout(function () {
        var start_time = new Date(rand_date_prefix + $(start_time_value).val());
        var end_time = new Date(rand_date_prefix + $(end_time_value).val());
        //console.log($(start_time_value).val());
        if (start_time > end_time) {
          $(end_time_value).val($(start_time_value).val());
        }
      });
      $(end_time_value).focusout(function () {
        var start_time = new Date(rand_date_prefix + $(start_time_value).val());
        var end_time = new Date(rand_date_prefix + $(end_time_value).val());
        if (end_time < start_time) {
          $(start_time_value).val($(end_time_value).val());
        }
      });
    }
  };
}(jQuery));
