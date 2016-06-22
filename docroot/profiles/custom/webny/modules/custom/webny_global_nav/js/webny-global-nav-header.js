/*!
 webny-global-nav 1.0.4
 https://github.com/ny/global-navigation
 */

// ClassList Polyfill
// ! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};

//
// AddEvent Polyfill
// ! https://gist.githubusercontent.com/jonathantneal/3748027/raw/d262ccf278902705d61658a2fc5cd60409846b98/eventListener.polyfill.min.js
!window.addEventListener&&function(e,t,n,r,i,s,o){e[r]=t[r]=n[r]=function(e,t){var n=this;o.unshift([n,e,t,function(e){e.currentTarget=n,e.preventDefault=function(){e.returnValue=!1},e.stopPropagation=function(){e.cancelBubble=!0},e.target=e.srcElement||n,t.call(n,e)}]),this.attachEvent("on"+e,o[0][3])},e[i]=t[i]=n[i]=function(e,t){for(var n=0,r;r=o[n];++n)if(r[0]==this&&r[1]==e&&r[2]==t)return this.detachEvent("on"+e,o.splice(n,1)[0][3])},e[s]=t[s]=n[s]=function(e){return this.fireEvent("on"+e.type,e)}}(Window.prototype,HTMLDocument.prototype,Element.prototype,"addEventListener","removeEventListener","dispatchEvent",[])

// VARS
var menuToggle          = document.getElementById("webny-menu-control");
var menuList            = document.getElementById("webny-global-header").getElementsByTagName("ul")[0];
var maxPC               = 1024;
var browserWidth	    = window.innerWidth;
var oriVM               = getViewMode(maxPC,browserWidth);
var linksEvent          = getEventType(maxPC,browserWidth);
var navMenuEvent        = ('ontouchstart' in window) ? "touchend click" : "click";
var dragging            = false;
var smListeners         = [];

// EVENT LISTENERS
document.addEventListener('touchmove', function(){
    dragging = true;
}, false);

document.addEventListener('touchstart', function(){
    dragging = false;
}, false);

// RESIZE LISTENER -- FUTURE DEVELOPMENT FOR RESPONSIVE MENUS
window.addEventListener('resize', function(){

}, false);


// INIT
if (menuList !== null) {

    // OBTAIN MENU ITEMS AND LINKS FOR LISTENERS AND TOGGLING
    var menuItems = getChildren(menuList, 1);
    var menuLinks = getChildren(menuList, 2);

    for (var z = 0; z < menuLinks.length; z++) {
        listenSubMenu(z,menuLinks, linksEvent, browserWidth);
    }

    // MOBILE MENU ICON CLICK LISTENER
    addListenerMulti(menuToggle, navMenuEvent, function (e) {
        mobileMenuIconAction(e);
    });

    // DOCUMENT CLICK LISTENER
    addListenerMulti(document, navMenuEvent, function (e) {
        docuementClickAction(e);
    });
} // END INIT

// MULTI EVENT LISTENER -- OBTAINED ONLINE
function addListenerMulti(el, evs, fn) {
    var evts = evs.split(' ');
    for (var i = 0, iLen = evts.length; i < iLen; i++) {
        el.addEventListener(evts[i], fn, false);
       console.log(fn)
    }
}

// MOBILE ICON ACTION ON LISTENER
function mobileMenuIconAction(e){
    var t = 1;

    if (!dragging) {
        toggleMainMenu(t,menuItems);
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
}

// DOCUMENT ACTION ON LISTENER
function docuementClickAction(e){

    if (!menuIsActive(e.target) && !dragging) {
        toggleMainMenu(false,menuItems);
    }

    // PREVENTS MOVING TO PAGE WITH CHILD LINKS
    if (e.target.getAttribute('href') == '#' || e.target.nextElementSibling != null) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

// GET CHILDREN OF NODES
function getChildren(id, elem){

    // this could be fixed (querySelectorAll)
    var i = [];
    for(var x = 0; x < id.childNodes.length; x++){
        if(id.childNodes[x].nodeType === 1) {
            if(elem == 1) {
                i.push(id.childNodes[x]);
            } else {
                i.push(id.childNodes[x].childNodes[0]);
            }
        }
    }
    return i;
}

// SUBMENU LISTENER
function  listenSubMenu(q, menuLinks, linksEvent, bwd) {

    if (menuLinks[q].nodeType === 3) {
        menuLinks[q] = menuLinks[q].nextSibling;
    }

    // DETERMINE EVENT BASED ON BROWSER
    linksEvent = getEventType(maxPC, bwd);

    smListeners[q] = function () {

        var l = this.parentNode.getElementsByTagName('ul')[0];
        if (l && !dragging) {
            toggleSubMenus(q);
        }
    };

    addListenerMulti(menuLinks[q], linksEvent, smListeners[q]);

}

// CHECK IF MENU IS ACTIVE
function menuIsActive(child) {

    var node = child.parentNode;

    while (node !== null) {
        if ((node.className || '').indexOf('webny-global-active') > -1) {
            return true;
        }

        node = node.parentNode;
    }
    return false;
}

// TOGGLE THE MAIN MENU ITEMS -- (LI) Elements
function toggleMainMenu(button) {

    if (menuList.classList.contains('webny-global-active')) {
        // Remove active class for main menu
        menuList.removeAttribute("class");
        menuToggle.removeAttribute("class");
    } else {
        // Add active class for main menu
        if (button) {
            menuList.classList.add('webny-global-active');
            menuToggle.classList.add('webny-global-active');
        }
    }

    for (var i = 0; i < menuItems.length; i++) {
        // Remove active class for sub menu
        //menuItems[i].classList.remove('webny-global-active');
        //menuItems[i].classList.remove('webny-global-inactive');

        menuItems[i].removeAttribute("class");


    }
}

// TOGGLE SUBMENU ITEMS
function toggleSubMenus(item) {

    var active = 1;
    if (menuItems[item].classList.contains('webny-global-active')) {
        menuItems[item].removeAttribute("class");
        active = 0;
    } else if (menuItems[item].classList.contains('webny-global-inactive')) {
        menuItems[item].removeAttribute("class");
        menuItems[item].classList.add('webny-global-active');
    } else {
        menuItems[item].classList.add('webny-global-active');
    }

    for (var i = 0; i < menuItems.length; i++) {
        if (i !== item) {
            if (active === 0) {
                if (menuItems[i].classList.contains('webny-global-inactive')) {
                    menuItems[i].removeAttribute("class");
                }
            } else {
                if (menuItems[i].classList.contains('webny-global-active')) {
                    menuItems[i].removeAttribute("class");
                    menuItems[i].classList.add('webny-global-inactive');
                } else {
                    menuItems[i].classList.add('webny-global-inactive');
                }
            }
        }
    }
}

// DETERMINE EVENT BASED ON BROWSER
function getEventType(maxPC,browserWidth){

    var ev;

    if (browserWidth >= maxPC) {
        ev = 'mouseover';
    } else {
        ev = ('ontouchstart' in window) ? "touchend click" : "click";
    }
    return ev;
}

// DETERMINE VIEW MODE
function getViewMode(maxPC,bw){

    var mode;
    if (bw >= maxPC) {
        mode = 'PC';
    } else {
        mode = 'Mobile';
    }
    return mode;
}
