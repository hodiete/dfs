## NDD-174 - Determine frame layout approach

A key element in architecture of the WebNY distribution is determining the approach that will be used to implement a flexible framework of "frames" that can be configured and combined to create home pages and landing pages.

An initial working hypothesis is to use the Paragraphs module instead of Panels as the underlying layout control method, coupled with an insight gleaned during the from an option presented by Raymond Wang as a possible alternative to Paragraphs indicated that Paragraphs supported by Drupal 8's native entity reference and custom display view modes when combined with customized Twig templates should allow creating the kind of flexibility and formatting we're seeking.

**Key Findings**

It mostly worked.  While I didn't actually theme the output, I was able to set up a Landing Page content type with a single paragraphs field, define three frame paragraphs entities, body, featured, fancy (a frame with its own structured content), create a page with a featured frame that had both event and news cards, a body and a fancy frame.  They could be moved around and edited.  A quick check with Workbench Moderation shows that the page can be moderated on a general sense, I didn't check the implications of changes to referenced content.  I didn't see a way to embed a View or Block, it is possible Custom Blocks will work but I didn't check.

**Recommendation**

1. Use Paragraphs to manage frames on a dedicated page.
2. Create frames that don't have content already on the site, use Twig templates to theme.
3. Use entity reference frame for cards, etc, that use content already on the site (e.g. featured frame that references news, event or inner page content), a dedicated Display view mode to pull the correct information into the card, then a Twig template to adjust rendered HTML, especially until or possibly instead of Custom Formatters to allow for rewriting fields into HTML.
4. If necessary extend the frame types with custom module(s) that should be generally useful beyond the distribution.
5. **Recommended next step is to create the visual style library and reference HTML for use by frame development efforts.  This should be done early in the next sprint (Meredith and Gregg).**

**Contrib modules**

- **Paragraphs, 8.x-1.0-rc4**<br/>
145 issues, 75 open, 1,097 sites using it, last release 11/2015, commits last 30 days
- **Entity Reference Revisions, 8.x-1.0-rc4**<br/>
44 issues, 21 open, 1,200 sites using it, last release 11/2015, commits last 30 days
- **Custom Formatters, no Drupal 8 release**<br/>
not required for MVP, but might be necessary longer term, can be replaced with custom module and/or dedicated Twig templates

**Custom code required**

- For MVP, none
- Long term, likely for integration with Views output and possible custom field formatter(s)

**Pros**

- Keeps layout simple without using Panels, et al
- Basic UI feels easier than current ny.gov where nodequeues are used to order frames and cards, this is all inclusive.  Could be made better with some dedicated theming and perhaps the addition of custom code (adapted from the D7 module Paragraphs Default) to create pre-structured "templates"
- Once one or two frames are defined and documented, they should be usable as templates for additional frames which should allow the work of developing frames to be spread across multiple developers.

**Cons**

-  **Risks**
  - Both primary contributed modules are only release candidates with no date for full release
  - Possible frame types not accounted for that would have requirements that can't be accommodated within proposed solution
  - Embedded Views and Blocks have not been validated
  - All permutations of Workbench Moderation haven't been validated
  - Not currently translatable, which at this time is not a requirement for WebNY
  - If Custom Formatters turns out being part of long term solution, might require WebNY to develop a Drupal 8 version.  Last update to Drupal 8 status was 3 months ago, saying it would be next on list to do by module maintainer.

**WebNY integration points**

- This will be a key integration point for the landing page and front page, I expect that a significant percentage of future stories will use this architecture.  Limited, if any, impact on already created features.
- Will require significant theme development to support, likely to require that each frame type and each card type will require custom Twig templates

**3rd party integrations and licensing issues**

- No 3rd party integrations at this point

**Testing notes**

Once implemented, no special testing beyond normal functionality should be required other than ensuring each frame type/implementation is independent, especially visually.

**POC**

Since little documentation on the Drupal 8 version of Paragraphs exists, a test site was built to investigate how components would operate.  Screenshots:

![](http://i.imgur.com/PbUUOLa.png)

Sample landing page edit screen

![](http://i.imgur.com/P0xc6cw.png)
Sample landing page output, no theming

**Level of Effort**

This actually seems like the least level of effort and is distributed a little heavier on the theme side (especially templates).  Once one or two frames are defined and documented, they should be usable as templates for additional frames.



## Other notes: ##

Drupal 8 PARAGRAPHS Resources

https://www.drupal.org/project/paragraphs<br/>
dependency on https://www.drupal.org/project/entity\_reference\_revisions<br/>
unclear interaction with https://www.drupal.org/project/multiversion, which might become necessary for workbench\_moderation

https://www.drupal.org/project/inline\_entity\_form might be interesting, not sure it is compatible

Bug building a paragraph type of entity references, filed issue https://www.drupal.org/node/2671278<br/>
  -- work around by being careful to have content types defined before creating paragraph and ensuring all required options are completed before clicking Save

Drupal 8 Paragraphs documentation at https://www.drupal.org/node/2444881, short parent and 2 child pages

http://www.webwash.net/drupal/tutorials/how-create-powerful-container-paragraphs-drupal-8

https://www.commercialprogression.com/post/paragraphs-are-drupals-answer-structured-content

http://www.webwash.net/drupal/tutorials/build-edge-edge-sites-using-paragraphs-module-drupal-8



The default paragraphs template is in paragraphs-item.html.twig.

It uses theme suggestions for other templates, the following suggestions are available:

  paragraph\_\_[view\_mode] (e.g. paragraph--default.html.twig)

  paragraph\_\_[type] (e.g. paragraph--image.html.twig)

  paragraph\_\_[type]\_\_[view\_mode] (e.g. paragraph--image--default.html.twig)

Possible related layout issues:

  https://www.drupal.org/node/2449347, Can we use layout\_plugin module to provide different templates for paragraphs

  https://www.drupal.org/project/layout\_plugin

  https://www.drupal.org/node/2426961, How to apply layout to form and display

Possible integration with Views:  https://www.drupal.org/node/2527620, actually might be more for exposing Paragraphs to Views

Using my test install I see

<!-- THEME HOOK: 'paragraph' -->

<!-- FILE NAME SUGGESTIONS:

   \* paragraph--featured-frame--default.html.twig

   \* paragraph--featured-frame.html.twig

   \* paragraph--default.html.twig

   x paragraph.html.twig

-->

    <!-- THEME HOOK: 'field' -->

    <!-- FILE NAME SUGGESTIONS:

       \* field--paragraph--field-test-reference--featured-frame.html.twig

       \* field--paragraph--field-test-reference.html.twig

       \* field--paragraph--featured-frame.html.twig

       \* field--field-test-reference.html.twig

       \* field--entity-reference.html.twig

       x field.html.twig

    -->

        <!-- THEME HOOK: 'node' -->

        <!-- FILE NAME SUGGESTIONS:

           \* node--20--frame-card.html.twig

           \* node--20.html.twig

           \* node--webny-news--frame-card.html.twig

           \* node--webny-news.html.twig

           \* node--frame-card.html.twig

           x node.html.twig

        -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--title--webny-news.html.twig

               x field--node--title.html.twig

               \* field--node--webny-news.html.twig

               \* field--title.html.twig

               \* field--string.html.twig

               \* field.html.twig

            -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--body--webny-news.html.twig

               \* field--node--body.html.twig

               \* field--node--webny-news.html.twig

               \* field--body.html.twig

               x field--text-with-summary.html.twig

               \* field.html.twig

            -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--field-webny-news-image--webny-news.html.twig

               \* field--node--field-webny-news-image.html.twig

               \* field--node--webny-news.html.twig

               \* field--field-webny-news-image.html.twig

               \* field--image.html.twig

               x field.html.twig

            -->

            <!-- THEME HOOK: 'image\_formatter' -->

            <!-- THEME HOOK: 'image' -->

        <!-- THEME HOOK: 'node' -->

        <!-- FILE NAME SUGGESTIONS:

           \* node--32--frame-card.html.twig

           \* node--32.html.twig

           \* node--event-test--frame-card.html.twig

           \* node--event-test.html.twig

           \* node--frame-card.html.twig

           x node.html.twig

        -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--title--event-test.html.twig

               x field--node--title.html.twig

               \* field--node--event-test.html.twig

               \* field--title.html.twig

               \* field--string.html.twig

               \* field.html.twig

            -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--field-start-date--event-test.html.twig

               \* field--node--field-start-date.html.twig

               \* field--node--event-test.html.twig

               \* field--field-start-date.html.twig

               \* field--datetime.html.twig

               x field.html.twig

            -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--field-event-picture--event-test.html.twig

               \* field--node--field-event-picture.html.twig

               \* field--node--event-test.html.twig

               \* field--field-event-picture.html.twig

               \* field--image.html.twig

               x field.html.twig

            -->

        <!-- THEME HOOK: 'node' -->

        <!-- FILE NAME SUGGESTIONS:

           \* node--2--frame-card.html.twig

           \* node--2.html.twig

           \* node--webny-news--frame-card.html.twig

           \* node--webny-news.html.twig

           \* node--frame-card.html.twig

           x node.html.twig

        -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--title--webny-news.html.twig

               x field--node--title.html.twig

               \* field--node--webny-news.html.twig

               \* field--title.html.twig

               \* field--string.html.twig

               \* field.html.twig

            -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--body--webny-news.html.twig

               \* field--node--body.html.twig

               \* field--node--webny-news.html.twig

               \* field--body.html.twig

               x field--text-with-summary.html.twig

               \* field.html.twig

            -->

            <!-- THEME HOOK: 'field' -->

            <!-- FILE NAME SUGGESTIONS:

               \* field--node--field-webny-news-image--webny-news.html.twig

               \* field--node--field-webny-news-image.html.twig

               \* field--node--webny-news.html.twig

               \* field--field-webny-news-image.html.twig

               \* field--image.html.twig

               x field.html.twig

            -->



Possible addon modules to look at/help port

https://www.drupal.org/project/apachesolr\_paragraphs

https://www.drupal.org/project/paragraphs\_pack

https://www.drupal.org/project/classy\_paragraphs

https://www.drupal.org/project/entity\_background

https://www.drupal.org/project/paragraphs\_defaults