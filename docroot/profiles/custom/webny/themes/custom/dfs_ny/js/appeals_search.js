/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document, debounce) {

  'use strict';

  Drupal.behaviors.appealsSearch = {
      attach: function (context, settings) {

      //override placeholder text on external filters
      function setFilterPlaceholders() {
        $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page select').each(function() {
          //add placeholders
          $(this).attr('data-placeholder','Select ' + $(this).prev('label').text());
        });

        if ($('.chosen-container').length > 0 && $('.chosen-container label').length < 1) {
          //add labels to Chosen module input fields
          $('.chosen-container input').each(function() {
            $(this).attr('id', $(this).closest('.js-form-type-select').find('label').attr('for') + '-input');
            $(this).before('<label for="' + $(this).closest('.js-form-type-select').find('label').attr('for') + '-input">' + $(this).closest('.js-form-type-select').find('label').text() + '</label>');
            $(this).prev('label').addClass('chosen-label');
          });
        }
      }

      //output child row for summary and references accordions
      function formatAccordionsRow(tableRow, rowIndex) {
        console.log('formatting');
        let outputTable = '<table><thead><th>Summary and References</th></thead><tbody><tr><td>';
        let summary = $(tableRow).find('.views-field-summary');
        let refs = $(tableRow).find('.views-field-references');

        //summary and references should always be the same length
        outputTable += '<div class="accordion"><a class="accordion-toggle" aria-expanded="false" aria-controls="sumAccordion-';
        outputTable += rowIndex
        outputTable += '" id="sumAccordionTitle-';
        outputTable += rowIndex;
        outputTable += '" href="#">Summary</a><div hidden class="accordion-content" role="region" id="sumAccordion-';
        outputTable += rowIndex;
        outputTable += '" aria-labelledby="sumAccordionTitle-';
        outputTable += rowIndex;
        outputTable += '">';
        $(summary).find('li').each(function(i) {
          $('.CSV-text').remove();
          outputTable += '<h3>Summary ';
          outputTable += (i + 1);
          outputTable += '</h3><div class="summary-text">';
          outputTable += $(this).text();
          outputTable += '</div>'
        });
        outputTable += '</div></div>';

        outputTable += '<div class="accordion refsAccordionContainer"><a class="accordion-toggle" aria-expanded="false" aria-controls="refsAccordion-';
        outputTable += rowIndex
        outputTable += '" id="refsAccordionTitle-';
        outputTable += rowIndex;
        outputTable += '" href="#">References</a><div hidden class="accordion-content" role="region" id="refsAccordion-';
        outputTable += rowIndex;
        outputTable += '" aria-labelledby="refsAccordionTitle-';
        outputTable += rowIndex;
        outputTable += '">';
        $(refs).find('li').each(function(i) {
          $('.CSV-text').remove();
          outputTable += '<h3>References ';
          outputTable += (i + 1);
          outputTable += '</h3><div class="refs-text">';
          outputTable += $(this).text();
          outputTable += '</div>'
        });
        outputTable += '</div></div>';

        outputTable += '</div></tr></tbody></table>';

        return outputTable;
      }

      setFilterPlaceholders();

      //build summary and references accordion
      // $('.public-appeal-search-view>table>tbody>tr.data-row').each(function() {
      //   console.log('building accordion');

      //   let newRow = $('<tr />').addClass('accordion-row');
      //   let newCell = $('<td colspan="11" />');
      //   $(newCell).html(formatAccordionsRow(this));
      //   $(newRow).html(newCell);

      //   $(newCell).find('.accordion-toggle').on('click', function() {
      //     if ($(this).next('.accordion-content')[0].hasAttribute("hidden")) {
      //       $(this).attr('aria-expanded','true');
      //       $(this).addClass('accordion-open');
      //       $(this).next('.accordion-content').removeAttr('hidden');
      //     }
      //     else {
      //       $(this).attr('aria-expanded','false');
      //       $(this).removeClass('accordion-open');
      //       $(this).next('.accordion-content').attr('hidden','hidden');
      //     }
      //     if ($('.accordion-toggle[aria-expanded="true"]').length == $('.accordion-content').length) {
      //       $('.expand-wrapper').css('display','none');
      //       $('.collapse-wrapper').css('display','block');
      //     }
      //     else {
      //       $('.collapse-wrapper').css('display','none');
      //       $('.expand-wrapper').css('display','block');
      //     }
      //   });

      //   $(this).after(newRow);
      // });

      //build summary and references accordion
      var tablerow = 0;
      $('.public-appeal-search-view>table>tbody>tr.data-row').once('accordion-build').each(function() {
        tablerow = tablerow + 1;
        var thisrow = 'row-' + tablerow;
        console.log('building accordion');
        $(this).addClass(thisrow);
        if ($('.references .accordion-row .' + thisrow).length == 0){
          var thisReferences = $(this).find('.views-field-references').html();
          $(this).after('<tr class="references accordion-row ' + thisrow + '"><td colspan="11"><table><thead><tr><th>References</th></tr></thead><tbody><tr><td><div class="accordion"><div class="accordion-content">' + thisReferences + '</div></div></td></tr></table></table></tr>');
        }
        if ($('.summary .accordion-row .' + thisrow).length == 0){
          var thisSummary = $(this).find('.views-field-summary').html();
          $(this).after('<tr class="summary accordion-row ' + thisrow + '"><td colspan="11"><table><thead><tr><th>Summary</th></tr></thead><tbody><tr><td><div class="accordion"><div class="accordion-content">' + thisSummary + '</div></div></td></tr></tbody></table></tr>');
        }
      });



      //add export link to bottom of table
      $('.export-wrapper', context).once('second-export-link').clone().addClass('below-table').insertAfter('.public-appeal-search-view>table');

      //add export container, move export text after link
      $('.export-wrapper', context).once('add-export-container').wrap(exportContainer);
      $('.export-container', context).once('export-setup').append(exportText);

      //add export link and functionality
      $('.export-wrapper', context).once('export-build').append('<a class="export-trigger" href="#">Export</a>');

      $('.export-trigger', context).once('export-click').on('click', function(evt) {
        evt.preventDefault();
        $(exportText).removeAttr('hidden');
      });

      //add export close functionality
      $('.export-close-button', context).once('export-close').on('click', function(evt) {
        evt.preventDefault();
        $(exportText).attr('hidden','hidden');
      });

      //remove external class on export link
      $(exportText).find('a').removeClass('external');

      //add expand all link and functionality
      $('.expand-wrapper', context).once('expander-build').append('<a class="expand-trigger" href="#">Expand All<span class="expand-long-text"> Summaries &amp; References</span></a>');
      $('.expand-wrapper', context).once('expander-click').on('click',function(evt) {
        $('.accordion-row').each(function() {
          evt.preventDefault();
          $(this).find('.accordion-toggle').attr('aria-expanded','true');
          $(this).find('.accordion-toggle').addClass('accordion-open');
          $(this).find('.accordion-content').removeAttr('hidden');
        });
        $('.expand-wrapper').css('display','none');
        $('.collapse-wrapper').css('display','block');
      });

      //add collapse all link and functionality
      $('.collapse-wrapper', context).once('collapser-build').append('<a class="collapse-trigger" href="#">Collapse All<span class="collapse-long-text"> Summaries &amp; References</span></a>');
      $('.collapse-wrapper', context).once('collapser-click').on('click',function(evt) {
        $('.accordion-row').each(function() {
          evt.preventDefault();
          $(this).find('.accordion-toggle').attr('aria-expanded','false');
          $(this).find('.accordion-toggle').removeClass('accordion-open');
          $(this).find('.accordion-content').attr('hidden','hidden');
        });
        $('.collapse-wrapper').css('display','none');
        $('.expand-wrapper').css('display','block');
      });

      //move counters and mobile filter
      $('.counters').insertAfter('.public-appeal-search-form form');
      $('.mobile-open').insertAfter('.public-appeal-search-form form');

      //add mobile open functionality
      $('.mobile-open', context).once('mobile-open').on('click',function(evt) {
        $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page').css({
          'overflow': 'visible',
          'clip': 'auto',
          'height': 'auto',
          'width': '100%'
        });
      });

      //add mobile close functionality
      $('.mobile-close', context).once('mobile-close').on('click',function(evt) {
        evt.preventDefault();
        $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page').css({
          'overflow': 'hidden',
          'clip': 'rect(0 0 0 0)',
          'height': '1px',
          'width': '1px'
        });
      });

      //reorder counters
      $('.upheld-counter').parents('li').addClass('upheld-li');
      $('.overturned-counter').parents('li').addClass('overturned-li');
      $('.overturned-in-part-counter').parents('li').addClass('overturned-in-part-li');

      //add tooltip container, move tooltip text after toggle
      $('.js-form-item-references-included', context).once('add-tooltip-container').before(toolTipContainer);
      $(toolTipContainer, context).once('tooltip-setup').append(toolText);

      //add tooltip functionality
      let tooltipToggle = $('.tooltip-toggle');
      $(tooltipToggle, context).once('tooltip-mouseover').on('mouseenter', function(evt) {
        evt.preventDefault();
        $(toolText).removeAttr('hidden');
      });
      $(tooltipToggle, context).once('tooltip-mouseout').on('mouseleave', function(evt) {
        evt.preventDefault();
        $(toolText).attr('hidden','hidden');
      });

      $(tooltipToggle, context).once('tooltip-click').on('click', function(evt) {
        evt.preventDefault();
        if (clickedOn) {
          $(toolText).attr('hidden','hidden');
          $(tooltipToggle).on('mouseenter', function(evt) {
            evt.preventDefault();
            $(toolText).removeAttr('hidden');
          });
          $(tooltipToggle).on('mouseleave', function(evt) {
            evt.preventDefault();
            $(toolText).attr('hidden','hidden');
          });
          clickedOn = false;
        }
        else {
          $(toolText).removeAttr('hidden');
          $(tooltipToggle).off('mouseenter mouseleave');
          clickedOn = true;
        }
      });

      //hide divs that mimic status messages
      $('#main-layout-content-switch-div [aria-label="Error message"]').addClass('visually-hidden');
      $('#main-layout-content-switch-div [aria-label="Status message"]').addClass('visually-hidden');

      //automatically download CSV file
      if ($('#vde-automatic-download').length && !$('#vde-automatic-download').hasClass('downloaded')) {
        $('#vde-automatic-download').attr('download','public_appeals.csv');
        $('#vde-automatic-download').attr('target','_blank');
        $('#vde-automatic-download')[0].click();
        $('#vde-automatic-download').addClass('downloaded');
      }

      //move pager drop-down
      $('.js-form-item-items-per-page select', context).once('pager-move').clone().attr('id','page-drop-select').appendTo('.page-drop-select-container').on('change', function() {
        $('#edit-items-per-page').val($('#page-drop-select').val());
        $('#edit-submit-public-appeal-search')[0].click();
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
      
    }
  };

  //tooltips
  let toolTipContainer = $('<div />').addClass('tooltip-container').html('<a href="#" class="tooltip-toggle">i</a>');
  let toolText = $('#block-publicappealssearchtooltip').attr('hidden','hidden').detach();
  let clickedOn = false;

  //export box
  let exportContainer = $('<div />').addClass('export-container');
  let exportText = $('#block-datasetexport').attr('hidden','hidden').detach();
  let exportCloseButton = $('<button />').html('x').addClass('export-close-button');
  let exportClose = exportText.find('h2').append(exportCloseButton);


})(jQuery, Drupal, this, Drupal.debounce);