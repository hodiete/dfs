<?php
namespace Drupal\public_appeal_sync\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;


/**
 * Controller of public_appeal_sync admin page.
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
    $strList = "<h2>List of Responses: Import Public Appeal JSON data</h2>";
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
   * Returns a render-able array for a test page.
   */
  public function adminPage()
  {
    // You can create a file and save data at once .
    $link1 = Link::createFromRoute(t('Configuration of public_applea_syn module'), 'public_appeal_sync.form')->toString();
    $link2 = Link::createFromRoute(t('List of Responses after inpormting JSON data'), 'public_appeal_sync.response')->toString();

    $str = "<h1>Admin public_appeal_sync<h2>$link1</h2><h2>$link2</h2>";
    $build = [
      '#markup' => $str,
    ];
    return $build;

  }

}