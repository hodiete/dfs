/**
 * Basic sample plugin inserting callouts into CKEditor editing area.
 */

// Register the plugin within the editor.
(function($) {
    "use strict";

    // ========================================================================================================
    CKEDITOR.dialog.add( 'calloutDialog', function( editor ) {

        return {
            editorName: false,
            title: 'Add/Edit Callouts',
            minWidth: 500,
            minHeight: 300,
            callouts_el: false,

            contents: [
                {
                    id: 'tab-callout',
                    label: 'Callout Settings',
                    elements: [
                        {
                            // THE BODY OF THE CALLOUT
                            type: 'textarea',
                            id: 'callout_body',
                            className: 'callout_body',
                            label: 'Callout: Body Field',
                            inputStyle: 'height: 125px',
                            validate: CKEDITOR.dialog.validate.notEmpty( "Please enter a value for the body of the Callout field." )
                        },
                        {
                            // TEXT FROM THE WYSIWYG
                            type: 'text',
                            id: 'callout_text',
                            name: 'callout_text',
                            label: 'Text to Highlight in Body',
                            validate: CKEDITOR.dialog.validate.notEmpty( "Please enter text that will be highlighted in the body of the page." ),
                        },
                        {
                            type: 'html',
                            html: '<br /><div class="callout-delete-desc-html"><label>Delete Callout?</label><p>Click the \'Delete Callout\' button above to remove this callout from this editor. </p></div>'
                        },
                        {
                            // DELETE BUTTON
                            type: 'button',
                            id: 'delete_callout_entry',
                            label: 'Delete Callout',
                            title: 'Delete this callout.',
                            onClick: function() {

                                // CALLOUTS OBJ CLASS
                                var coObj = CKEDITOR.plugins.callouts;

                                // INSERT DELETED TEXT
                                $(coObj.editorDom.body).empty().append(coObj.editorBodyDeleteHTML);

                                // REMOVE CALLOUT AND CURRENT DIALOG -- HAPPENS BY DEFAULT ON EDIT
                                CKEDITOR.dialog.getCurrent().hide();
                            }
                        },
                        {
                            type: 'html',
                            html: '<br />'
                        }
                    ]
                }
            ],

            onShow: function() {

                // CALLOUTS OBJ CLASS
                var coObj = CKEDITOR.plugins.callouts;

                // EDITOR DOCUMENT AND $
                coObj.editorDom = editor.document.$;

                // GET THE WHOLE TEXT -- JUST IN CASE -- NOT THE MOST EFFICIENT
                coObj.editorBodyHTML         = $(editor.document.$.body).html();
                coObj.editorBodyDeleteHTML   = $(editor.document.$.body).html();

                // FIND IF TEXT IS WITHIN A CALLOUT -- BRING BACK VALUES
                var selectedTag             = coObj.getInlineCalloutTag(editor);
                coObj.selectedHTML          = coObj.getInlineCalloutHTML(editor);
                var classNames              = coObj.getSelInlineCalloutClassNames(editor);

                // =============== EDIT/DELETE CALLOUT ================
                if(selectedTag === 'SPAN' && classNames.indexOf('web-callout') !== -1) {

                    // GET ID OF SPECIFIC CALLOUT BODY VIA DATA ID
                    var icoid = coObj.getInlineCalloutIdNum(editor);

                    // GET CALLOUT BODY HTML -- BACKUPS
                    coObj.bodyClause = $(coObj.editorDom.getElementById('bco-' + icoid));             // GET BODY;
                    $(coObj.editorDom.getElementById('callout-order-' + icoid)).remove();             // REMOVE THE SPAN
                    var calloutBody = $(coObj.editorDom.getElementById('bco-' + icoid)).children('div').html(); // DIV

                    // REMOVE THE ENTIRE BODY BEFORE REBUILDING
                    $(coObj.editorDom.getElementById('bco-' + icoid)).remove();

                    // REMOVE THE INLINE CALLOUT
                    $(coObj.editorDom.getElementById('ico-' + icoid)).remove();

                    // REMOVE THE INLINE CALLOUT NOTE
                    $(coObj.editorDom.getElementById('ico-order-' + icoid)).remove();

                    // SET BODY TO DIALOG
                    this.setValueOf('tab-callout', 'callout_body', calloutBody);

                    // SET THE VALUE OF THE POINT WHERE SELECTED
                    this.setValueOf('tab-callout', 'callout_text', coObj.selectedHTML);

                    // THE KICKER -- DELETE ENTIRE CONTENTS IF NO ENTRIES
                    // REBUILD ADDS NEW INLINE AND BODY FIELDS
                    var innerBodyCalloutHTML    = coObj.getBcoInnerChildrenHTML(coObj.editorDom, coObj.hash);
                    if(innerBodyCalloutHTML === ''){
                        $(coObj.editorDom.getElementById('webny-callouts-section-' + coObj.hash)).remove();
                    }

                    // =============== PREPARE DELETE STRING OBJ ===============

                    // ASSIGN THE NEW DELETE STRING TO THE DELETE STRING PROPERTY
                    coObj.editorBodyDeleteHTML = coObj.prepareDeleteString(editor,icoid);

                } else {
                    // =============== NEW CALLOUT ================
                    // SET THE VALUE OF THE TEXT HIGHLIGHTED
                    this.setValueOf('tab-callout', 'callout_text', editor.getSelection().getSelectedText().toString());
                }

                // SUPPRESSION OR DISPLAY OF THE DELETE BUTTON
                var dialogDelete = $('.callout-delete-desc-html, .cke_dialog_ui_vbox .cke_dialog_ui_button');
                dialogDelete.hide();

                if(calloutBody !== '' && calloutBody !== undefined){
                    dialogDelete.show();
                }

            },
            onOk: function() {

                var dialog = this;

                // GET THE PLUGIN CALLOUT OBJECT
                var coObj = CKEDITOR.plugins.callouts;

                // GET RANDOM ID AND CREATE HASH IF NOT AVAILABLE
                coObj.hash    = coObj.createCalloutHash(editor);
                var randcoid = coObj.hash + coObj.getRandomCalloutId();

                // GET EDITOR
                var thisEditor = coObj.getCurrentEditor();

                // GET VALUES FROM FIELDS
                var co_text = dialog.getContentElement('tab-callout','callout_text').getValue();
                var co_body = dialog.getContentElement('tab-callout','callout_body').getValue();

                // CREATE THE INLINE CALLOUT
                var inline_value = CKEDITOR.dom.element.createFromHtml('<span data-ico="'+randcoid+'" id="ico-'+randcoid+'" ' +
                    'class="web-callout inline-callout callout-'+ randcoid+'">' +
                    co_text + '</span>');

                var inline_note = CKEDITOR.dom.element.createFromHtml('<sup data-ico-order="1" class="ico-order" ' +
                    ' data-ico="'+randcoid+'" id="ico-order-'+randcoid+'"><a href="#callout-order-'+randcoid+'">1</a></sup>');

                // INSERT CALLOUT TAG INLINE
                CKEDITOR.instances[thisEditor].insertElement(inline_value);
                CKEDITOR.instances[thisEditor].insertElement(inline_note);

                // BUILD THE CALLOUT -- RETURN calloutSettings
                    /* PARAMS */
                    // The Current Editor
                    // Generated or pre-existing Hash
                    // Concatenation of hash and rand num
                    // Body field of the dialog
                var calloutSettings = coObj.buildCallouts(CKEDITOR.instances[thisEditor], coObj.hash, randcoid, co_body);

            },
            onCancel: function() {

                // CALLOUTS OBJ CLASS
                var coObj = CKEDITOR.plugins.callouts;

                // EMPTY BODY AND APPEND ORIGINAL BODY IN THE EDITOR
                $(coObj.editorDom.body).empty().append(coObj.editorBodyHTML);

            }
        };
    });

}(window.jQuery));
