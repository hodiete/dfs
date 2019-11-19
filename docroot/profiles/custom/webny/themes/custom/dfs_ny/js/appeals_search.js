/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.appealsSearch = {
    attach: function (context, settings) {

      let refsSelected = false;

      //output child row for summary and references accordions
      function formatAccordionsRow(data, rowIndex) {
        // `data` is the original data object for the row
        let outputTable = '<table><thead><th>Summary and References</th></thead><tbody><tr><td>';
        let summary = $(data[10]);
        let refs = $(data[11]);

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

        $('.public-appeals-data').DataTable().rows().every(function(rowIndex) {
          //add counter icons to decisions column
          let decision = $(this.node()).find('.table-decision-value>div');
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
          this.child(formatAccordionsRow(this.data(),rowIndex)).show();

          $(this.child()).find('.accordion-toggle').on('click', function(evt) {
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
      }

      //initialize datatable
      function buildTable() {
        $('.public-appeal-search-view>table').addClass('public-appeals-data').dataTable({
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
          dom: '<"search-filter"f<"tooltip-container"><"refs-include">><"mobile-open"><"counters"><"table-top"<"table-top-left"li><"table-top-right"B<"expand-wrapper">>>rtB<"pagination-holder"p>',
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


      $('.public-appeal-search-view>table', context).once('appealsSearch').each(function() {
        buildTable();
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

      //override placeholder text on external filters
      function setFilterPlaceholders() {
        $('.layout-sidebar-first select').each(function() {
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

      setFilterPlaceholders();

    }
  };

})(jQuery, Drupal, this);
