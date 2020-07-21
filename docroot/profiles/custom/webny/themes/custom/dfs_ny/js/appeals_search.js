/**
 * @file
 * card paragraph javascript file.
 */


(function ($, Drupal, window, document, debounce) {

  Drupal.behaviors.appealsSearch = {
    attach: function (context, settings) {

      //override placeholder text on external filters
      function setFilterPlaceholders() {
        $(
          "#block-exposedformpublic-appeal-searchpublic-appeals-search-page select"
        ).each(function () {
          //add placeholders
          $(this).attr(
            "data-placeholder",
            "Select " + $(this).prev("label").text()
          );
        });

        if (
          $(".chosen-container").length > 0 &&
          $(".chosen-container label").length < 1
        ) {
          //add labels to Chosen module input fields
          $(".chosen-container input").each(function () {
            $(this).attr(
              "id",
              $(this)
                .closest(".js-form-type-select")
                .find("label")
                .attr("for") + "-input"
            );
            $(this).before(
              '<label for="' +
                $(this)
                  .closest(".js-form-type-select")
                  .find("label")
                  .attr("for") +
                '-input">' +
                $(this).closest(".js-form-type-select").find("label").text() +
                "</label>"
            );
            $(this).prev("label").addClass("chosen-label");
          });
        }
      }

      setFilterPlaceholders();

      // function countersToggle(){
      //   // hide appeal decision totals with zero results
      //   $('.public-appeal-search-view .counters .counters-inner li').each(function(){
      //     $(this).show();
      //     var thiscountervalue = $(this).find($('span.field-content div span')).text();
      //     if (thiscountervalue == 0){
      //       $(this).hide();
      //     }
      //   });
      // }

      // countersToggle();

      //build summary and references accordion
      function formatAccordionsRow(tablecol,colcontent,thistablerow){
        var thisRowString = '';
        var tablecolclass = tablecol.toLowerCase();
        thisRowString += '<tr class="'+tablecolclass+' accordion-row ' + thistablerow + '">';
        thisRowString += '<td colspan="10"><table><thead><tr><th>' + tablecol + '</th></tr></thead>';
        thisRowString += '<tbody><tr><td><div class="accordion"><a class="accordion-toggle ' + thistablerow + '-' + tablecolclass + '" aria-expanded="false">'+tablecol+'</a>';
        thisRowString += '<div class="accordion-content ' + thistablerow + '-' + tablecolclass + '" aria-expanded="false">' + colcontent + '</div></div></td></tr></tbody></table></tr>';
        return thisRowString;
      }
      var tablerow = 0;
      $('.public-appeal-search-view tr.data-row').once('accordion-build').each(function() {
        tablerow = tablerow + 1;
        var thisrow = 'row-' + tablerow;
        $(this).addClass(thisrow);
        if ($('.reference .accordion-row .' + thisrow).length == 0){
          var thisReferences = $(this).find('.views-field-references').html();
          $(this).after(formatAccordionsRow('Reference',thisReferences,thisrow));
        }
        if ($('.summary .accordion-row .' + thisrow).length == 0){
          var thisSummary = $(this).find('.views-field-summary').html();
          $(this).after(formatAccordionsRow('Summary',thisSummary,thisrow));
        }
      });
      $('.accordion-content').hide();

      //add export link to bottom of table
      // $('.export-wrapper', context).once('second-export-link').clone().addClass('below-table').insertAfter('.public-appeal-search-view>table');

      //add export container, move export text after link
      $(".export-wrapper", context)
        .once("add-export-container")
        .wrap(exportContainer);
      $(".export-container", context).once("export-setup").append(exportText);

      //add export link and functionality
      $(".export-wrapper", context)
        .once("export-build")
        .append('<a class="export-trigger" href="#">Export</a>');

      $(".export-trigger", context)
        .once("export-click")
        .on("click", function (evt) {
          evt.preventDefault();
          $(exportText).removeAttr("hidden");
        });

      //add export close functionality
      $(".export-close-button", context)
        .once("export-close")
        .on("click", function (evt) {
          evt.preventDefault();
          $(exportText).attr("hidden", "hidden");
        });

      //remove external class on export link
      $(exportText).find("a").removeClass("external");

      //add expand all link and functionality
      $(".expand-wrapper", context)
        .once("expander-build")
        .append(
          '<a class="expand-trigger" href="#">Expand All<span class="expand-long-text"> Summaries &amp; References</span></a>'
        );
      $(".expand-wrapper", context)
        .once("expander-click")
        .on("click", function (evt) {
          $(".accordion-row").each(function () {
            evt.preventDefault();
            $(this).find(".accordion-toggle").attr("aria-expanded", "true");
            $(this).find(".accordion-toggle").addClass("accordion-open");
            $(this).find(".accordion-content").show();
          });
          $(".expand-wrapper").css("display", "none");
          $(".collapse-wrapper").css("display", "block");
        });

      //add collapse all link and functionality
      $(".collapse-wrapper", context)
        .once("collapser-build")
        .append(
          '<a class="collapse-trigger" href="#">Collapse All<span class="collapse-long-text"> Summaries &amp; References</span></a>'
        );
      $(".collapse-wrapper", context)
        .once("collapser-click")
        .on("click", function (evt) {
          $(".accordion-row").each(function () {
            evt.preventDefault();
            $(this).find(".accordion-toggle").attr("aria-expanded", "false");
            $(this).find(".accordion-toggle").removeClass("accordion-open");
            $(this).find(".accordion-content").hide();
          });
          $(".collapse-wrapper").css("display", "none");
          $(".expand-wrapper").css("display", "block");
        });


      //move counters and mobile filter
      $(".counters").insertAfter(".public-appeal-search-form form");
      $(".mobile-open").insertAfter(".public-appeal-search-form form");
      $('.table-top .table-top-left .search-results').insertBefore($('.views-exposed-form-public-appeal-search-public-appeals-search-page .js-form-item-items-per-page'));
      $('.js-form-item-items-per-page').before($('.include-references-toggle'));

      //add mobile open functionality
      $(".mobile-open", context)
        .once("mobile-open")
        .on("click", function (evt) {
          $(
            "#block-exposedformpublic-appeal-searchpublic-appeals-search-page"
          ).css({
            overflow: "visible",
            clip: "auto",
            height: "auto",
            width: "100%",
          });
        });

      // toggle a single accordion
      $('.accordion-toggle', context).once('showhidesummaryreference').on("click", function(evt){
        var anchorArray = $(this).attr('class').split(/\s+/);
        var thisRow = '.accordion-content.' + anchorArray[1];
        if ($(thisRow).is(":hidden")){
          $(this).addClass("accordion-open");
          $(thisRow).attr("aria-expanded", "true");
          $(thisRow).addClass("accordion-open");
          $(thisRow).show();
        } else {
          $(this).addClass("accordion-open");
          $(this).removeClass("accordion-open");
          $(thisRow).attr("aria-expanded", "false");
          $(thisRow).removeClass("accordion-open");
          $(thisRow).hide();
        }
      });

      // this function toggles the text search
      function togglesearchbox (visiblesearch, invisiblesearch){
        // For some reason these behaviors fire a number of times
        // ensure this function only fires when the form element
        // we want to reveal is hidden
        if ($(visiblesearch).is(":hidden")){
          var textboxclass = ' .form-text';
          // get the vaue of the textbox we're about to turn off
          var textvalue = $(invisiblesearch + textboxclass).val();
          // remove the value from that text box
          $(invisiblesearch + textboxclass).val('');
          // now hide it
          $(invisiblesearch).hide();
          // show the new search box before working with it because some browsers don't like it when you manipulate invisible elements
          $(visiblesearch).show();
          // swap in the text value from the other textbox
          $(visiblesearch + textboxclass).val(textvalue);
          // provide focus for the new textbox
          $(visiblesearch + textboxclass).focus();
          // initiate the search as long as the textbox isn't empty
          if (textvalue.trim() != ''){
            $( '#views-exposed-form-public-appeal-search-public-appeals-search-page' ).trigger( 'submit' );
          }
        }
      }
      // if there is text in the fulltext search box filled by the user or 
        // being filled from the querystring, show it
      // had to switch from using URLSearchParams because it doesn't work in IE11.
      $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
          .exec(window.location.search);
        return (results !== null) ? results[1] || 0 : false;
      }
      if ($.urlParam('fulltext') || $('.js-form-item-fulltext .form-text').val() != '') {
        $('.js-form-item-fulltext-no-ref').hide();
        $('.js-form-item-fulltext').show();
        $('.appeal-search-reference-toggle-checkbox').prop('checked', true);
      } else {
        $('.js-form-item-fulltext-no-ref').show();
        $('.js-form-item-fulltext').hide();
        $('.appeal-search-reference-toggle-checkbox').prop('checked', false);
      }
      $('.appeal-search-reference-toggle-checkbox').change(function() {
        if ($(this).is(':checked')){
          // include references in the fulltext search
          togglesearchbox('.js-form-item-fulltext','.js-form-item-fulltext-no-ref');
        } else {
          // do not include references in the fulltext search
          togglesearchbox('.js-form-item-fulltext-no-ref','.js-form-item-fulltext');
        }
      });

      //add mobile close functionality
      $(".mobile-close", context)
        .once("mobile-close")
        .on("click", function (evt) {
          evt.preventDefault();
          $(
            "#block-exposedformpublic-appeal-searchpublic-appeals-search-page"
          ).css({
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            height: "1px",
            width: "1px",
          });
        });

      //reorder counters
      $(".upheld-counter").parents("li").addClass("upheld-li");
      $(".overturned-counter").parents("li").addClass("overturned-li");
      $(".overturned-in-part-counter")
        .parents("li")
        .addClass("overturned-in-part-li");

      //add tooltip container, move tooltip text after toggle
      $(".js-form-item-references-included", context)
        .once("add-tooltip-container")
        .before(toolTipContainer);
      $(toolTipContainer, context).once("tooltip-setup").append(toolText);

      //add tooltip functionality
      let tooltipToggle = $(".tooltip-toggle");
      $(tooltipToggle, context)
        .once("tooltip-mouseover")
        .on("mouseenter", function (evt) {
          evt.preventDefault();
          $(toolText).removeAttr("hidden");
        });
      $(tooltipToggle, context)
        .once("tooltip-mouseout")
        .on("mouseleave", function (evt) {
          evt.preventDefault();
          $(toolText).attr("hidden", "hidden");
        });

      $(tooltipToggle, context)
        .once("tooltip-click")
        .on("click", function (evt) {
          evt.preventDefault();
          if (clickedOn) {
            $(toolText).attr("hidden", "hidden");
            $(tooltipToggle).on("mouseenter", function (evt) {
              evt.preventDefault();
              $(toolText).removeAttr("hidden");
            });
            $(tooltipToggle).on("mouseleave", function (evt) {
              evt.preventDefault();
              $(toolText).attr("hidden", "hidden");
            });
            clickedOn = false;
          } else {
            $(toolText).removeAttr("hidden");
            $(tooltipToggle).off("mouseenter mouseleave");
            clickedOn = true;
          }
        });

      //hide divs that mimic status messages
      $(
        '#main-layout-content-switch-div [aria-label="Error message"]'
      ).addClass("visually-hidden");
      $(
        '#main-layout-content-switch-div [aria-label="Status message"]'
      ).addClass("visually-hidden");

      //automatically download CSV file
      if (
        $("#vde-automatic-download").length &&
        !$("#vde-automatic-download").hasClass("downloaded")
      ) {
        $("#vde-automatic-download").attr("download", "public_appeals.csv");
        $("#vde-automatic-download").attr("target", "_blank");
        $("#vde-automatic-download")[0].click();
        $("#vde-automatic-download").addClass("downloaded");
      }

      //move pager drop-down
      $('.js-form-item-items-per-page select', context).once('pager-move').clone().attr('id','page-drop-select').appendTo('.page-drop-select-container').on('change', function() {
        $("[id^='edit-items-per-page']").val($('#page-drop-select').val());
        $( '#views-exposed-form-public-appeal-search-public-appeals-search-page' ).trigger( 'submit' );
      });
      $('.page-drop-select-container', context).once('pager-label').prepend($('<label>Show</label>').attr('for','page-drop-select'));

      if ($("label[for='appeal_decision-Upheld'] .facet-item__count").length){
        $('.counters .upheld-value').text($("label[for='appeal_decision-Upheld'] .facet-item__count").html().replace(/[()]/g, ''));
      }
      if ($("label[for='appeal_decision-Overturned'] .facet-item__count").length){
        $('.counters .overturned-value').text($("label[for='appeal_decision-Overturned'] .facet-item__count").html().replace(/[()]/g, ''));
      }
      if ($("label[for='appeal_decision-Overturned-in-Part'] .facet-item__count").length){
        $('.counters .overturned-in-part-value').text($("label[for='appeal_decision-Overturned-in-Part'] .facet-item__count").html().replace(/[()]/g, ''));
      }
      //countersToggle();
      $('.js-form-item-case-number .select2-selection').click(function () {
        $('.select2-dropdown').hide();
      });
      // manually changing the placeholder because the select2 function doesn't like how we are using jquery
      $('.select2-search__field').each(function(){
        if ($(this).attr('placeholder')){
          var thisplaceholder = $(this).attr('placeholder');
          if (thisplaceholder == '- None -') {
            thisplaceholder = "Select option(s)"
          }
          $(this).attr({
            "placeholder" : thisplaceholder
          });
        }
      });

    }
  };

  //tooltips
  let toolTipContainer = $("<div />")
    .addClass("tooltip-container")
    .html('<a href="#" class="tooltip-toggle">i</a>');
  let toolText = $("#block-publicappealssearchtooltip")
    .attr("hidden", "hidden")
    .detach();
  let clickedOn = false;

  //export box
  let exportContainer = $("<div />").addClass("export-container");
  let exportText = $("#block-datasetexport").attr("hidden", "hidden").detach();
  let exportCloseButton = $("<button />")
    .html("x")
    .addClass("export-close-button");
  let exportClose = exportText.find("h2").append(exportCloseButton);

})(jQuery, Drupal, this, Drupal.debounce);
