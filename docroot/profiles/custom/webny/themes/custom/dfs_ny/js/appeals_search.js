/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.appealsSearch = {
    attach: function (context, settings) {

      let refsSelected = false;

      function setFilterPlaceholders() {
        $('.views-exposed-form select').each(function() {
          $(this).attr('data-placeholder','Select ' + $(this).prev('label').text());
        });
      }

      function setCounterValues() {
        let upheldValue = 0;
        let overturnedValue = 0;
        let overturnedPartValue = 0;

        $('.views-page-public-appeal-search table').DataTable().column(3, {search: 'applied'}).data().filter(function( value, index ) {

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
        })

        $('.upheldValue').text(upheldValue);
        $('.overturnedValue').text(overturnedValue);
        $('.overturnedPartValue').text(overturnedPartValue);

      }

      function tableSetup() {

        $('.views-page-public-appeal-search .counters').html('<div class="upheldCounter"><span class="upheldValue"></span> Upheld</div><div class="overturnedCounter"><span class="overturnedValue"></span> Overturned</div><div class="overturnedPartCounter"><span class="overturnedPartValue"></span> Overturned-in-part</div>');
        $('.views-page-public-appeal-search .refs-include').html('<input type="checkbox" id="references-included" name="references-included" value="references-included"><label for="references-included">Include References in Search</label>');
        $('#references-included').click(referencesClickHandler);

        if (refsSelected) {
          $('#references-included').attr('checked','true');
        }

        $('.views-page-public-appeal-search table').DataTable().column(11).visible(refsSelected);

        setCounterValues();
        $('.views-page-public-appeal-search table').DataTable().on( 'search.dt', function() {
          setCounterValues();
        });

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

        $('.views-field-summary', context).once('appealsSearch').each(function() {
          console.log('summary?');
          $(this).find('li').each(function() {
            $(this).addClass('summary-container');
            $(this).wrapInner('<div class="summary-content"></div>');
            let sumToggle = $(this).prepend('<a href="#" class="summary-toggle">Summary</a>');
            $(sumToggle).on('click', function(evt) {
              evt.preventDefault();
              $(sumToggle).next('.summary-content').toggle();
            });
          });
        });

        if ($('.views-field-references').length) {
          console.log('has field references');
          $('.views-field-references', context).once('appealsSearch').each(function() {
            console.log(this);
            console.log('ran each');

            //$(this).before('<tr>');
            //$(this).prepend('<div class="pa-table-toggle ref-toggle">References</div><div class="pa-table-toggled>"');
            //$(this).append('</div>');
            //$(this).after('</tr>');

            //let row = document.createElement('tr');

            //row.appendChild(document.createTextNode("Hi there and greetings!"));

            //$(row).append(this);
            //$('tr').after(row);


            //referencesArray.push(this);
            //$(this).detach();
          });
        }
      }

      function referencesClickHandler(evt) {
        $('.views-page-public-appeal-search table').DataTable().destroy();

        let searchableRefs = false;

        if (refsSelected) {
          refsSelected = false;
        }
        else {
          refsSelected = true;
        }

        $('.views-page-public-appeal-search table').dataTable({
          order: [[9, 'asc']],
          ordering: true,
          paging: true,
          pageLength: 10,
          pagingType: 'full_numbers',
          lengthChange: true,
          info: true,
          stateSave: true,
          destroy: true,
          retrieve: true,
          processing: true,
          dom: '<"search-filter"f<"tooltip-toggle-container"><"refs-include">><"mobile-open"><"counters">liB<"expand-wrapper">rtBp',
          columnDefs: [
            { targets: [11], searchable: false }
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
          }
        });

        tableSetup();
      }


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

      $('.views-page-public-appeal-search table', context).once('appealsSearch').each(function() {
        tableSetup();
      });

    }
  };

})(jQuery, Drupal, this);
