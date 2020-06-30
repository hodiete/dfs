/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {
  $(document).ready(function () {
    $(".select2-selection--multiple").select2({
      placeholder: "Select option(s)",
    });
  });
})(jQuery, Drupal, this);
