/**
 * @file
 * navigator toc javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.webnyNavigator = {
    attach: function (context, settings) {
      //var fixed_header_top;
      //if($('.sidebar').length > 0) fixed_header_top = -$('.sidebar').position().top + 50;

      $('.featured-card--field-webny-card-pg-title').waypoint(function(direction) {
        console.log('Scrolled to waypoint!');
      });
    }
  };

})(jQuery, Drupal, this);

/*(function($) {
  NY.OneStopArticle = {
    deep_linking: false,
    highlightMenuItem:function(title){
      var $anchor = $(".sidebar li").removeClass("active").find("a:contains('"+title+"')").parent().addClass('active');
      if($anchor.position()) $(".sidebar .arrow").css({top: Math.round($anchor.position().top+$anchor.height()/2 + 2) + 'px'});
    },

    calloutContainerWaypoints:function(){
      $('.callout-container').waypoint(function(direction) {
        var shouldBeStuck = direction === 'down';
        var $container = $(this).parents('.chapter').find('.callout-container');
        $container.toggleClass('active', shouldBeStuck);
      }, {offset: 80});
      $('.chapter .nyCallout').waypoint(function(direction) {
        var shouldBeStuck = direction === 'down';
        var scrollTop = $(window).scrollTop();
        var $callouts =  $(this).parents('.chapter').find('.nyCallout').removeClass('active');
        $(this).addClass('active');
        var index = $callouts.index(this);
        var $container = $(this).parents('.chapter').find('.callout-container');
        var distance = $container.offset().top;
        if(scrollTop - distance > 0) $container.addClass('active');
        $container.find('.callout').removeClass('active').eq(index).addClass('active');
        var $els = $callouts.filter(':lt('+(index+1)+')');
        _.each($els, function(el) {
          var $el = $(el);

          distance = $el.offset().top;

          index = $callouts.index(el);
          var $callout = $container.find('.callout').eq(index);
          $callout.toggleClass('hide', scrollTop - distance > 0);
        });
      }, {offset: '33.333%'});
    },
    init:function(){
      var fixed_header_top;
      if($('.sidebar').length > 0) fixed_header_top = -$('.sidebar').position().top + 50;
      if($('body').hasClass('node-type-news')) fixed_header_top = -$('.article-content').position().top + 50;;

      // direction is defined by waypoints
      $('.nygov-custom-node-layout > header, .taxonomy-term--full > header').waypoint(function(direction) {
        var shouldBeStuck = direction === 'down';
        $('.sidebar, .actions, .nygov-custom-node-layout > header').toggleClass('stuck', shouldBeStuck);
      }, { offset: fixed_header_top});
      $('.chapter').waypoint(function(direction) {

        var title = $(this).find('.field--name-field-title').text();
        $('.chapter').not($(this)).find('.callout-container').removeClass('active');
        NY.OneStopArticle.highlightMenuItem(title);
      }, {offset: '20%'});

      $('.chapter .divider').waypoint(function(direction) {
        var shouldBeStuck = direction === 'down';
        $(this).parents('.chapter').toggleClass("active", shouldBeStuck);
      }, {offset: 'bottom-in-view'});

      $('.chapter .next-section').waypoint(function(direction) {
        var shouldBeStuck = direction === 'up';
        $(this).toggleClass('stuck', shouldBeStuck);
      }, {offset:'bottom-in-view'});
      $('.chapter .divider').waypoint(function(direction) {
        var shouldBeStuck = direction === 'up';
        $('.callout-container').removeClass('active');
      }, {offset: 0});
      $('.sidebar li a').on('click', function(e) {
        e.preventDefault();
        //calculate destination place
        if($(this).parents('li').hasClass("see-all")){
          $(this).parents('.sidebar').toggleClass('open');
          return;
        }
        var dest = 0;
        var name = this.hash.replace("#", "");
        var $anchor = $('a[name="'+name+'"]');
        if ($anchor.offset().top > $(document).height() - $(window).height()) {
          dest = $(document).height() - $(window).height();
        } else {
          dest = $anchor.offset().top;
        }
        var that = this;
        //go to destination
        $('html,body').animate({
          scrollTop: dest - 100
        }, 500, 'swing', function(){
          NY.OneStopArticle.highlightMenuItem($(that).text());
        });
        hashTagActive = this.hash;
        if(NY.OneStopArticle.deep_linking) {
          window.location.hash = name;
          NY.OneStopArticle.deep_linking = false;
        }
        $(this).parents('.sidebar').removeClass('open');
      });
      $(window).on('hashchange', function() {
        return false;
      });
      $('.next-section .next-section-title').on('click', function() {
        var text = $(this).text();
        if(text && $(this).parents('.chapter').hasClass('active')){
          $('.sidebar li a:contains("'+text+'")').trigger('click');
        }
      });
      $('.next-section .next-section-link').on('click', function(){
        $(this).parent().parent().find('.next-section-title').trigger('click');
      });

      // on load
      $(window).on('load', function() {
        // grab hash from URL (#variable)
        var hash = window.location.hash;
        // if hash exists
        if(hash){
          NY.OneStopArticle.deep_linking = true;
          // trigger a click on the sidebar a where href == hash essentialy loading the page and faking a click moving the scroll down
          $('.sidebar li a[href="'+hash+'"]').trigger('click');
        }
      });
      $(window).on('resize', NY.OneStopArticle.resize).trigger('resize');
    },
    resize:function(){
      var viewWidth = $(window).width();
      var viewHeight = $(window).height();
      _.each($('.chapters .chapter .spacer'), function(el) {
        var $el = $(el);
        $el.css({'min-height':''});
        var height  = $el.parents('.chapter').height();
        $el.css({'min-height': Math.max(20, (viewHeight - height - 100))+'px'});

      });
    }
  }

  Drupal.behaviors.OneStopArticle = {
    attach: function (context, settings) {
      // Add exception to run one stop stuff on news type
      if(($('input[name="enable-onestop"]').size() > 0) || ($('body').hasClass('node-type-news'))){
        NY.OneStopArticle.init();
        // Remove any empty paras on the page
        $('p')
          .filter(function() {
            return $.trim($(this).text()) === '' && $(this).children().length == 0
          })
          .remove();
      }
      // Capture feedback AJAX function
      $('article.nygov-custom-node-layout .feedback button, article.taxonomy-term--full .feedback button').on('click', function(){
        $.ajax({
          url: '/community-feedback/'+ $('#nodetype').val() +'/'+ $('#nodeid').val() +'/'+ $(this).attr('class'),
          success: function(result) {
            if(result == 'yes') {
              var feedback = $('.feedback');
              feedback.find('p.buttons').remove();
              feedback.find('p:first-child').html('Thank you for your help');
            }
          }
        });
      });

    }
  };
}(jQuery));*/