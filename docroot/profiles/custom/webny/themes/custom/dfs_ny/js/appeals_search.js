/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.appealsSearch = {
    attach: function (context, settings) {

      /*function getQueryVariable(variable) {
         var query = window.location.search.substring(1);
         var vars = query.split("&");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == variable){return pair[1];}
         }
         return(false);
      }*/
      //let appealsTable = $('.views-page-public-appeal-search table').DataTable();
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
          //$('.mobile-close').css('display','inline-block');
        });

        if ($('.views-field-references')) {
          console.log('has field references');
          //$('#view-references-table-column').detach();
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
          dom: '<"search-filter"f<"refs-include">><"mobile-open"><"counters">liB<"expand-wrapper">rtBp',
          columnDefs: [
            { targets: [11], searchable: false }
          ],
          buttons: [
            { extend: 'csv', text: 'Export', tag: 'a' },
            { extend: 'print', text: 'Print', tag: 'a' }
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
        //$('.mobile-close').css('display','none');

        //TODO: fix the fact that chosen isn't working with display: none
      });

      $('.views-page-public-appeal-search table', context).once('appealsSearch').each(function() {
        tableSetup();
      });

    }
  };

})(jQuery, Drupal, this);
