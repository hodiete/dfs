(function ($, Drupal, window, document) {
  'use strick';

  let adminNavHeight = 0;
  let breadcrumHeight = 0;
  if ($('#nydfs-breadcrumb').height() > 10) {
    breadcrumHeight = $('#nydfs-breadcrumb').height();
  }

  if ($('#toolbar-bar .toolbar-tab .trigger').height() > 10) {
    adminNavHeight += 45;
  }
  if ($('#toolbar-bar .toolbar-menu .toolbar-icon').height() > 10) {
    adminNavHeight += 46;
  }

  let heroHeight = 0;

  if ($(window).width() >= 1024) {
    if ($('article.hero-layout').height() >= 240) {
      heroHeight = 280 + 50;
    }
    else {
      heroHeight = 50;
    }

  } 
  else {
    if ($('article.hero-layout').height() >= 240) {
      heroHeight = 240;
    }
    else {
      heroHeight = 0;
    }
    if ($(window).width() >= 768) {
      breadcrumHeight += 26;
    }
  }
  
  // console.log('hero ' + heroHeight) ;
  // console.log(`AdminHeiht ` + adminNavHeight);
  let $sticky = $('#sticky-leftmenu').parent('nav');
  let $stickyrStopper = $('.sticky-stopper');
  let $fromTopHeight = ($(window).width() >= 1024) 
    ? 171 + heroHeight + adminNavHeight 
    : 171 + heroHeight + adminNavHeight;
  // console.log(`fromTopHeight ` + $fromTopHeight);
  if ($fromTopHeight >= 410) {
    $fromTopHeight += 10;
  }  
  $fromTopHeight += breadcrumHeight;
  $sticky.css({ position: 'absolute', top: $fromTopHeight });

  let $sticky2 = $('#webny-global-header');
/*
  let scrollHeight = $sticky.height() + $fromTopHeight;
  let wHeight = $(window).height();
  console.log("window:" + $(window).height());
  console.log("sticky:" + $sticky.height() + " | All:" + scrollHeight);
  if (wHeight < $sticky.height() ) {
    return;
  }
  else 
  */
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
    if ($(window).width() < 1024) {
      $("#sticky-leftmenu").slideToggle('fast');
    }
  });

  /**
   * @function
   * @param {object} $sticky 
   * @param {object} $stickyrStopper
   * @param {boolean} $topMenu 
   * @param {number} $fromTopHeight 
   */
  function stickNavigation($sticky, $stickyrStopper, $topMenu = true, $fromTopHeight = 0) {
    // console.log('jQuery sticky ready!');
    /*
    console.log("window:" + $(window).height());
    console.log("sticky:" + $sticky.height());
    if ($(window).height() + $fromTopHeight < $sticky.height()) {
      return; 
    }
    /*
    $w = $(window);
    $w.resize(function () {
      let pos = $w.height() < $sticky.height() ? 'absolute' : 'fixed';
      $sticky.css({ position: pos });
    });
    */

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

      let stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset - 200;
      // var diff = stopPoint + stickOffset - (generalSidebarHeight/2) ;
      let diff = stopPoint + stickOffset;
      $(window).scroll(() => { // scroll event
        // console.log("sticky.offset:");
        // console.log($sticky.offset());
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
        console.log('fromTop = ' + fromTop) ;
        console.log("top: " + $sticky.offset().top);
        console.log("height: " + $(window).height());

        // if ($sticky.offset().top < $(window).height() ){
        //   // let pos =  'absolute' : 'fixed';
        //   // $sticky.css({ position: 'absolute' });
        // } 
        // else      
        if ($topMenu && windowTop <= 90) {
          $sticky.css({ position: 'relative', top: 'initial' });
          // console.log('windowTop = ' + windowTop);
        } else {          
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
        }


      });
    }// End if
  }
}(jQuery, Drupal, this));
