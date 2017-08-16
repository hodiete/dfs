/**
 * Basic sample plugin inserting callouts into CKEditor editing area.
 */

// Register the plugin within the editor.
(function($) {
    "use strict";

    CKEDITOR.plugins.add('webny_callouts', {

        init: function(editor) {

            // Add some CSS tweaks:
            var css = 'span.inline-callout {color: #fff; background-color: #f55; margin-left: 2px; margin-right: 2px;' +
                'padding: 3px 5px; border-left: 2px solid #000; border-right: 2px solid #000} ' +
                'div.inline-callout-section { display: none }' +
                '#delete_callout_entry{ background-color: #c22; color: #fff; font-style:bold;}';
            CKEDITOR.addCss(css);

            // ========================================================================================================
            // ADDS THE DIALOG COMMAND -- THE DIALOG TO THE CALLOUT LOGIC
            editor.addCommand( 'calloutDialog', new CKEDITOR.dialogCommand('calloutDialog'), {

            });

            CKEDITOR.dialog.add('calloutDialog', this.path + 'dialogs/calloutDialog.js' );

            // ========================================================================================================
            // THIS ADDS THE BUTTON TO THE EDITOR
            editor.ui.addButton('WebNYCallouts', {
                label: Drupal.t('Create or Edit a Callout'),
                command: 'calloutDialog',
                icon: this.path + 'icons/webny_callouts_sm.png',
            });

            // ========================================================================================================
            // CHECK FOR THE CKEDITOR BEING EDITED
            editor.on('instanceReady', function (e) {
                var currentEditorName = null;
                for (var id in CKEDITOR.instances) {
                    CKEDITOR.instances[id].on('focus', function(e) {

                        // SET CURRENT EDITOR NAME
                        CKEDITOR.plugins.callouts.setCurrentEditor(e.editor.name);
                    });
                }
            });
        }

    }); // END PLUGIN ADD

}(window.jQuery));

// CREATE SUB OBJECT METHODS AND PROPERTIES AS HELPERS
CKEDITOR.plugins.callouts = {

    // JS PROPS
    cen: null,
    cida: [],
    calloutSectionTag: null,
    salt: null,
    saltBag: [],
    hash: null,
    hashLength: 7,
    spanClause: null,
    bodyClause: null,
    editorHTMLObj: null,
    editorBodyHTML: null,
    editorBodyDeleteHTML: null,
    selectedHTML: null,
    editorDom: null,

    // JS METHODS
    /*
        SETS THE CURRENT EDITOR IN USE
     */
    setCurrentEditor: function(cen){
        this.cen = cen;
    },
    /*
     GETS THE CURRENT EDITOR
     */
    getCurrentEditor: function() {
        return this.cen;
    },

    setSaltBag: function(){},

    getSaltBag: function(){
        return this.saltBag;
    },

    /*
        GENERATES A RANDOM ID
     */
    getRandomCalloutId: function() {

        // GET RANDOM UP TO 100 ID, ENSURE NOT TAKEN IN CIDSECTION ARRAY -- via cida
        var rnum = Math.floor(Math.random() * 9999) + 1;

        if(this.cida.indexOf(rnum) === -1 ){
            this.cida.push(rnum);
            return rnum;

        } else {
            // RECALL
            this.getRandomCalloutId();
        }
    },
    /*
        SET THE CALLOUT BODY TAG FOR NEW ENTRIES
        Return: String
     */
    setCalloutBodySectionTag: function(hash){
        return '<div data-ckhash="'+hash+'" id="webny-callouts-section-'+hash+'" ' +
            'class="webny-callouts-section inline-callout-section"><div class="webny-callout-inner">';
    },
    /*
       GET THE CALLOUT BODY TAG
       Return: String hash
    */
    getCalloutBodySectionTag: function(editor){
        return editor.document.$.getElementsByClassName('webny-callouts-section');
    },
    getSectionTagId: function(editor){
        return $(editor.document.$.getElementsByClassName('webny-callouts-section')).attr('id');
    },

    createCalloutHash: function(editor){

        // GET THE EDITOR ID
        var editorID    = editor.id;

        // GET THE NUMERIC VALUE OF THE EDITOR ID
        var editorIDNum = editorID.substring(4,10);

        // VAR FOR NEW HASH
        var newHash     = null;

        // THERE IS A SALT IN THE DOM FOR THIS EDITOR -- USE THIS SALT
        if(this.getCalloutBodySectionTag(editor).length > 0){

            // GET CURRENT HASH, SET IT TO THE CALLOUT STRING, PUSH TO SALTBAG
            newHash = this.getSectionTagId(editor).substring(23,40);

        } else {

            // CREATE A NEW CALLOUT TAG WITH A NEW HASH
            newHash = this.checkSaltBag(null, this.saltBag);
        }

        return newHash;

    },
    buildCallouts: function(editor, hash, newCalloutID, newBody) {

        // REORDER IF POSSIBLE
        var fixedCalloutBody = this.rebuildCalloutBody(editor);

        if(fixedCalloutBody !== null){
            $(editor.document.$.getElementsByClassName('webny-callouts-section')).remove();
            $(editor.document.$.body).append(fixedCalloutBody);
        }

        // INIT VARS
        var calloutBody, calloutMarker, calloutText, icoString, bcoString, calloutHash, curCalloutNum = null;

        // GET TOTAL EDITOR AND CALLOUTS
        var calloutsInlineArray     = editor.document.$.getElementsByClassName('inline-callout');

        // GET THE BODY OBJECT OF THE CURRENT EDITOR
        this.editorHTMLObj          = editor.document.$.body;
        this.hash = hash;
        console.log('HASH ================================== ' + hash)

        // SET THE SECTION TAG STRING AND ASSIGN IT TO THE CALLOUT SECTION HTML
        this.calloutSectionTag = this.setCalloutBodySectionTag(this.hash);
        var calloutSectionHTML = this.calloutSectionTag;

        // REBUILD CALLOUT BODY SECTION WITH CALLOUT NUMBERS AND BODY
        if(calloutsInlineArray.length > 0){
            for (var x = 0; x < calloutsInlineArray.length; x++) {

                calloutMarker   = x + 1;
                calloutText     = calloutsInlineArray[x].innerHTML;
                icoString       = calloutsInlineArray[x].id;
                bcoString       = this.reassignCalloutID(icoString);
                curCalloutNum   = icoString.substring(4,20);


                console.log('CALLOUT ID: ' + icoString)
                console.log('STRING: ' + bcoString)
                console.log('CURRENT: ' + curCalloutNum)
                console.log('NEW: ' + newCalloutID)
                console.log(' ')


                // GET NEW ENTRY
                if(curCalloutNum === newCalloutID){

                    // ASSIGN THE BODY FIELD FROM THE DIALOG
                    calloutBody = newBody;

                // GET PREEXISTING TEXT
                } else {

                    // REMOVE THE FIRST DIV AND SPAN - GET RESULTING HTML
                    $(editor.document.$.getElementById('callout-order-' + curCalloutNum)).remove(); // REMOVE SPAN
                    calloutBody = $(editor.document.$.getElementById(bcoString)).children().html(); // DIV

                }

                // CREATE NEW ENTRY
                calloutSectionHTML += '<div data-ckhash="'+this.hash+'" data-bco="'+curCalloutNum+'" ' +
                    'id="' + bcoString + '" class="body-callouts callout-' + curCalloutNum + '">' +
                      '<div class="body-callouts-inner"><span data-order="'+ calloutMarker +'" ' +
                      'id="callout-order-'+curCalloutNum+'" ' +
                      'class="callout-order inline-callout-order callout-order-'+ calloutMarker +'">' + calloutMarker +'</span> ' +
                    calloutBody.trim() +
                    '</div></div>';

                calloutBody = null;
            }
        }

        // CLOSE THE HTML OF THE CALLOUT SECTION
        calloutSectionHTML += '</div></div>';

        // REMOVE ANY CALLOUT BODY SECTION - APPEND THE NEW CALLOUT SECTION HTML TO THE BOTTOM OF THE EDITOR BODY
        if(editor.document.$.getElementById('webny-callouts-section-'+this.hash) !== null){
            $(editor.document.$.getElementById('webny-callouts-section-'+this.hash)).remove();
        }

        // APPEND THE CALLOUT SECTION TO THE EDITOR
        $(this.editorHTMLObj).append(calloutSectionHTML);

        // UPDATE THE ELEMENT
        editor.updateElement();

        // RETURN THE HASH OF VALUES
        return calloutSettings = {
            'hash': this.hash
        }
    },

    // REBUILD CALLOUT BODY ORDER
    // TAKES THE CURRENT EDITOR BODY OBJ editor.$.body
    rebuildCalloutBody: function(editor){

        var calloutBodyHTML = '';

        // CHECK THE EDITOR FOR THE webny-callouts-section CLASS EXISTENCE
        if(editor.document.$.getElementsByClassName('webny-callouts-section').length > 0){

            // INNER VARIABLES
            var id = '';
            var orderNum = null;

            // EASY ACCESSORS
            var ckhash                  = $(editor.document.$.getElementsByClassName('webny-callouts-section')).attr('data-ckhash');
            var calloutInnerObj         = $(editor.document.$.getElementsByClassName('webny-callout-inner')).html();
            calloutBodyHTML             = this.setCalloutBodySectionTag(ckhash);
            var calloutBodyText         = '';

            // TRAVERSE EACH INLINE ENTRY
            $(calloutInnerObj).each(function (index, value) {

                // LOOP VARS
                id = $(value)[0].dataset.bco;
                orderNum = parseInt(index + 1);

                // REMOVE INNER SPAN WITH PREEXISTING ORDER
                $(value).find('span.callout-order').remove();
                calloutBodyText = $(value).children().html();

                // CREATE NEW ENTRY
                calloutBodyHTML += '<div data-ckhash="'+ckhash+'" data-bco="'+id+'" ' +
                    'id="bco-' + id + '" class="body-callouts callout-' + id + '">' +
                    '<div class="body-callouts-inner"><span data-order="'+ orderNum +'" ' +
                    'id="callout-order-'+id+'" ' +
                    'class="callout-order inline-callout-order callout-order-'+ orderNum +'">' + orderNum +'</span> ' +
                    calloutBodyText +
                    '</div></div>';

            });

            calloutBodyHTML += '</div></div>';
        }

        return calloutBodyHTML;

    },

    // BUILD TEMP EDITOR HTML STRING TO PREP FOR A DELETE
    prepareDeleteString: function(editor,icoid){

        var ds = '';

        // GO THROUGH EACH DOM OBJ IN THE CKEDITOR BODY
        $(this.editorBodyDeleteHTML).each(function (index, value) {

            // CHECK EACH ELEMENT
            if($(value).find('span#ico-'+icoid).length > 0){

                $(value).find('span#ico-'+icoid).contents().unwrap();
                ds += $(value)[0].outerHTML;

            } else {

                if($(value)[0].classList[0] === 'webny-callouts-section'){

                    // REORDER CALLOUT BODY AREA
                    ds += CKEDITOR.plugins.callouts.rebuildCalloutBody(editor);

                } else {
                    ds += $(value)[0].outerHTML;
                }
            }
        });

        return ds;
    },


    /* HELPER CALLOUT METHODS */
    getInlineCalloutHTML: function(editor) {
        return editor.getSelection().getStartElement().getHtml();
    },
    getInlineCalloutTag: function(editor) {
        return editor.getSelection().getStartElement().$.tagName;
    },
    getSelInlineCalloutClassNames: function(editor){
        return editor.getSelection().getStartElement().$.className;
    },
    getInlineCalloutIdNum: function(editor){
        return editor.getSelection().getStartElement().$.dataset['ico'];
    },
    getBcoInnerChildrenHTML: function(editorDom, hash){
        return $(editorDom.getElementById('webny-callouts-section-' + hash)).children().html();
    },

    /*
        ADDS A BODY SECTION ID TO MATCH WITH INLINE CALLOUT
    */
    reassignCalloutID: function(id){
        return 'bco-'+id.substring(4,17);
    },

    /*
        CREATE SALT FOR IDS
     */
    calloutSalter: function() {

        // SALT STRING
        var salt = '';

        // POTENTIAL VALUES FOR SALTER
        var pvals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for(var q=0; q<this.hashLength; ++q) {
            salt += pvals.charAt(Math.floor(Math.random() * pvals.length));
        }

        return salt;
    },

    checkSaltBag: function(salt, bag){

        if(salt === null) {
            salt = this.calloutSalter();
        }

        // IF IN LIST
        if(bag.indexOf(salt) !== -1){

            // CHOSE A NEW SALT
            salt = this.calloutSalter();
            this.checkSaltBag(salt,bag);

        } else { // NOT IN LIST

            // PUSH THE NEW SALT TO THE LIST -- RETURN
            this.saltBag.push(salt);
            return this.salt = salt;
        }
    }

};
