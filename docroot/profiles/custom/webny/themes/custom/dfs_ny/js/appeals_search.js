/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.appealsSearch = {
    attach: function (context, settings) {

      let refsSelected = false;

      //outputs child row for summary and references accordions
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
          console.log($(this).text());
          outputTable += '<h3>Summary ';
          outputTable += (i + 1);
          outputTable += '</h3><div class="summary-text">';
          outputTable += $(this).text();
          outputTable += '</div>'
        });
        outputTable += '</div></div>';

        outputTable += '<div class="accordion refsAccordionContainer" hidden><a class="accordion-toggle" aria-expanded="false" aria-controls="refsAccordion-';
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

      function setFilterPlaceholders() {
        $('.views-exposed-form select').each(function() {
          $(this).attr('data-placeholder','Select ' + $(this).prev('label').text());
        });
      }

      //output sum of decision column to counters
      function setCounterValues() {
        console.log('setting counter values');
        let upheldValue = 0;
        let overturnedValue = 0;
        let overturnedPartValue = 0;

        $('.public-appeals-data').DataTable().column(3, {search: 'applied'}).data().filter(function( value, index ) {

          if ($(value).text().toLowerCase().includes('upheld')) {
            upheldValue++;
          }
          else if ($(value).text().toLowerCase().includes('overturned in part')) {
            overturnedPartValue++;
          }
          else if ($(value).text().toLowerCase().includes('overturned')) {
            overturnedValue++;
          }

          return value;
        });

        $('.upheldValue').text(upheldValue);
        $('.overturnedValue').text(overturnedValue);
        $('.overturnedPartValue').text(overturnedPartValue);

      }

      function tableSetup() {

        $('.views-page-public-appeal-search .counters').append('<div class="upheldCounter"><span class="upheldValue"></span> Upheld</div><div class="overturnedCounter"><span class="overturnedValue"></span> Overturned</div><div class="overturnedPartCounter"><span class="overturnedPartValue"></span> Overturned-in-part</div>');
        $('.views-page-public-appeal-search .refs-include').append('<input type="checkbox" id="references-included" name="references-included" value="references-included"><label for="references-included">Include References in Search</label>');
        $('#references-included').on('change', referencesClickHandler);

        if (refsSelected) {
          //$('#references-included').attr('checked','true');
        }

        setCounterValues();
        $('.public-appeals-data').DataTable().on( 'search.dt', function() {
          setCounterValues();
        });

        //add mobile filter toggle functionality
        $('.mobile-open').on('click',function(evt) {
          $('#block-exposedformpublic-appeal-searchpublic-appeals-search-page').css({
            'overflow': 'visible',
            'clip': 'auto',
            'height': 'auto',
            'width': '100%'
          });
        });

        //add tooltip toggle and functionality
        let tooltipToggle = $('.tooltip-toggle-container').append('<a href="#" class="tooltip-toggle">i</a>');
        let clickedOn = true;

        if ($('#block-publicappealssearchtooltip').css('display') == 'none') {
          let clickedOn = false;
          $(tooltipToggle).on('mouseenter mouseleave', function(evt) {
            evt.preventDefault();
            $('#block-publicappealssearchtooltip').toggle();
          });
        }

        $(tooltipToggle).on('click', function(evt) {
          evt.preventDefault();
          if (clickedOn) {
            $(tooltipToggle).on('mouseenter mouseleave', function(evt) {
              evt.preventDefault();
              $('#block-publicappealssearchtooltip').toggle();
            });
            clickedOn = false;
          }
          else {
            $('#block-publicappealssearchtooltip').show();
            $(tooltipToggle).off('mouseenter mouseleave');
            clickedOn = true;
          }
        });

        //add counter icons to decisions column
        $('.table-decision-value').each(function() {

          if ($(this).find('div').text().toLowerCase().includes('upheld')) {
            $(this).find('div').addClass('upheld');
          }
          else if ($(this).find('div').text().toLowerCase().includes('overturned in part')) {
            $(this).find('div').addClass('overturned-in-part');
          }
          else if ($(this).find('div').text().toLowerCase().includes('overturned')) {
            $(this).find('div').addClass('overturned');
          }
        });

        $('.public-appeals-data').DataTable().rows().every(function(rowIndex) {
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
          dom: '<"search-filter"f<"tooltip-toggle-container"><"refs-include">><"mobile-open"><"counters">liB<"expand-wrapper">rtBp',
          columnDefs: [
            { targets: [11], visible: true, searchable: refsSelected },
            { targets: [10], visible: true, searchable: true }
          ],
          buttons: [
            { extend: 'csv', text: 'Export', tag: 'a' }
          ],
          language: {
            info: 'Showing _START_ to _END_ of _TOTAL_ Results',
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
          }
        });
      }

      function referencesClickHandler(evt) {
        if (refsSelected) {
          $('.public-appeals-data').DataTable().context[0].aoColumns[11].bSearchable = false;
          refsSelected = false;

          $('.public-appeals-data').DataTable().rows().every(function() {
            $(this.child()).find('.refsAccordionContainer').attr('hidden','hidden');
          });
        }
        else {
          $('.public-appeals-data').DataTable().context[0].aoColumns[11].bSearchable = true;
          refsSelected = true;

          $('.public-appeals-data').DataTable().rows().every(function() {
            $(this.child()).find('.refsAccordionContainer').removeAttr('hidden');
          });
        }
        $('.public-appeals-data').DataTable().rows().invalidate().draw();
      }

      $('.public-appeal-search-view>table', context).once('appealsSearch').each(function() {
        buildTable();
      });

      $('.views-exposed-form', context).once('appealsSearch').each(function() {
        setFilterPlaceholders();
      });

      $('.mobile-close').once('appealsSearch').on('click',function(evt) {
        console.log('mobile open clicked');
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

})(jQuery, Drupal, this);
