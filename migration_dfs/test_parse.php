<?php

define('LOCAL_DIR', '/Sites/local_dfs');
define('DHOST', 'dfs.ny.gov');
// $full_path = "http://$host";

$https_http = (stristr(DHOST, 'dfs-old.dd')) ? 'http' : 'https';
define('HTTP', $https_http);

define('IMAGE_URL', '/sites/default/files/dfs_images/');
define('FILE_URL', '/docs');

$current1 = 'https://dfs.ny.gov/consumer/que_top10/que_life_ter.htm';
$current2 = 'https://dfs.ny.gov/consumer/que_top10/que_life_who.htm';

$a[] = 'que_top10.ht';
$a[] = '../../clife.ht';
$a[] = '../clife.ht';
$a[] = '../faqs/faqs_life.htm';
$a[] = './faqs_life.htm';
$a[] = '../images/secure_portal.gif';



foreach ($a as $href) {

  print "####### current1= $current1 \n####### href= $href\n";
  $absHref = absurl($current1, $href);
  print "----- absHref::  $absHref";
  // $href = nodots($href);
  // print "####### nodts href:: $href #########\n";
  // $path = parse_url($href, PHP_URL_PATH);
  // $dirname = pathinfo(parse_url($href, PHP_URL_PATH));
  //  print "\n parse_url:: \n"; print_r($path); print "\n";
  // print "\n dirname:: \n"; print_r($dirname); print "\n";
  //
  // $base='/';

  print "\n*****************************\n";
}
/**
 * Handle URL to convert to the absolute url path
 * @param  string $pgurl  [parent page URL]
 * @param  string $relUrl [relative url: appliclicen.htm]
 * @return string         [description]
 */
function absurl($pgurl, $relUrl) {
  $absoluteURL = "";
  $basePathDIR = pathinfo(parse_url($pgurl, PHP_URL_PATH), PATHINFO_DIRNAME);

  // print "1: pgurl=$pgurl | relUrl=$relUrl\n";
  $parseArr = parse_url($relUrl);
  if (strstr($relUrl, '#') && isset($parseArr['fragment'])) {
    $absoluteURL = FALSE;
  }
  elseif (stristr($relUrl, 'mailto:')) {
    $absoluteURL = FALSE;
  }
  elseif (strpos($relUrl, 'http') === 0){
    $absoluteURL = 10;
  }
  elseif (strpos($relUrl, '../') === 0) {
    $absoluteURL = handle_double_dots($basePathDIR, $relUrl);
  }
  elseif (strpos($relUrl, './') === 0) {
    $absoluteURL = str_replace('./', '', $relUrl);
    $absoluteURL = ($basePathDIR == '/') ? "/" . $absoluteURL : $basePathDIR . "/" . $absoluteURL;
  }
  elseif (strpos($relUrl, '//') === 0) {
    $absoluteURL = str_replace('//', '/', $relUrl);
  }
  elseif (substr($relUrl, 0, 1) == '/') {
    $absoluteURL = $relUrl;
  }
  else {
    $absoluteURL = ($basePathDIR == '/') ? "/" . $relUrl :  $basePathDIR . "/" . $relUrl;
  }
  return $absoluteURL;
}

/**
 * Handle ../  ../../  ../../../ in URL
 */
function handle_double_dots($basePathDIR, $relUrl) {
  print " base==$basePathDIR\n refUrl = $relUrl\n";
  $absoluteURL = $relUrl;

  $arrPgUrl = explode('/', $basePathDIR);

  if (strpos($relUrl, '../../') === 0) {
    array_pop($arrPgUrl);
    array_pop($arrPgUrl);
    $absoluteURL = str_replace('../../', '/', $relUrl);
  }
  elseif (strpos($relUrl, '../') === 0) {
    array_pop($arrPgUrl);
    $absoluteURL = str_replace('../', '/', $relUrl);
  }

  if (is_array($arrPgUrl) && count($arrPgUrl) > 0) {
    $newBasePathDIR = implode('/', $arrPgUrl);
    // print_r($newBasePathDIR); print " <=== \n";
  }
  else {
    $newBasePathDIR = '/';
  }
  $absoluteURL = str_replace('///', '/', $absoluteURL);
  $absoluteURL = str_replace('//', '/', $absoluteURL);

  $absoluteURL = $newBasePathDIR . $absoluteURL;
  print "FINAL=$absoluteURL \n\n";
  return $absoluteURL;
}
