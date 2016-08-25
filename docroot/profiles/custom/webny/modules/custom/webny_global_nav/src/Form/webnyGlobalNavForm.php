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
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_name'] = $this->webnyGlobalNavAgencyNameField();
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_format'] = $this->webnyGlobalNavheaderFormatField();
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_menu'] = $this->webnyGlobalNavHeaderMenuField();
    $form['webny_global_nav_header_fieldset']['webny_global_nav_header_auto'] = $this->webnyGlobalNavHeaderAutoField();
    $form['webny_global_nav_footer_fieldset'] = $this->webnyGlobalNavFooterFieldsetField();
    $form['webny_global_nav_footer_fieldset']['webny_global_nav_footer_auto'] = $this->webnyGlobalNavFooterAutoField();
    $form['webny_global_nav_footer_fieldset']['webny_global_nav_footer_menu'] = $this->webnyGlobalNavFooterMenuField();
    $form['webny_global_nav_footer_fieldset']['webny_global_nav_social_media_fieldset'] = $this->webnyGlobalNavsocialMediaFieldsetField();
    $form['webny_global_nav_footer_fieldset']['webny_global_nav_social_media_fieldset']['webny_global_nav_social_media'] = $this->webnyGlobalNavSocialMediaField();

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
    $config->set('webny_global_nav.agencyname', $form_state->getValue('webny_global_nav_header_name'));
    $config->set('webny_global_nav.headerformat', $form_state->getValue('webny_global_nav_header_format'));
    $config->set('webny_global_nav.headermenu', $form_state->getValue('webny_global_nav_header_menu'));
    $config->set('webny_global_nav.headerauto', $form_state->getValue('webny_global_nav_header_auto'));
    $config->set('webny_global_nav.footerauto', $form_state->getValue('webny_global_nav_footer_auto'));
    $config->set('webny_global_nav.footermenu', $form_state->getValue('webny_global_nav_footer_menu'));
    $config->set('webny_global_nav.socialmediablogger', $form_state->getValue('socialmediablogger'));
    $config->set('webny_global_nav.socialmediadelicious', $form_state->getValue('socialmediadelicious'));
    $config->set('webny_global_nav.socialmediafacebook', $form_state->getValue('socialmediafacebook'));
    $config->set('webny_global_nav.socialmediafeed', $form_state->getValue('socialmediafeed'));
    $config->set('webny_global_nav.socialmediaflickr', $form_state->getValue('socialmediaflickr'));
    $config->set('webny_global_nav.socialmediafoursquare', $form_state->getValue('socialmediafoursquare'));
    $config->set('webny_global_nav.socialmediagithub', $form_state->getValue('socialmediagithub'));
    $config->set('webny_global_nav.socialmediagoogle-plus', $form_state->getValue('socialmediagoogle-plus'));
    $config->set('webny_global_nav.socialmediainstagram', $form_state->getValue('socialmediainstagram'));
    $config->set('webny_global_nav.socialmedialinkedin', $form_state->getValue('socialmedialinkedin'));
    $config->set('webny_global_nav.socialmediamail', $form_state->getValue('socialmediamail'));
    $config->set('webny_global_nav.socialmediapinterest', $form_state->getValue('socialmediapinterest'));
    $config->set('webny_global_nav.socialmediareddit', $form_state->getValue('socialmediareddit'));
    $config->set('webny_global_nav.socialmediashare', $form_state->getValue('socialmediashare'));
    $config->set('webny_global_nav.socialmediatumblr', $form_state->getValue('socialmediatumblr'));
    $config->set('webny_global_nav.socialmediatwitter', $form_state->getValue('socialmediatwitter'));
    $config->set('webny_global_nav.socialmediavimeo', $form_state->getValue('socialmediavimeo'));
    $config->set('webny_global_nav.socialmediayelp', $form_state->getValue('socialmediayelp'));
    $config->set('webny_global_nav.socialmediayoutube', $form_state->getValue('socialmediayoutube'));

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
      '#title' => t('Agency header options'),
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
      '#title' => t('Agency footer options'),
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
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
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
      'vertical stacked' => 'Vertical',
    );
    return array(
      '#type' => 'select',
      '#title' => t('Agency navigation header format'),
      '#options' => $format_options,
      '#default_value' => $config->get('webny_global_nav.headerformat'),
      '#multiple' => FALSE,
      '#empty_option' => 'None',
      '#empty_value' => '',
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
    // $menu_list = menu_get_menus(TRUE);
    return array(
      '#type' => 'select',
      '#title' => t('Global navigation header menu'),
      '#options' => $this->webnyGlobalNavGetMenus(),
      '#default_value' => $config->get('webny_global_nav.headermenu'),
      '#multiple' => FALSE,
      '#empty_option' => 'None',
      '#empty_value' => '',
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
      '#title' => t('Global navigation header automatic insertion'),
      '#default_value' => $config->get('webny_global_nav.headerauto'),
      '#multiple' => FALSE,
      '#description' => t('Select if the global header is to be automatically inserted into the page.  If not selected, make sure to use the WebNY Global Navigation Header block'),
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
      '#title' => t('Global navigation footer automatic insertion'),
      '#default_value' => $config->get('webny_global_nav.footerauto'),
      '#multiple' => FALSE,
      '#description' => t('Select if the global footer is to be automatically inserted into the page.  If not selected, make sure to use the WebNY Global Navigation Footer block'),
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
    // $menu_list = menu_get_menus(TRUE);
    return array(
      '#type' => 'select',
      '#title' => t('Global navigation footer menu'),
      '#options' => $this->webnyGlobalNavGetMenus(),
      '#default_value' => $config->get('webny_global_nav.footermenu'),
      '#multiple' => FALSE,
      '#empty_option' => 'None',
      '#empty_value' => '',
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
      $social_media_index_name = 'webny_global_nav.socialmedia' . htmlspecialchars($key);
      $social_media_names[$social_media_index_name] = array(
        '#type' => 'textfield',
        '#title' => t('@social URL', array('@social' => $social_media_name)),
        '#default_value' => $config->get($social_media_index_name),
        '#maxlength' => 128,
        '#size' => 60,
        '#description' => t('Enter the URL for @social.  If left blank, the social media icon will not display.  If no social media icons display, the section will not display.', array('@social' => $social_media_name)),
      );
    }
    $social_media_names['webny_global_nav.socialmediamail']['#description'] .= ' Sample email format is "mailto:someone@example.com?Subject=Hello%20world".';
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
      'feed' => 'RSS Feed',
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
