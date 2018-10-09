(function ($, Drupal, window, document) {
  'use strick';

  let adminNavHeight = 0;
  if ($('#toolbar-bar .toolbar-tab .trigger').height() > 10) {
    adminNavHeight += 45;
  }
  if ($('#toolbar-bar .toolbar-menu .toolbar-icon').height() > 10) {
    adminNavHeight += 46;
  }

  let heroHeight = 0;
  if ($('article.hero-layout').height() > 240) {
    heroHeight = 510;
  } else {
    heroHeight = 240;
    console.log('hero ' + $('article.hero-layout').height()) ;
  }
  // var $sticky = $('.sticky');
  console.log(`AdminHeiht ` + adminNavHeight);

  let $sticky = $('#sticky-leftmenu').parent('nav');
  let $stickyrStopper = $('.sticky-stopper');
  let $fromTopHeight = ($(window).width() >= 1024) ? heroHeight + adminNavHeight : 386 + adminNavHeight;

  console.log(`fromTopHeight ` + $fromTopHeight);

  $sticky.css({ position: 'absolute', top: $fromTopHeight });

  let $sticky2 = $('#webny-global-header');

  if ($sticky.offset()) {
    stickNavigation($sticky, $stickyrStopper, false, $fromTopHeight);
  }
  else {
    stickNavigation($sticky2, $stickyrStopper, true);
  }

  /*
  *  toggle the left menu on mobile
  */

  $('.leftmenu-toggle-h2').click(() => {
    $("#sticky-leftmenu").slideToggle('fast');
  });




  function stickNavigation($sticky, $stickyrStopper, $topMenu = true, $fromTopHeight = 0) {
    // console.log('jQuery sticky ready!');
    var myPosition, fromTop;
    if ($sticky.offset()) { // make sure ".sticky" element exists
      var myPosition = ($topMenu) ? 'relative' : 'absolute';
      if ($topMenu) {
        myPosition = 'relative';
        fromTop = 0;
      } else {
        myPosition = 'absolute';
        fromTop = $fromTopHeight;
      }


      let generalSidebarHeight = $sticky.innerHeight();
      let stickyTop = $sticky.offset().top;
      if ($sticky.lenght) {
        // stickyTop = $sticky.offset().top;
      }



      let stickOffset = 0;
      let stickyStopperPosition = 0;

      if ($stickyrStopper.length) {
        stickyStopperPosition = $stickyrStopper.offset().top;
      }

      let stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
      // var diff = stopPoint + stickOffset - (generalSidebarHeight/2) ;
      let diff = stopPoint + stickOffset;
      $(window).scroll(() => { // scroll event
        var windowTop = $(window).scrollTop(); // returns number
        // console.log('windowTop ' + windowTop);
        // console.log('diff ' + diff);
        
        // if (windowTop <= fromTop ) {
        //   return;
        // }
        // else {
        //   // stickOffset = Math.abs(fromTop - windowTop);
        // }
        
        // console.log('stickOffset ' + stickOffset);
        if (windowTop <= fromTop) {
          $sticky.css({ position: 'absolute', top: fromTop });
        } else {
          // console.log('windowTop ' + windowTop);
          // console.log('diff ' + diff);
          if (stopPoint < windowTop) {
            $sticky.css({ position: 'absolute', top: diff });

          } else if (stickyTop < windowTop + stickOffset) {
            // console.log('stickyTop ' + stickyTop);
  
            $sticky.css({ position: 'fixed', top: stickOffset });
  
          } else {
            $sticky.css({ position: myPosition, top: 'initial'});
          }

        }

      });
    }// End if
  }
}(jQuery, Drupal, this));
