(function ($, Drupal, window, document) {
  "use strick";

  var $sticky = $('.sticky');
  var $stickyrStopper = $('.sticky-stopper');

  var $sticky2  = $('#webny-global-header');

  if (!!$sticky.offset()) { 
    stickNavigation($sticky, $stickyrStopper);
  }
  else{
    stickNavigation($sticky2, $stickyrStopper );

  }



  function stickNavigation($sticky, $stickyrStopper) {

    console.log('jQuery sticky ready!');

    if (!!$sticky.offset()) { // make sure ".sticky" element exists
    
      var generalSidebarHeight = $sticky.innerHeight();
      var stickyTop = $sticky.offset().top;
      if ($sticky.lenght) {
        // stickyTop = $sticky.offset().top;
      }
    

    
      var stickOffset = 0;
      var stickyStopperPosition = 0;
    
      if ($stickyrStopper.length){
        stickyStopperPosition = $stickyrStopper.offset().top;
    
      }
    
      var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
      var diff = stopPoint + stickOffset;
    
      $(window).scroll(function(){ // scroll event
        var windowTop = $(window).scrollTop(); // returns number
        // console.log($sticky);
        // console.log(stickyTop);
        if (stopPoint < windowTop) {
            $sticky.css({ position: 'absolute', top: diff });
        } else if (stickyTop < windowTop+stickOffset) {
            $sticky.css({ position: 'fixed', top: stickOffset });
        } else {
          $sticky.css({ position: 'relative', top: 'initial'});
        }
      });
    
    }// End if
  }

})(jQuery, Drupal, this);