// GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
// WEBNY GLOBAL NAVIGATION JS
// CREATED BY WEBNY

// GLOBAL VARS
$ = jQuery;

// NUMERIC VALUES
var maxDesktop              = 1024; // WEBNY STANDARD
// var maxMob               = 768; // IF STYLES NEEDED UNDER 768 for mobile
var startBrowserWidth       = window.innerWidth;

// MENU OBJECTS -- OBTAIN ALL DOM ELEMENTS / OBJECTS
var menuList            = $('#webny-global-header > ul');
var menuItems           = $('#webny-global-header > ul > li');
var menuNoLink          = $('#webny-global-header > ul > li > span');
var agencyNameLink      = $('#webny-global-header > h1 a');
var menuDrops           = $('#webny-global-header > ul > li > ul');
var drupalLayout        = $('main, .webny-global-footer');
var lastItem            = $('#webny-global-header').find('li.gnav-topli').last();

// MENU CALCULATIONS
var lastItemLeftPos     = 0;
var windowRightPos      = 0;
var lastItemDiff        = 0;

if ($('#webny-global-header').length > 0) {
    var lastItemLeftPos = $(lastItem).position().left;
    var windowRightPos  = $(window).width();
    var lastItemDiff    = (windowRightPos - lastItemLeftPos);
}

// EVENT VARS
var running             = null;     // USED AS A PRECAUTION TO STOP PROPAGATION
                                    // TO SUBMENU ITEMS OF DROPDOWNS
var curViewMode         = getViewMode(maxDesktop,startBrowserWidth);
var changeNavEventMode  = false;
var clickVals           = 'click touchend';

// CLASSES, OBJ, ID SHORTS
var _nav_inactive       = 'webny-global-inactive';
var _nav_active         = 'webny-global-active';
var _gnav_ul            = 'gnav-ul';
var _gnavitems          = 'gnav-mitems';
var _gnav_items_ul      = 'gnav-items-ul';
var gnav_subm_items     = '.gnav-items-ul > li';
var menu_control        = '#webny-menu-control';

// GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG

// ############################################################################
// LOAD INIT
$(document).ready(function(){

    // ADD CLASSES
    var addClassList = [
        [menuList,  _gnav_ul],
        [menuItems, _gnavitems],
        [menuDrops, _gnav_items_ul],
    ];

    // ADD INIT CLASSES TO ELEMENTS PREPROC
    addClasses(addClassList);

    // ADD ARIA EXPAND ATTRIBuTE
    addAriaExpand(menuItems, false);
    addAriaHidden(menuDrops, true);

    // RESPONSIVE LISTENER
    responsiveNav();

    // NORMAL NAV LOADER
    if(curViewMode === 'Desktop'){
        desktop_mode();
    } else { // MOBILE NAV LOADER
        mobile_mode();
    } // END ELSE

});

// ############################################################################
// END INIT

// ============================================================================
// MAIN DESKTOP MODE
function desktop_mode(){

    // ADD TAB INDEX TO MENU ITEMS WITH NO LINKS
    if($(menuItems).children().length > 1 ) {
        $(menuNoLink).attr('tabindex', 0);
    }

    // SET HANDLER
    $(menuItems).hover(
        function(){ // OVER
            addAriaExpand(this, true);
            addAriaHidden(menuDrops, false);
            changeClass(this,_nav_active,_nav_inactive);
        },
        function(){ // OUT
            addAriaExpand(menuItems, false);
            addAriaHidden(menuDrops, true);
            changeClass(this,'',_nav_active);
        }
    );

    // SET TAB HANDLER FOR THE GLOBAL NAV SETION OF THE PAGE
    $(menuItems).keyup(function(e){

        if(e.which === 9 || e.value === 9){

            // GET LAST ELEMENT TO DETERMINE IF LI HAS SUBMENUS
            if( $(this).children().last().hasClass('gnav-items-ul') ){
                addAriaExpand(menuItems, false);
                addAriaExpand(this, true);
                addAriaHidden(menuDrops, false);
                $(menuItems).removeClass('webny-global-active');
                $(this).addClass('webny-global-active');
            } else {
                // CASE FOR SINGLE ITEMS
                resetToDeafultNavState();
            }
        }
    });

    // SET RIGHT ALIGN ON LAST SUBMENU IF IT EXISTS AND IS WIDER THAN VIEWPORT
    if (lastItemDiff < 300) {
        // last item is less than 300 width. Make ul right aligned
        $(lastItem).find('ul').css('right', '0');
    }

    // RESET NAV HEADER TO DEFAULT STATE -- FROM HEADER TITLE
    keyupCall(agencyNameLink);

    // RESET NAV HEADER TO DEFAULT STATE -- FROM DRUPAL'S LAYOUT CONTAINER
    keyupCall(drupalLayout);

} // END DESKTOP VIEW

// ============================================================================
// MOBILE VIEW
function mobile_mode(){

    // LOOP EACH TOP LEVEL MENU ITEM --
    // ADD HASH TO THOSE ELEMENTS WITH CHILDREN
    $.each($('.'+_gnavitems), function (i,v) {
        if($(this).children().last().hasClass(_gnav_items_ul )){
            $(this).children().first().attr('href','#');
        }
    });

    // HREF WILL GO TO URI
    $(document).on(clickVals, gnav_subm_items,function(){
        running = true; // SET TO TRUE TO ALLOW LINKS TO GO TO DESTINATIONS
    });

    // CASE INACTIVE LINKS
    $(document).on(clickVals,'.gnav-ul > .gnav-mitems', function(e){

        // LI IS NOT ACTIVE
        if(!$(this).hasClass('webny-global-active')) {

            // LINKS AS NORMAL
            if($(this).children().last().hasClass('gnav-items-ul')){

                // DISPLAY ALL INACTIVE
                $(menuItems).addClass(_nav_inactive);

                addAriaExpand(this, true);
                addAriaHidden(menuDrops, false);

                // MAKE THIS ACTIVE
                changeClass(this, _nav_active, _nav_inactive);

                // REMOVE DISPLAY NONE STYLE
                $(this).removeAttr('style'); // FOR DISPLAY NONE

                // STOP PROPAGATION AND PREVENT THE LINK FROM GOING TO HREF
                e.preventDefault();
                e.stopPropagation();

                // RESET RUNNING
                running = null;
            }

            // LI IS ACTIVE
        } else {

            // LI HAS UL/LI CHILDREN -- IF NOT DO NOTHING
            if($(this).children().last().hasClass('gnav-items-ul') && running !== true) {
                e.preventDefault();
                e.stopPropagation();

                // MAKE ALL INACTIVE
                addAriaExpand(menuItems, false);
                addAriaHidden(menuDrops, true);
                changeClass(menuItems, '', _nav_active);
                changeClass(menuItems, '', _nav_inactive);
            }
        }
    });

    // MAIN BUTTON TOGGLE FOR MOBILE
    $(document).on(clickVals, menu_control, function(e){

        e.stopPropagation();
        e.preventDefault();

        if($(this).hasClass(_nav_active)){
            $(this).removeClass(_nav_active);
            $('.'+_gnav_ul).removeClass(_nav_active);
        } else {
            $(this).addClass(_nav_active);
            $('.'+_gnav_ul).addClass(_nav_active);
            changeClass(this,_nav_active,_nav_inactive);
        }
    });

} // END MOBILE VIEW

// ============================================================================
// RESPONSIVE VIEW
function responsiveNav(){

    $(window).resize(function(){

        // DETERMINE IF MOBILE AND SHOULD BE DESKTOP
        if(window.innerWidth >= maxDesktop && curViewMode === 'Mobile'){
            curViewMode = 'Desktop';
            changeNavEventMode = true;
        }

        // DETERMINE IF DESKTOP AND SHOULD BE MOBILE
        if(window.innerWidth < maxDesktop && curViewMode === 'Desktop'){
            curViewMode = 'Mobile';
            changeNavEventMode = true;
        }

        // IF A CHANGE IS IN ORDER
        if (changeNavEventMode){
            if(curViewMode === 'Mobile'){
                $(menuItems).unbind('mouseenter').unbind('mouseleave');
                mobile_mode();
            }

            if(curViewMode === 'Desktop'){

                $(document).off('click touchend',gnav_subm_items);
                $(document).off('click touchend','.gnav-ul > .gnav-mitems');
                $(document).off('click touchend', menu_control);

                desktop_mode();
            }

            // ASSIGN FALSE AFTER CHANGE IS MADE
            changeNavEventMode = false;
        }
    });

} // END RESPONSIVE NAV

// ============================================================================
// ADD CLASSES TO VARIOUS HTML ELEMENTS
/**
 * @param cl array     -> Array of class,id selectors / elements
 *                         and classes to add
 */
function addClasses(cl){
    for (var i=0;i<cl.length;++i){
        $(cl[i][0]).addClass(cl[i][1]);
    }
}

// ============================================================================
// CHANGE CLASSES
/**
 * @param sel   str    -> Given class,id selector or element
 * @param cladd str    -> Class to add to sel
 * @param clrm  str    ->  Class to remove from sel
 */
function changeClass(sel,cladd,clrm){
    $(sel).removeClass(clrm).addClass(cladd);
}

// ============================================================================
// OBTAIN THE STARTING VIEW OF THE BROWSER
/**
 * @param string maxDesktop     -> Max desktop width
 * @param string bw             -> Current Browser Width
 */
function getViewMode(maxDesktop,bw){

    var mode;
    if (bw >= maxDesktop) {
        mode = 'Desktop';
    } else {
        mode = 'Mobile';
    }
    return mode;
}

// ============================================================================
// DEFINE ARIA EXPANDED
/**
 * @param el obj        -> Target Element
 * @param vbool bool    -> boolean setter
 */
function addAriaExpand(el, vbool){
    $(el).attr('aria-expanded', vbool);
}

// ============================================================================
// DEFINE ARIA HIDDEN
/**
 * @param el obj        -> Target Element
 * @param vbool bool    -> boolean setter
 */
function addAriaHidden(el, vbool){
    $(el).attr('aria-hidden', vbool);
}

// ============================================================================
/**
 * RESET THE GLOBAL NAV TO DEFAULTS
 * Return Void
 */
function resetToDeafultNavState(){
    addAriaExpand(menuItems, false);
    addAriaHidden(menuDrops, true);
    $(menuItems).removeClass('webny-global-active');
}

// ============================================================================
/**
 * CALL TO KEYUP ON VARIOUS POTENTIAL ELEMENTS
 * @param el obj        -> Element to call action on keyup
 */
function keyupCall(el){

    $(el).keyup(function(e){
        e.stopImmediatePropagation();
        if(e.which === 9 || e.value === 9){
            resetToDeafultNavState();
        }
    });
}
