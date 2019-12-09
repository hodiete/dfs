/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document, debounce) {

  'use strict';

  Drupal.behaviors.appealsSearch = {
    attach: function (context, settings) {
      console.log('stuff');
      console.log(settings);

      let refsSelected = false;
      let numRowsDT = 0;

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
        let toolText = $('#block-publicappealssearchtooltip').attr('hidden','hidden').detach();
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

        $('.public-appeals-data').DataTable().rows().every(function(rowIndex) {
          rowSetup(this,rowIndex);
        });
      }

      //initialize datatable
      function buildTable() {

        $('.public-appeal-search-view table').addClass('public-appeals-data').dataTable({
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

      $('.pager', context).find('[rel=next]').once().on('click', Drupal.debounce(function(evt) {
        console.log('clicked');
        if ($('.pager').length) {
          $('.pager').find('[rel=next]').click();
        }
        else {
          $('.public-appeals-data').DataTable().page.len(10).draw();
          $('ajax-progress').hide();
          console.log('complete');
          //clearInterval(loadInterval);
        }
      },200));

      $('.pager', context).find('[rel=next]').once().each(function() {
        console.log('pager loaded');
        //TODO: place first load-button click here to get load-button-clicker to fire once and only once
        // when filters are applied and when page is first loaded
        //the cascade works when the button is clicked, it's just the initial click that we're missing
        //multiple clicks result in too many results from filters
      });

      checkRows();
      $('.pager', context).once().each(function() {
        console.log('how often do I run?');
        if ($('.pager').length) {
          $('.pager').find('[rel=next]').click();
        }
        else {
          $('.public-appeals-data').DataTable().page.len(10).draw();
          $('ajax-progress').hide();
          console.log('complete');
          //clearInterval(loadInterval);
        }
      });

      //TODO: fix filter replacements not firing

      //TODO: fix missing complete condition without button click (when there are fewer than 400 results)

      if (!$.fn.DataTable.isDataTable('.public-appeals-data')) {
        console.log('this should be called once');
        buildTable();
        //let loadInterval = setInterval(function() {
          checkRows();
          /*if ($('.pager').length) {
            //$('.pager').find('[rel=next]').click();
          }
          else {
            $('.public-appeals-data').DataTable().page.len(10).draw();
            $('ajax-progress').hide();
            console.log('complete');
            //clearInterval(loadInterval);
          }*/
        //}, 5000);
      }

      $('.mobile-close').once('appealsSearch').on('click',function(evt) {
        evt.preventDefault();
        $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page').css({
          'overflow': 'hidden',
          'clip': 'rect(0 0 0 0)',
          'height': '1px',
          'width': '1px'
        });
      });

    }
  };



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

  //run setup on each row
  function rowSetup(row,rowIndex) {
    //add counter icons to decisions column
    let decision = $(row.node()).find('.table-decision-value>div');
    if ($(decision).text().toLowerCase().indexOf('upheld') > -1) {
      $(decision).addClass('upheld');
    }
    else if ($(decision).text().toLowerCase().indexOf('overturned in part') > -1) {
      $(decision).addClass('overturned-in-part');
    }
    else if ($(decision).text().toLowerCase().indexOf('overturned') > -1) {
      $(decision).addClass('overturned');
    }

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
  }

  //get newly added rows
  function getRows(num) {
    let rowsArray = [];

    rowsArray = $('.public-appeals-data>tbody>tr').slice(num);

    return rowsArray;
  }

  //add news rows to datatable
  function addRows(rows,rowIndex,numRows) {
    $('.public-appeals-data').DataTable().rows.add(rows).draw();
    for (var i = rowIndex + 1; i < numRows + rowIndex; i++) {
      rowSetup($('.public-appeals-data').DataTable().row(i),i);
    }
  }

  //check if there are new rows not yet in datatable, if so call getRows
  function checkRows() {
    console.log('running checkrows');
    let numRowsTotal = 0;
    let numRowsDT = 0;
    if ($.fn.DataTable.isDataTable('.public-appeals-data')) {
      numRowsTotal = $('.public-appeals-data>tbody').children('tr').length - $('.public-appeals-data tbody').children('.accordion-row').length;
      numRowsDT = $('.public-appeals-data').DataTable().rows().count();
      if (numRowsTotal > numRowsDT) {
        let rows = getRows(numRowsDT - numRowsTotal);
        addRows(rows,numRowsDT,numRowsTotal - numRowsDT);
      }
    }
    else {
      numRowsTotal = $('.public-appeal-search-view>table>tbody').children('tr').length - $('.public-appeal-search-view table tbody').children('.accordion-row').length;
    }
  }

  /*let loadInterval;

  function startLoader() {
    console.log('starting loader');
    if (typeof loadInterval != 'undefined' && loadInterval != null) {
      console.log('clearing interval');
      clearInterval(loadInterval);
    }
    loadInterval = setInterval(function() {
      console.log('starting interval');
      checkRows();
      if ($('.pager').length) {
        //$('.pager').find('[rel=next]').click();
      }
      else {
        $('.public-appeals-data').DataTable().page.len(10).draw();
        $('ajax-progress').hide();
        console.log('complete');
        clearInterval(loadInterval);
      }
    },3000);
  }*/

  /*$('.pager').ready(function() {
    startLoader();
  });*/

  /*$('#edit-submit-public-appeal-search').click(function() {
    console.log('clicked apply');
    startLoader();
  });*/


  //override placeholder text on external filters
  function setFilterPlaceholders() {
    console.log('setting filters');
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

  $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page').ready(function() {
    setFilterPlaceholders();
  });

})(jQuery, Drupal, this, Drupal.debounce);
