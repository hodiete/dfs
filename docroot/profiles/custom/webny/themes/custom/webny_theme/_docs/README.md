# D8 Theme Documentation 
Since the purpose of this theme is to use minimal code when starting, we are including the code references and examples in this location.  


#### Creating theme path variables to pass to twig 

Just like in D7, you can create new variables in the preprocess functions that will be rendered within the twig files. 

```
// thunder.theme
function thunder_preprocess_page(&$variables, $hook) {
  $variables['theme_path'] = drupal_get_path('theme', 'thunder');
}
```

#### Creating variables based on user role

You can reference existing classes to create new classes for preprocess functions.

```
// thunder.theme 
function thunder_preprocess_html(&$variables) {
  // Get current user.
  $user = \Drupal::currentUser();
  $roles = $user->getRoles();
  foreach ($roles as $role) {
    $variables['attributes']['class'][] = 'role-' . $role;
  } 
}
```


#### Creating and passing custom variables to twig 

The preprocess functions are essentially the same as D7, with just printing as a twig variable instead of PHP.  

```
// thunder.theme
function thunder_preprocess_node(&$variables) {
  $variables['custom_variable_node_id'] = 'custom-var-' . $variables['node']->nid->value;
}

// node.html.twig 
{{ custom_variable_node_id }}
```

#### Adding in external css files thru theme library

```
// thunder.libraries.yml 
lib:
  css:
    theme:
      '//fonts.googleapis.com/css?family=Open+Sans:400,700,300|Signika:400,700': {}
```   
      

#### Adding in external css files thru preprocess alterations 

```
/**
 * Implements hook_css_alter().
 */
function thunder_css_alter(&$css) {
  // Add CDN Google fonts.
  $googlefonts = '//fonts.googleapis.com/css?family=Open+Sans:400,700,300|Signika:400,700';
  $css[$googlefonts] = array(
    'data' => $googlefonts,
    'type' => 'external',
    'every_page' => TRUE,
    'media' => 'all',
    'preprocess' => FALSE,
    'group' => CSS_AGGREGATE_THEME,
    'browsers' => array('IE' => TRUE, '!IE' => TRUE),
    'weight' => -2,
  );
}
```


#### Common variables available in html.html.twig 
```
{{ attributes }}  Attributes rendered on body tag 
{{ logged_in }}  If user is logged in
{{ is_admin }}  If user is admin
{{ directory }}  Theme directory path  
{{ root_path }}  The root path of the current page
{{ node_type }}  The content type for the current node
{{ css }}  A list of CSS files for the current page
{{ head }}  Markup for the HEAD element
{{ head_title }}  Page title for the TITLE tag
{{ styles }}  Style tags HEAD section.
{{ scripts }}  Script tags for javascript files in HEAD
{{ scripts_bottom }}  Script tags for javascript files in BODY 
{{ html_attributes }}  Attributes on the HTML tag 
{{ db_offline }}  If the database is offline
{{ db_is_active }}  DB is active
{{ dump(user) }}  User object reference 
```

#### Common variables available in page.html.twig 

```
{{ base_path }}  The base path of site 
{{ directory }}  Theme directory path 
{{ attributes }}  Attributes rendered on outside <div>
{{ title }}  Node title if applicable 
{{ front_page }}  Is front page 
{{ language }}  Language variable 
{{ logo }}  Theme logo 
{{ site_name }}  Site name
{{ site_slogan }}  Site slogan 
{{ logged_in }}  If user is logged in
{{ is_admin }}  If user is admin
{{ db_is_active }}  DB is active
{{ dump(page) }}  Page object to be rendered in properties i.e. page.header
{{ dump(user) }}  User object reference 
{{ dump(tabs) }}  Tab object reference 
{{ dump(node) }}  Node object reference 
```

#### Common variables available in node.html.twig 

```
{{ view_mode }}  View mode on nodes 
{{ teaser }}  Teaser content 
{{ node }}  Node object 
{{ date }}  Date information 
{{ author_name }}  Author name  
{{ url }}  Rendered URL information 
{{ content }}  Rendered content information 
{{ attributes }}  Attributes rendered on article tag
{{ directory }}  Theme directory path 
{{ logged_in }}  If user is logged in
{{ is_admin }}  If user is admin
{{ db_is_active }}  DB is active
```


