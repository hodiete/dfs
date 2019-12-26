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
      $('.vbo-table>tbody>tr', context).once('accordion-build').each(function(index) {
        let newRow = $('<tr />').addClass('accordion-row');
        let newCell = $('<td colspan="11" />');
        $(newCell).html(formatAccordionsRow(this, index));
        $(newRow).html(newCell);

        $(newCell).find('.accordion-toggle').on('click', function(evt) {
          evt.preventDefault();
          if ($(this).next('.accordion-content')[0].hasAttribute("hidden")) {
            $(this).attr('aria-expanded','true');
            $(this).addClass('accordion-open');
            $(this).next('.accordion-content').removeAttr('hidden');
          }
          else {
            $(this).attr('aria-expanded','false');
            $(this).removeClass('accordion-open');
            $(this).next('.accordion-content').attr('hidden','hidden');
          }
        });

        $(this).after(newRow);
      });

      //add export link to bottom of table
      $('.export-wrapper', context).once('second-export-link').clone().addClass('below-table').appendTo('.vbo-table~#edit-actions');
      //$('.vbo-table~#edit-actions #edit-select-all').attr('id','edit-select-all-2');

      //add export link and functionality
      $('.export-wrapper', context).once('export-build').append('<a class="export-trigger" href="#">Export</a>');
      $('.export-wrapper', context).once('export-click').on('click',function(evt) {
        evt.preventDefault();
        $('#edit-select-all')[0].click();
      });

      //add expand all link and functionality
      $('.expand-wrapper', context).once('expander-build').append('<a class="expand-trigger" href="#">Expand All<span class="expand-long-text"> Summaries &amp; References</span></a>');
      $('.expand-wrapper', context).once('expander-click').on('click',function(evt) {
        $('.accordion-row').each(function() {
          evt.preventDefault();
          $(this).find('.accordion-toggle').attr('aria-expanded','true');
          $(this).find('.accordion-toggle').addClass('accordion-open');
          $(this).find('.accordion-content').removeAttr('hidden');
        });
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
        console.log('mouseenter');
        evt.preventDefault();
        $(toolText).removeAttr('hidden');
      });
      $(tooltipToggle, context).once('tooltip-mouseout').on('mouseleave', function(evt) {
        console.log('mouseleave');
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

      //reduce CSV export process to one click
      $('#views-form-public-appeal-search-public-appeals-search-page .vbo-select-all').prop('checked',false);
      $('#views-form-public-appeal-search-public-appeals-search-page .vbo-select-all', context).once('export-selected').on('click',Drupal.debounce(function() {
        $('#edit-vbo-export-generate-csv-action')[0].click();
      }, 500));

      //hide divs that mimic status messages
      $('#main-layout-content-switch-div [aria-label="Error message"]').addClass('visually-hidden');
      $('#main-layout-content-switch-div [aria-label="Status message"]').addClass('visually-hidden');

      //automatically download CSV file
      if ($('#main-layout-content-switch-div [aria-label="Status message"] li:first-child:contains("Export file created")').find('a').length > 0 && !$('#main-layout-content-switch-div [aria-label="Status message"] li:first-child:contains("Export file created")').find('a').hasClass('downloaded')) {
        console.log('has export file');
        console.log($('#main-layout-content-switch-div [aria-label="Status message"] li:first-child:contains("Export file created")').find('a')[0]);
        $('#main-layout-content-switch-div [aria-label="Status message"] li:first-child:contains("Export file created")').find('a')[0].click();
        $('#main-layout-content-switch-div [aria-label="Status message"] li:first-child:contains("Export file created")').find('a').addClass('downloaded');
      }

      //move pager drop-down
      $('.js-form-item-items-per-page select', context).once('pager-move').clone().attr('id','page-drop-select').appendTo('.page-drop-select-container').on('change', function() {
        console.log('changed');
        $('#edit-items-per-page').val($('#page-drop-select').val());
        $('#edit-submit-public-appeal-search')[0].click();
      });
      $('.page-drop-select-container', context).once('pager-label').prepend($('<label>Show</label>').attr('for','page-drop-select'));
/*
      let refsSelected = false;

      //get newly added rows
      function getRows(num) {
        let rowsArray = $('.public-appeals-data>tbody>tr').slice(num);
        return rowsArray;
      }

      //add news rows to datatable
      function addRows(rows,rowIndex,numRows) {
        $('.public-appeals-data').DataTable().rows.add(rows).draw();
        numRowsDT += numRows;
      }

      //check if there are new rows not yet in datatable, if so call getRows
      function checkRows() {
        if ($.fn.DataTable.isDataTable('.public-appeals-data')) {
          numRowsTotal = $('.public-appeals-data>tbody').children('tr').length - $('.public-appeals-data tbody').children('.accordion-row').length;
          //if there are new rows to add, add them to the datatable
          if (numRowsTotal > numRowsDT) {
            let rows = getRows(numRowsDT - numRowsTotal);
            addRows(rows,numRowsDT,numRowsTotal - numRowsDT);
          }
        }
        else {
          numRowsTotal = $('.public-appeal-search-view-old>.views-infinite-scroll-content-wrapper>table>tbody').children('tr').length - $('.public-appeal-search-view-old>.views-infinite-scroll-content-wrapper>table>tbody').children('.accordion-row').length;
        }
      }

      //output sum of decision column to counters
      function setCounterValues() {
        let upheldValue = 0;
        let overturnedValue = 0;
        let overturnedPartValue = 0;

        $('.public-appeals-data').DataTable().column(3, {search: 'applied'}).data().filter(function( value, index ) {

          if ($(value).text().toLowerCase().indexOf('upheld') > -1) {
            upheldValue++;
          }
          else if ($(value).text().toLowerCase().indexOf('overturned in part') > -1) {
            overturnedPartValue++;
          }
          else if ($(value).text().toLowerCase().indexOf('overturned') > -1) {
            overturnedValue++;
          }

          return value;
        });

        $('.upheldValue').text(upheldValue);
        $('.overturnedValue').text(overturnedValue);
        $('.overturnedPartValue').text(overturnedPartValue);

      }

      //run setup tasks on datatable init
      function tableSetup() {
        $('.public-appeals-data').DataTable().page.len(-1).draw();

        //add search field label
        $('.dataTables_filter').find('label').attr('for','table_search').prepend('<span class="label-text">Filter search results</span>');
        $('.dataTables_filter').find('input').attr('id','table_search');

        //add mobile filter toggle functionality
        $('.mobile-open').on('click',function(evt) {
          $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page').css({
            'overflow': 'visible',
            'clip': 'auto',
            'height': 'auto',
            'width': '100%'
          });
        });

        //add references checkbox and funtionality
        $('.views-page-public-appeal-search .refs-include').append('<input type="checkbox" id="references-included" name="references-included" value="references-included"><label for="references-included">Include References in Search</label>');

        $('#references-included').on('click keypress', function(evt) {
          if (evt.type == 'keypress') {
            if (evt.keyCode == 13) {
              referencesClickHandler();
            }
          }
          else {
            referencesClickHandler();
          }
        });

        //add counters above table
        $('.views-page-public-appeal-search .counters').append('<div class="counters-inner"><div class="upheldCounter"><span class="upheldValue"></span> Upheld</div><div class="overturnedCounter"><span class="overturnedValue"></span> Overturned</div><div class="overturnedPartCounter"><span class="overturnedPartValue"></span> Overturned-in-part</div></div>');

        //add values to counters above table, change values on search
        setCounterValues();
        $('.public-appeals-data').DataTable().on( 'search.dt', function() {
          setCounterValues();
        });

        //move tooltip text after toggle
        $('.tooltip-container').append(toolText);

        //add tooltip toggle and functionality
        let tooltipToggle = $('.tooltip-container').prepend('<a href="#" class="tooltip-toggle">i</a>');

        let clickedOn = false;
        $(tooltipToggle).on('mouseenter', function(evt) {
          evt.preventDefault();
          $(toolText).removeAttr('hidden');
        });
        $(tooltipToggle).on('mouseleave', function(evt) {
          evt.preventDefault();
          $(toolText).attr('hidden','hidden');
        });

        $(tooltipToggle).on('click', function(evt) {
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

        //add expand all link and functionality
        $('.expand-wrapper').append('<a class="expand-trigger" href="#">Expand All<span class="expand-long-text"> Summaries &amp; References</span></a>');
        $('.expand-wrapper').on('click',function(evt) {
          $('.public-appeals-data').DataTable().rows().every(function() {
            evt.preventDefault();
            $(this.child()).find('.accordion-toggle').attr('aria-expanded','true');
            $(this.child()).find('.accordion-toggle').addClass('accordion-open');
            $(this.child()).find('.accordion-content').removeAttr('hidden');
          });
        });

        //add collapse all link and functionality
        $('.collapse-wrapper').append('<a class="collapse-trigger" href="#">Collapse All<span class="collapse-long-text"> Summaries &amp; References</span></a>');
        $('.collapse-wrapper').on('click',function(evt) {
          $('.public-appeals-data').DataTable().rows().every(function() {
            evt.preventDefault();
            $(this.child()).find('.accordion-toggle').attr('aria-expanded','false');
            $(this.child()).find('.accordion-toggle').removeClass('accordion-open');
            $(this.child()).find('.accordion-content').attr('hidden','hidden');
          });
        });
      }

      //initialize datatable
      function buildTable() {
        $('.public-appeal-search-view-old>.views-infinite-scroll-content-wrapper>table').addClass('public-appeals-data').dataTable({
          order: [[9, 'asc']],
          ordering: true,
          paging: true,
          pageLength: 10,
          pagingType: 'full_numbers',
          lengthChange: true,
          info: true,
          stateSave: true,
          retrieve: true,
          processing: true,
          dom: '<"search-filter"f<"tooltip-container"><"refs-include">><"mobile-open"><"counters"><"table-top"<"table-top-left"li><"table-top-right"B<"expand-wrapper"><"collapse-wrapper">>>rtB<"pagination-holder"p>',
          columnDefs: [
            { targets: [11], visible: false, searchable: refsSelected },
            { targets: [10], visible: false, searchable: true }
          ],
          buttons: [
            { extend: 'csv', text: 'Export', tag: 'a' }
          ],
          language: {
            info: 'Showing _START_ to _END_ of _TOTAL_ Results',
            infoFiltered: '',
            emptyTable: 'No data available',
            lengthMenu: 'Show _MENU_ per page',
            paginate: {
              first: '« First',
              previous: '«',
              next: '»',
              last: 'Last »'
            },
            search: '_INPUT_',
            searchPlaceholder: 'Search'
          },
          initComplete: function(settings, json) {
            numRowsTotal = $('.public-appeals-data>tbody').children('tr').length - $('.public-appeals-data tbody').children('.accordion-row').length;
            numRowsDT = $('.public-appeals-data').DataTable().rows().count();
            tableSetup();
            if ($('#noResultsTable').length > 0) {
              $('.public-appeals-data').DataTable().clear().draw();
            }
          }
        });
      }

      //show or hide references section, include in search if shown
      function referencesClickHandler(evt) {
        if (refsSelected) {
          $('.public-appeals-data').DataTable().context[0].aoColumns[11].bSearchable = false;
          refsSelected = false;

          $('#references-included').attr('checked',false);
        }
        else {
          $('.public-appeals-data').DataTable().context[0].aoColumns[11].bSearchable = true;
          refsSelected = true;

          $('#references-included').attr('checked',true);
        }
        $('.public-appeals-data').DataTable().rows().invalidate().draw();
      }

      //run on page load and categories filter application
      $('.pager', context).find('[rel=next]').once('pager-click').each(function() {
        $(this).on('click',Drupal.debounce(loader, 1000));
      });

      checkRows();
      //run on page load and after apply filters
      if (loaderGreen) {
        $('#block-publicappealsloadblock').removeAttr('hidden');
        if (!$('.ajax-progress').length) {
          loader();

          if (!$.fn.DataTable.isDataTable('.public-appeals-data')) {
            buildTable();
            checkRows();
          }

          //paginate table and remove spinner if all rows load at once
          if (!$('.pager').length) {
            loadComplete();
          }
          else {
            $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page form').removeClass('active-filters');
            $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page form :input').prop('disabled', true).trigger("chosen:updated");
          }
        }
      }

      //add categories filter placeholders
      $('[id^="views-exposed-form"]',context).once('filterPlaceholders').each(function() {
        setFilterPlaceholders();
      });

      $('.mobile-close').once('appealsSearch').on('click',function(evt) {
        evt.preventDefault();
        $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page').css({
          'overflow': 'hidden',
          'clip': 'rect(0 0 0 0)',
          'height': '1px',
          'width': '1px'
        });
      });
*/
    }
  };

  //tooltips
  let toolTipContainer = $('<div />').addClass('tooltip-container').html('<a href="#" class="tooltip-toggle">i</a>')
  let toolText = $('#block-publicappealssearchtooltip').attr('hidden','hidden').detach();
  let clickedOn = false;

/*
  let loaderGreen = true;
  let numRowsTotal = 0;
  let numRowsDT = 0;
  let toolText = $('#block-publicappealssearchtooltip').attr('hidden','hidden').detach();

  //output child row for summary and references accordions
  function formatAccordionsRow(data, rowIndex) {
    // `data` is the original data object for the row
    let outputTable = '<table><thead><th>Summary and References</th></thead><tbody><tr><td>';
    let summary = $(data[10]);
    let refs = $(data[11]);
    //data output for CSV export
    let sumData = '';
    let refData = '';

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
      sumData += '<h3>Summary ';
      sumData += (i + 1);
      sumData += ': </h3><div class="summary-text">';
      sumData += $(this).text();
      sumData += '</div>'

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
      refData += '<h3>References ';
      refData += (i + 1);
      refData += ': </h3><div class="refs-text">';
      refData += $(this).text();
      refData += '</div>'

      outputTable += '<h3>References ';
      outputTable += (i + 1);
      outputTable += '</h3><div class="refs-text">';
      outputTable += $(this).text();
      outputTable += '</div>'
    });
    outputTable += '</div></div>';

    outputTable += '</div></tr></tbody></table>';

    data[10] = sumData;
    data[11] = refData;

    return outputTable;
  }

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

  //run when reset button clicked
  function reset() {
    $(this.form).clearForm();
    $(this.form).find('.form-select').val('').trigger('chosen:updated');
    $('.public-appeals-data').DataTable().search('');//.draw();
    $(this.form).find('.form-submit').trigger('click');
    return false;
  }

  //run when all table rows are loaded
  function loadComplete() {
    $('.public-appeals-data').DataTable().page.len(10).draw();
    $('ajax-progress').hide();
    $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page form').addClass('active-filters');
    $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page form :input').prop('disabled', false).trigger("chosen:updated");

    $('.public-appeals-data').DataTable().rows().every(function(rowIndex) {
      let row = this;

      //add accordions
      row.child(formatAccordionsRow(row.data(),rowIndex)).show();

      $(row.child()).addClass('accordion-row');

      $(row.child()).find('.accordion-toggle').on('click', function(evt) {
        evt.preventDefault();
        if ($(this).next('.accordion-content')[0].hasAttribute("hidden")) {
          $(this).attr('aria-expanded','true');
          $(this).addClass('accordion-open');
          $(this).next('.accordion-content').removeAttr('hidden');
        }
        else {
          $(this).attr('aria-expanded','false');
          $(this).removeClass('accordion-open');
          $(this).next('.accordion-content').attr('hidden','hidden');
        }
      });
    });
    if (!$(".exposed_form_reset").length && !$("#edit-reset").length) {
      $("[id^='views-exposed-form']").find('#edit-actions').append('<button onclick="reset();" class="exposed_form_reset button">' + Drupal.t('Reset') + '</button>');
    }
    $('#block-publicappealsloadblock').attr('hidden','hidden');
  }

  //if pager exists, click pager, if not, complete load
  function loader() {
    loaderGreen = false;
    if ($('.pager').length) {
      $('.pager').find('[rel=next]').click();
    }
    else {
      loadComplete();
    }
  }

  $('.pager').ready(function() {
    //run loader when apply filter is clicked
    $('#edit-submit-public-appeal-search').on('click',function(evt) {
      loaderGreen = true;
      if ($('.mobile-open').css('display') == 'block') {
        $('.mobile-close').click();
      }
    });
  });
*/

/*
  Drupal.behaviors.moveItemsPerPage = {
    attach: function (context, settings) {
      'use strict';
      if ( $(".public-appeal-search-view .views-form .vbo-view-form .form-item--id-items-per-page").length <= 0) {

        $(".views-exposed-form form .form-item--id-items-per-page").prependTo($(".public-appeal-search-view .views-form .vbo-view-form"));
        console.log("Move items per page: ");
      }

      console.log($(".views-exposed-form form .form-item--id-items-per-page"));


    }
  }
*/
})(jQuery, Drupal, this, Drupal.debounce);
