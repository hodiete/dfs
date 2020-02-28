<?php

/**
 * @file
 * Contains \Drupal\public_appeal_sync\Controller\ResponseListingController.
 */
namespace Drupal\public_appeal_sync\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;


/**
 * Class ResponseListingController
 *  public_appeal_sync admin page.
 */
class ResponseListingController extends ControllerBase
{

  /**
   * Returns a render-able array for a test page.
   */
  public function content()
  {
    // You can create a file and save data at once .
    $dir = \Drupal::config('public_appeal_sync.outdir')->get('outdir');
    $dir2 = "public://$dir";
    // $dir2 = drupal_realpath($dir2);
    $listFiles = file_scan_directory($dir2, '/report*/');
    krsort($listFiles);
    // print_r($listFiles); exit;
    $strList = "<h2>List of Reports: Import Public Appeal JSON data</h2>";
    $i = 0;

    foreach ($listFiles as $key=>$file) {
      if ($i<52) {
        $strList .= file_create_url($key) . "<br>\n";
      }
      else {
        break;
      }
      $i++;
    }
    $build = [
      '#markup' => $strList,
    ];
    return $build;

  }

  /**
   * Returns a render-able array for a admin page.
   */
  public function adminPage()
  {
    // You can create a file and save data at once .
    $link1 = Link::createFromRoute(t('Configuration of public_applea_syn module'), 'public_appeal_sync.form')->toString();
    $link2 = Link::createFromRoute(t('List of Reports after importing JSON data'), 'public_appeal_sync.response')->toString();
    $link3 = Link::createFromRoute(t('Manually import JSON data'), 'public_appeal_sync.manual_import_form')->toString();
    $link4 = Link::createFromRoute(t('Manually purge 6-year Data'), 'public_appeal_sync.manual_purge_data_form')->toString();


    $build = [
      '#markup' => "<h1>Admin the module public_appeal_sync</h1><hr><h2>$link1</h2><h2>$link2</h2><h2>$link3</h2><hr><h2>$link4</h2>",
    ];
    return $build;

  }

}