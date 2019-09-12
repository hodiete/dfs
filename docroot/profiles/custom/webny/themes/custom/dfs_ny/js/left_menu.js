(function ($) {
  'use strict';
  Drupal.behaviors.stickMenu = {
    attach: function (context, settings) {
      // calculate the height of everything above the content area 
      if ($('#sticky-leftmenu', context)) {
        if ($(window).width() >= 1024) {
          // we have to force this to load after the page does even though we are in a drupal behavior
          $(window).on("load", function() {
            $('#sticky-leftmenu', context).parent('nav').show();
            let heroParent = $('.hero-header', context).parent('article');
            let heroHeight = 0;
            let adminNavHeight = 0;
            let toolbarTray = 0;
            let breadcrumHeight = 0;
            let fromTopHeight = 0;
            let navHeight = 0;
            let nyGovNav = 90;
            let sticky = $('#sticky-leftmenu', context).parent('nav');
            let sticky2 = $('#webny-global-header', context);
            let stickyrStopper = $('.dfs-footer-container', context);
            if ($('#toolbar-bar', context).height() >= 0){
              adminNavHeight = $('#toolbar-bar', context).outerHeight();
            }
            if ($('#toolbar-item-administration-tray', context).height() >= 0){
              toolbarTray = $('#toolbar-item-administration-tray', context).outerHeight();
            }
            if ($('#webny-global-header', context).height() >= 0){
              navHeight = $('#webny-global-header', context).outerHeight();
            }
            if ($('#nydfs-breadcrumb', context).height() >= 0){
              breadcrumHeight = $('#nydfs-breadcrumb', context).outerHeight();
            }
            // console.log('article: ' + heroParent.height())
            // console.log('.hero-header: ' + $('.hero-header').height());
            // console.log('.hero-image: ' + $('.hero-image').height());
            // console.log('.hero-image > div: ' + $('.hero-image > div').height());
            // console.log('.hero-image article: ' + $('.hero-image article').height());
            // console.log('.hero-image picture: ' + $('.hero-image picture').height());
            // console.log('.hero-image picture img: ' + $('.hero-image picture img').height());
            if (heroParent.height() >= 0){
              heroHeight = heroParent.outerHeight();
            }
            fromTopHeight = heroHeight + adminNavHeight + navHeight + nyGovNav + toolbarTray+ breadcrumHeight + 50;
            sticky.css({ position: 'absolute', top: fromTopHeight });
            // console.log(`adminNavHeight ` + adminNavHeight);
            // console.log(`toolbarTray ` + toolbarTray);
            // console.log(`nyGovNav ` + nyGovNav);
            // console.log(`navHeight ` + navHeight);
            // console.log(`heroHeight ` + heroHeight);
            // console.log(`breadcrumHeight ` + breadcrumHeight);
            // console.log(`fromTopHeight ` + fromTopHeight);
            if (sticky.offset()) {
              stickNavigation(sticky, stickyrStopper, false, fromTopHeight);
            }
          });
        } else {
          // The left menu is superfluous and, worse, broken at smaller sizes. Just use the main menu which does follow the active trail anyways/.
          $('#sticky-leftmenu', context).parent('nav').hide();
        }
      } 
      /*
      *  toggle the left menu on mobile
      */
      $('.leftmenu-toggle-h2', context).click(function () {
        if ($(window).width() < 1024) {
          $("#sticky-leftmenu", context).slideToggle('fast');
        }
      });
      /**
       * @function
       * @param {object} $sticky 
       * @param {object} $stickyrStopper
       * @param {boolean} $topMenu 
       * @param {number} $fromTopHeight 
       */
      function stickNavigation($sticky, $stickyrStopper, $topMenu, $fromTopHeight) {

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
          let stickOffset = 0;
          let stickyStopperPosition = 0;

          if ($stickyrStopper.length) {
            stickyStopperPosition = $stickyrStopper.offset().top;
          }
          else {
            stickyStopperPosition = 800;
          }

          // let stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
          let stopPoint = stickyStopperPosition-generalSidebarHeight;
          //  console.log(stopPoint + " | " + stickyStopperPosition + " | " + generalSidebarHeight + " | " + stickOffset);

          let diff = stopPoint + stickOffset;     

          $(window).scroll(function() { // scroll event
            generalSidebarHeight = $sticky.innerHeight();
            stopPoint = stickyStopperPosition-generalSidebarHeight;
            diff = stopPoint + stickOffset; 
            var windowTop = $(window).scrollTop(); // returns number    
            //console.log('windowTop = ' + windowTop + 'stopTop = ' +stopPoint );
            if ($topMenu && windowTop <= 90) {
              $sticky.css({ position: 'relative', top: 'initial' });
              // console.log('windowTop = ' + windowTop + 'stopTop = ' +stopPoint );
            } else {          
              if (windowTop <= fromTop) {
                $sticky.css({ position: 'absolute', top: fromTop });
                // console.log(' windowTop ' + windowTop + ' : fromTop:' + fromTop);
              } else {
                // console.log(' windowTop ' + windowTop + ' : stopPoint:' + stopPoint);
                if (stopPoint < windowTop) {
                  $sticky.css({ position: 'absolute', top: diff });  
                } else if (stickyTop < windowTop + stickOffset) {
                  // console.log('stickyTop ' + stickyTop);    
                  $sticky.css({ position: 'fixed', top: stickOffset });    
                } else {
                  $sticky.css({ position: myPosition, top: 'initial'});
                }
              }
            }
          });
        }
      }
    }
  };
}(jQuery));