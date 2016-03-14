# KSS Style Guide for WebNY Distribution

This web site is built using Sass and component-based styles. This front-end style guide documents the design components and the Sass variables, functions and mixins used to build the site.

## Organization

We categorize our CSS styles to make them easy to find and apply to our HTML.

- Base: These are the default base styles applied to HTML elements.
- Components: Design components are reusable design elements which can be applied using just the CSS class names specified in the component.
- Forms: Form components are specialized design components that are applied to forms or form elements.
- Layouts: The layout styling for major parts of the page that are included with the theme.
- Colors and Sass: Colors used throughout the site. And Sass documentation for mixins, etc.

While our styles are organized as above in the style guide, our Sass files are organized in a file hierarchy like this:

- config: Sass needed to load variables, 3rd-party libraries and custom mixins and
  functions.
- reset: attempt to reduce inconsistencies and normalize styles. This reset file is based on ???
- base: default HTML styles
- components: component-based styles
- layout: component styles that only apply layout to major chunks of the page
- style-guide: some helper files needed to build this automated style guide

If you are doing WebNY distribution development please check this style guide for the classes which may address the styling needs of your design element/code. If you do not find your design element already defined in this style guide and you are going to be building it, please refer to existing design elements to understand expected construction and follow the [Drupal 8 coding standards standards](https://www.drupal.org/coding-standards/css/architecture)
 