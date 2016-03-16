# NDD-116 Whitelisting/External Content

**Date:**  March 14, 2016 

**Who:**  Group, extended by Gregg Marshall

**Problem:**  We want a more general approach to external content, referred to by the digital team as whitelisting.  

**Recommendation:** Create a content type called External Content that will have the following fields, subject to validation:
- Title
- Teaser/summary
- URL
- Image
- Author
- Global Keywords
- Agency Keywords

In addition the In Line Entity Form module should be configured for this content type to allow maintenance from within other content entry screens.

**Reasoning:** During the initial distribution architecture workshop with Raymond Wang from Acquia, when we were discussing the possible use of, or alternatives to, content hub, we outlined the concept of external content, which was felt was equivalent to the ny.gov whitelisted content.  Instead of embedding that information in various content types, having it separate and using entity references everywhere would be more flexible.  In addition, it is possible that the limited fields of the external content type could be exposed as an API and automatically populated between sites and some central location, perhaps ny.gov or another option, where that data could be used by additional sites or ny.gov.
