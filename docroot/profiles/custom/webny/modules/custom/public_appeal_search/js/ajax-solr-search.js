(function ($, Drupal, window, document) {
  function showPopup(name) {
    alert(Drupal.t("Hello @name", { "@name": name }));
  }

  // Create the callback for the command we used in our ajax response
  Drupal.AjaxCommands.prototype.formPopupTriggerPopup = function (ajax, response) {
    // response.name contains the value the user submitted in the form.
    // We will pass this to our function showPopup, so it can be shown in the popup.
    //console.log("test");
    showPopup(response.name);
  };
})(jQuery, Drupal, this);