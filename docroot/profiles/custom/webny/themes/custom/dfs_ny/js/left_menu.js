(function ($, Drupal, window, document) {
  "use strick";

  // var $sticky = $('.sticky');
  var $sticky = $('#sticky-leftmenu').parent('nav');
  var $stickyrStopper = $('.sticky-stopper');
  var $fromTopHeight = ($(window).width() >= 1024 )? 510 : 386 ;

  $sticky.css({ position: 'absolute', top: $fromTopHeight });

  var $sticky2  = $('#webny-global-header');

  if (!!$sticky.offset()) { 
    stickNavigation($sticky, $stickyrStopper, false, $fromTopHeight);
  }
  else{
    stickNavigation($sticky2, $stickyrStopper, true );

  }

  /*
  *  toggle the left menu on mobile
  */

  $("#block-dfs-ny-complaints-menu").click(function () {
    $("#sticky-leftmenu").toggle('fast');
  });


  function stickNavigation($sticky, $stickyrStopper, $topMenu = true, $fromTopHeight = 0) {

    // console.log('jQuery sticky ready!');
    var myPosition, fromTop;
    if (!!$sticky.offset()) { // make sure ".sticky" element exists
      var myPosition = ($topMenu) ? 'relative' : 'absolute' ;
      if($topMenu){
        myPosition = 'relative';
        fromTop = 0;
      } else {
        myPosition = 'absolute';
        fromTop = $fromTopHeight;
      }
      
    
      var generalSidebarHeight = $sticky.innerHeight();
      var stickyTop = $sticky.offset().top;
      if ($sticky.lenght) {
        // stickyTop = $sticky.offset().top;
      }
    

    
      var stickOffset = 10;
      var stickyStopperPosition = 0;
    
      if ($stickyrStopper.length){
        stickyStopperPosition = $stickyrStopper.offset().top;
    
      }
    
      var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
      // var diff = stopPoint + stickOffset - (generalSidebarHeight/2) ;
      var diff = stopPoint + stickOffset;
      $(window).scroll(function(){ // scroll event
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
        }else {
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

})(jQuery, Drupal, this);