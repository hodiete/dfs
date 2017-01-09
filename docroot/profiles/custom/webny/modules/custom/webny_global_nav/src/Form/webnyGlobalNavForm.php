<?php

namespace Drupal\webny_global_nav\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\system\Entity\Menu;

/**
 * Class webnyGlobalNavForm.
 */
class WebnyGlobalNavForm extends ConfigFormBase {

  /**
   * Fucntion getFormid.
   */
  public function getFormId() {
    return 'webny_global_nav_form';
  }

  /**
   * Function buildForm.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Form constructor.
    $form = parent::buildForm($form, $form_state);
    // Default settings.
    $config = $this->config('webny_global_nav.settings');

    $form['webny_global_nav_header_fieldset'] = $this->webnyGlobalNavHeaderFieldsetField();
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_auto'] = $this->webnyGlobalNavHeaderAutoField();
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_name'] = $this->webnyGlobalNavAgencyNameField();
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_format'] = $this->webnyGlobalNavheaderFormatField();
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_menu'] = $this->webnyGlobalNavHeaderMenuField();

    $form['webny_global_nav_footer_fieldset'] = $this->webnyGlobalNavFooterFieldsetField();
    $form['webny_global_nav_footer_fieldset']['webny_global_nav_footer_auto'] = $this->webnyGlobalNavFooterAutoField();
    $form['webny_global_nav_footer_fieldset']['webny_global_nav_footer_format'] = $this->webnyGlobalNavFooterFormatField();
    $form['webny_global_nav_footer_fieldset']['webny_global_nav_footer_menu'] = $this->webnyGlobalNavFooterMenuField();

    $form['webny_global_nav_social_media_fieldset'] = $this->webnyGlobalNavsocialMediaFieldsetField();
    $form['webny_global_nav_social_media_fieldset']['webny_global_nav_social_description'] = $this->webnyGlobalNavSocialMediaDescriptionField();
    $form['webny_global_nav_social_media_fieldset']['webny_global_nav_social_media'] = $this->webnyGlobalNavSocialMediaField();

    return $form;
  }

  /**
   * Function validate Form.
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * Function submitForm.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $config = \Drupal::configFactory()->getEditable('webny_global_nav.settings');
    $config->set('webny_global_nav.agencyname',   $form_state->getValue('webny_global_nav_header_name'));
    $config->set('webny_global_nav.headerformat', $form_state->getValue('webny_global_nav_header_format'));
    $config->set('webny_global_nav.headermenu',   $form_state->getValue('webny_global_nav_header_menu'));
    $config->set('webny_global_nav.headerauto',   $form_state->getValue('webny_global_nav_header_auto'));

    $config->set('webny_global_nav.footerauto',              $form_state->getValue('webny_global_nav_footer_auto'));
    $config->set('webny_global_nav.footerformat',            $form_state->getValue('webny_global_nav_footer_format'));
    $config->set('webny_global_nav.footermenu',              $form_state->getValue('webny_global_nav_footer_menu'));
    $config->set('webny_global_nav.socialmedia.blogger',     $form_state->getValue('socialmedia_blogger'));
    $config->set('webny_global_nav.socialmedia.delicious',   $form_state->getValue('socialmedia_delicious'));
    $config->set('webny_global_nav.socialmedia.facebook',    $form_state->getValue('socialmedia_facebook'));
    $config->set('webny_global_nav.socialmedia.feed',        $form_state->getValue('socialmedia_feed'));
    $config->set('webny_global_nav.socialmedia.flickr',      $form_state->getValue('socialmedia_flickr'));
    $config->set('webny_global_nav.socialmedia.foursquare',  $form_state->getValue('socialmedia_foursquare'));
    $config->set('webny_global_nav.socialmedia.github',      $form_state->getValue('socialmedia_github'));
    $config->set('webny_global_nav.socialmedia.google-plus', $form_state->getValue('socialmedia_google-plus'));
    $config->set('webny_global_nav.socialmedia.instagram',   $form_state->getValue('socialmedia_instagram'));
    $config->set('webny_global_nav.socialmedia.linkedin',    $form_state->getValue('socialmedia_linkedin'));
    $config->set('webny_global_nav.socialmedia.mail',        $form_state->getValue('socialmedia_mail'));
    $config->set('webny_global_nav.socialmedia.pinterest',   $form_state->getValue('socialmedia_pinterest'));
    $config->set('webny_global_nav.socialmedia.reddit',      $form_state->getValue('socialmedia_reddit'));
    $config->set('webny_global_nav.socialmedia.share',       $form_state->getValue('socialmedia_share'));
    $config->set('webny_global_nav.socialmedia.tumblr',      $form_state->getValue('socialmedia_tumblr'));
    $config->set('webny_global_nav.socialmedia.twitter',     $form_state->getValue('socialmedia_twitter'));
    $config->set('webny_global_nav.socialmedia.vimeo',       $form_state->getValue('socialmedia_vimeo'));
    $config->set('webny_global_nav.socialmedia.yelp',        $form_state->getValue('socialmedia_yelp'));
    $config->set('webny_global_nav.socialmedia.youtube',     $form_state->getValue('socialmedia_youtube'));

    $config->save();

    return parent::submitForm($form, $form_state);
  }

  /**
   * Function getEditableConfigNames.
   */
  protected function getEditableConfigNames() {

    return [
      'webny_global_nav.settings',
    ];
  }

  /**
   * Webny Global Navigation header fieldset field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavHeaderFieldsetField() {
    return array(
      '#type' => 'fieldset',
      '#title' => t('Global header navigation options'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );
  }

  /**
   * Webny Global Navigation footer fieldset field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavFooterFieldsetField() {
    return array(
      '#type' => 'fieldset',
      '#title' => t('Global footer navigation options'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );
  }

  /**
   * Webny Global Navigation social media fieldset field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavSocialMediaFieldsetField() {
    return array(
      '#type' => 'fieldset',
      '#title' => t('Social media options'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );
  }

  /**
   * Webny Global Navigation social media label field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavSocialMediaDescriptionField() {
    return array(
        '#type' => 'label',
        '#title' => t('When entering a URL for the social fields, please use a fully qualified domain name with the protocol prefix, for example: http://thesocialnetwork.com/suffix.<br/> If left blank, the social media icon and link will not display.<br />NOTE: The Global Footer MUST be enabled above for social media links to display.'),
    );
  }


  /**
   * Webny Global Navigation agency name field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavAgencyNameField() {
    $config = $this->config('webny_global_nav.settings');
    return array(
      '#type' => 'textfield',
      '#title' => t('Agency name'),
      '#default_value' => $config->get('webny_global_nav.agencyname'),
      '#maxlength' => 128,
      '#size' => '60',
      '#description' => t('Enter the agency name for the global navigation.  You can use &#60;br&#47;&#62; to cause the name to split.'),
    );
  }

  /**
   * Webny Global Navigation agency grouping color field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavHeaderFormatField() {
    $config = $this->config('webny_global_nav.settings');
    $format_options = array(
      'horizontal stacked' => 'Horizontal - stacked',
      'horizontal unstacked' => 'Horizontal - unstacked',
    );
    return array(
      '#type' => 'select',
      '#title' => t('Header format options'),
      '#options' => $format_options,
      '#default_value' => $config->get('webny_global_nav.headerformat'),
      '#multiple' => FALSE,
      '#description' => t('Select which header format to use.'),
    );
  }

  /**
   * Webny Global Navigation header menu selection field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavHeaderMenuField() {
    $config = $this->config('webny_global_nav.settings');
    $menu_list = $this->webnyGlobalNavGetMenus();
    $default_menu = $config->get('webny_global_nav.headermenu');

    return array(
      '#type' => 'select',
      '#title' => t('Header menu'),
      '#options' => $menu_list,
      '#default_value' => $default_menu,
      '#multiple' => FALSE,
      '#description' => t('Select which menu to use in the global header.  If the menu has more than 7 first level item, all are output which might cause formatting issues.'),
    );
  }

  /**
   * Webny Global Navigation header automatic insertion field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavHeaderAutoField() {
    $config = $this->config('webny_global_nav.settings');
    return array(
      '#type' => 'checkbox',
      '#title' => t('Enable the Global Navigation Header'),
      '#default_value' => $config->get('webny_global_nav.headerauto'),
      '#multiple' => FALSE,
      '#description' => t('Check this box to enable the Global Navigation Header into this website.'),
    );
  }

  /**
   * Webny Global Navigation footer automatic insertion field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavFooterAutoField() {
    $config = $this->config('webny_global_nav.settings');
    return array(
      '#type' => 'checkbox',
      '#title' => t('Enable the Global Navigation Footer'),
      '#default_value' => $config->get('webny_global_nav.footerauto'),
      '#multiple' => FALSE,
        '#description' => t('Check this box to enable the Global Navigation Footer into this website.'),
    );
  }

  /**
   * Webny Global Navigation agency footer style.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavFooterFormatField() {
    $config = $this->config('webny_global_nav.settings');
    $format_footer_options = array(
        'footer-vertical' => 'Columned Menu - Vertical List (Default)',
        'footer-horizontal' => 'Inline list of links - Horizontal List',
    );
    return array(
        '#type' => 'select',
        '#title' => t('Footer format options'),
        '#options' => $format_footer_options,
        '#default_value' => $config->get('webny_global_nav.footerformat'),
        '#multiple' => FALSE,

        '#description' => t('Select which footer format to use. The Columned Menu option will align links vertically 
        with the top level menu item as the column name and the menu\'s sublinks as general links below. The Inline 
        list of links takes the top level menu links and lists them horizontally. No sub menu links will display for 
        the Inline list of links option.'),
    );
  }

  /**
   * Webny Global Navigation footer menu selection field.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavFooterMenuField() {
    $config = $this->config('webny_global_nav.settings');
    $menu_list = $this->webnyGlobalNavGetMenus();
    $default_menu = $config->get('webny_global_nav.footermenu');

    return array(
      '#type' => 'select',
      '#title' => t('Footer menu'),
      '#options' => $menu_list,
      '#default_value' => $default_menu,
      '#multiple' => FALSE,
      '#description' => t('Select which menu to use in the global footer.  The first level menu items will be the column headers.  If the menu has more than 5 first level item, all are output which might cause formatting issues.'),
    );
  }

  /**
   * Webny Global Navigation social media fields.
   *
   * @return array
   *   Form API element for field.
   */
  public function webnyGlobalNavSocialMediaField() {
    $config = $this->config('webny_global_nav.settings');
    $social_media_list = $this->webnyGlobalNavSetupSocialNames();
    $social_media_names = array();

    foreach ($social_media_list as $key => $social_media_name) {
      $social_media_index_name = 'webny_global_nav.socialmedia.' . htmlspecialchars($key);
      $inputname = 'socialmedia_'.$key;
      $social_media_names[$inputname] = array(
        '#type' => 'textfield',
        '#title' => t('@social URL', array('@social' => $social_media_name)),
        '#default_value' => $config->get($social_media_index_name),
        '#maxlength' => 128,
        '#size' => 60,
        '#description' => t('Enter the URL for @social.', array('@social' => $social_media_name)),
        '#required' => FALSE,
        '#tree' => TRUE,
      );
    }

    $social_media_names['socialmedia_mail']['#description'] .= ' Sample email format is "mailto:someone@example.com?Subject=Hello%20world".';

    return $social_media_names;
  }

  /**
   * Helper function to set up social media names.
   *
   * @return array $social_media_names
   *   - array indexed by internal name of social media names.
   */
  public function webnyGlobalNavSetupSocialNames() {
    return array(
      'blogger' => 'Blogger',
      'delicious' => 'Delicious',
      'facebook' => 'Facebook',
      'rss' => 'RSS Feed',
      'flickr' => 'Flickr',
      'foursquare' => 'Foursquare',
      'github' => 'GitHub',
      'google-plus' => 'Google+',
      'instagram' => 'Instagram',
      'linkedin' => 'Linkedin',
      'mail' => 'Mail',
      'pinterest' => 'Pinterest',
      'reddit' => 'Reddit',
      'share' => 'Share',
      'tumblr' => 'Tumblr',
      'twitter' => 'Twitter',
      'vimeo' => 'Vimeo',
      'yelp' => 'Yelp',
      'youtube' => 'YouTube',
    );
  }

  /**
   * Function _webny_global_nav_get_menus.
   */
  public function webnyGlobalNavGetMenus($all = TRUE) {
    if ($custom_menus = Menu::loadMultiple()) {
      if (!$all) {
        $custom_menus = array_diff_key($custom_menus, menu_list_system_menus());
      }
      foreach ($custom_menus as $menu_name => $menu) {
        $custom_menus[$menu_name] = $menu->label();
      }
      asort($custom_menus);
    }
    return $custom_menus;
  }

}
