<?php

/**
 * @file
 * Crawl and parse the webpages of NYDFS, dfs.ny.org.
 * @var [type]
 * Author: Gung Wang
 */

$time_start = microtime(true);
// Running CMD: php -f scrawl_parse_dfs.php arg1 arg2.
if (!isset($argc)) {
  die("argc and argv disabled\n");
}
// Number of arguments passed to the script.
// var_dump($argc);
// The arguments as an array. first argument is always the script name.
// var_dump($argv);
// Eg. 'www.dfs.ny.gov' , 'drupal-8-5-6.dd:8443/dfs'.
// Eg. depth to run recursive call.
$level = $argv[2];
define('LOCAL_DIR', '/Sites/local_dfs');
define('DHOST', $argv[1]);
// $full_path = "http://$host";
$https_http = (stristr(DHOST, 'dfs-old.dd')) ? 'http' : 'https';
define('HTTP', $https_http);
define('IMAGE_URL', '/sites/default/files/dfs_images');
define('FILE_URL', '/docs');
$outArr = $listUrlArr = $listPDFArr = $listWordArr = [];
$listTextArr = $listExcelArr = $listInvalidArr = [];
$outstring = $listUrlstring = $listPDFstring = $listWordstring = "";
$listTextstring = $listExcelstring = $listInvalidstring = "";

/**
 * Contains all contents which will be encoded to json.
 * @var array ['url1'=> array(), 'url2'=>array()]
 */
$nodesJson = [];

_crawl_page(HTTP . "://" . DHOST, $level);

file_put_contents('/Sites/migration/output/url-has-urls.json', json_encode($outArr));
$i = 1;
foreach ($nodesJson as $json) {
  print_r($json['path'][0]['alias']);
  $name = "out_$i.json";
  $dataJson = json_encode($json);
  file_put_contents("/Sites/migration/output/json/$name", $dataJson);
  $i++;
}
print "\n#### Total Pages: " . count($outArr) . "\n";
print "#### Total Jsons: " . count($nodesJson) . "\n";

// Print running time.
$time_end = microtime(true);
$execution_time = ($time_end - $time_start)/60;
print "\n--------- ---------
\nTotal Execution Time: $execution_time Minits\n";

/**
 * Crawl pages recursively.
 * @param  string $url   https://dfs.ny.gov/index.html
 * @param  number $depth 3
 * @return void
 */
function _crawl_page($url, $depth) {
  // print "url = $url | dept = $depth \n";  // print "*";
  global $listInvalidArr, $listInvalidstring, $outArr ;
  static $seen = array();

  if (isset($seen[$url]) || $depth === 0) {
    $outArr = $seen;
    return;
  }
  else {
    $seen[$url] = TRUE;
  }
  // print_r($seen);
  if (!filter_var($url, FILTER_VALIDATE_URL)) {
    $listInvalidArr[] = array('url' => $url);
    $listInvalidstring .= "$url\n";
    return;
  }
  if (!stristr($url, DHOST)) {
    // print "host=" . DHOST . " | url=$url\n";
    return;
  }
  $parseArr = parse_url($url);
  if (strstr($url, '#') && isset($parseArr['fragment'])) {
    return;
  }
  $pathArr = (isset($parseArr['path'])) ? pathinfo($parseArr['path']) : array();
  // Call to generate new content and store data in associat array.
  $dom = new DOMDocument('1.0');
  // We don't want to bother with white spaces.
  $dom->preserveWhiteSpace = FALSE;
  // Most HTML Developers are chimps and produce invalid markup...
  $dom->strictErrorChecking = FALSE;
  $dom->recover = TRUE;

  @$dom->loadHTMLFile($url);
  //print "2 url = $url \n"; exit();
  parse_webpage_content($url, $GLOBALS['nodesJson'], $dom);
  $list = $dom->getElementsByTagName("title");
  // print_r($list);  print "\n";
  // print_r($title);  print "\n";
  $anchors = $dom->getElementsByTagName('a');
  $out_anchors = $anchors;
  // print_r($dom);  print "\n";
  foreach ($anchors as $element) {
    $href_inner = trim($element->getAttribute('href'));
    // print "1: <a href>=$href | ";
    if (isset($href_inner)) {
      $href_inner = noneHttpUrl($url, $href_inner);
      // print "2: parent-url=$url | HttpsUrl:href=$href\n";
      _crawl_page($href_inner, $depth - 1);
    }
  }
}

/**
 * Handle the HTTP and HTTPS.
 * @param  string $urlP  [url]
 * @param  string $hrefC [url]
 * @return string        [url]
 */
function noneHttpUrl($urlParent, $hrefC) {
  if (stristr($hrefC, 'https://') || stristr($hrefC, 'http://')) {
    return $hrefC;
  }
  if (0 !== strpos($hrefC, 'http')) {
    $absUrl = absurl($urlParent, $hrefC);
    return HTTP . '://' . DHOST . $absUrl;
  }
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
    $absoluteURL = ($basePathDIR == '/') ? "/" . $relUrl : $basePathDIR . "/" . $relUrl;
  }
  return $absoluteURL;
}

/**
 * Handle ../  ../../  ../../../ in URL.
 */
function handle_double_dots($basePathDIR, $relUrl) {
  // print " base==$basePathDIR\n refUrl = $relUrl\n";
  $absoluteURL = $relUrl;
  $arrPgUrl = explode('/', $basePathDIR);
  if (strpos($relUrl, '../../../') === 0 || strstr($relUrl, '../../../')) {
    array_pop($arrPgUrl);
    array_pop($arrPgUrl);
    array_pop($arrPgUrl);
    $absoluteURL = str_replace('../../../', '/', $relUrl);
  }
  elseif (strpos($relUrl, '../../') === 0) {
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
  // print "FINAL=$absoluteURL \n\n";
  return $absoluteURL;
}

/**
 * Check if the url is validate.
 *
 * @param  string $url [description]
 * @return boolean      [description]
 */
 function getFlag($url) {
   $url_response = array();
   $curl = curl_init();
   $curl_options = array();
   $curl_options[CURLOPT_RETURNTRANSFER] = TRUE;
   $curl_options[CURLOPT_URL] = $url;
   $curl_options[CURLOPT_NOBODY] = TRUE;
   $curl_options[CURLOPT_TIMEOUT] = 60;
   curl_setopt_array($curl, $curl_options);
   curl_exec($curl);
   $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
   curl_close($curl);
   if ($status == 200) {
     return TRUE;
   }
   else {
     return FALSE;
   }
 }

/**
 * Check if the url is top level landing page (menu items)
 * @param  string  $url [description]
 * @return boolean      [description]
 */
function isNavItem($url) {
  return true;
  $arr = array(
    // menus: top & 2nd level..
    '/index.html',
    '/about/dfs_about.htm',
    '/consumer/dfs_consumers.htm',
    '/banking/dfs_banking.htm',
    '/insurance/dfs_insurance.htm',
    '/legal/dfs_legal.htm',
    '/reportpub/dfs_reportpub.htm',
    '/appliclicen.htm',

    '/about/whowesupervise.htm',
    '/about/news.htm',
    '/about/contactus.htm',
    '/about/mission.htm',
    '/about/dfs_initiatives.htm',
    '/about/history.htm',
    '/about/whowesupervise.htm',
    '/about/careerdfs.htm',
    '/about/procure.htm',

    '/consumer/fileacomplaint.htm',
    '/consumer/scamsfraud.htm',
    '/consumer/mortg.htm',
    '/consumer/consindx.htm',
    '/consumer/banksav.htm',
    '/consumer/creditdebt.htm',
    '/consumer/holocaust/hcpoindex.htm',

    '/banking/banktrust.htm',
    '/banking/mortgagecomp.htm',
    '/banking/ialf.htm',
    '/banking/billassess.htm',
    '/legal/industrylet.htm',
    '/banking/crabdd.htm',

    '/insurance/abindx.htm',
    '/insurance/iindx.htm',
    '/insurance/iprop.htm',
    '/insurance/ilife.htm',
    '/insurance/ihealth.htm',
    '/insurance/tocol4.htm',

    '/legal/regulations.htm',
    '/legal/opinion.htm',
    '/legal/industrylet.htm',
    '/legal/interagency_agree_mou.htm',
    '/legal/foil.htm',
    '/legal/leg_summ/leg_summ.htm',

    '/reportpub/examrep.htm',
    '/reportpub/cra_reports/crarate.htm',
    '/reportpub/fraudrep.htm',
    '/reportpub/wb.htm',
    '/reportpub/commentltr.htm',
    '/reportpub/annualrep.htm',

    // footer..
    '/consumer/fileacomplaint.htm',
    '/consumer/auto/obtain_lien_release.htm',
    '/consumer/tenantrights.htm',
    '/consumer/scamsfraud.htm',
    '/legal/foil.htm',
    '/insurance/extapp/extappqa.htm',
    '/insurance/dmvindex.htm',

    '/insurance/licensing/prolic.htm',
    '/insurance/faqs/faqs_serv_pro_conind.htm',
    '/banking/pff.htm',
    '/legal/industry/ilnameapro.htm',
    '/legal/industry/ilnameapro.htm',
    '/insurance/fdidx_in.htm',
    '/insurance/licensing/permit_temp_adjuster.htm',

    '/accessibility.htm',
    '/disclaimer.htm',
    '/privacy.htm',
    '/sitemap.htm',
    '/shift/adobe_reader.htm',

    '/about/laa_about.htm',
  );
  return in_array($url, $arr);
}

/**
 * Parse HTML between <div> Main Contents Only</div>.
 * <div id="homepub">...</div>
 * <div id="procright">...</div>
 * <div id="rightcol">...</div>
 * <div class="pub">...</div>
 * @param  string $url   https://dfs.ny.gov/index.html
 * @param  number $depth 3
 * @return void
 */
function parse_webpage_content($url, &$nodesJson, &$doc) {
  // print "\n/**** Current URL $url ****/\n";
  // $doc = new DOMDocument();
  // print_r($doc);
  if (!check_href_valid($url)) {
    return FALSE;
  }
  $prefix = "//div[@id='content']";
  $prefix = "";
  // @$doc->loadHTMLFile($url);
  $title = get_dom_title($doc);
  // print_r($url);
  $content = $new_content = "";
  $urlAlians = parse_url($url, PHP_URL_PATH);
  if (!$urlAlians || $urlAlians == "/" || $urlAlians == '/index.html') {
    return;
  }
  // print "parse_web: url=$url\n urlAlians=$urlAlians\n";
  $xpath = new DOMXPath($doc);
  //print_r($xpath->document);
  $queries = [
    "$prefix//div[@id='homepub']",
    "$prefix//div[@id='procright']",
    "$prefix//div[@id='rightcol']",
    "$prefix//div[@class='pub']",
  ];

  foreach ($queries as $query) {
    $result = $xpath->query($query);
    if (!$result || $result->length <= 0) {
      //print_r($result->length);
      continue;
    }
    else {
      print "xpath:: $query\n" ;
      // print_r($result);
      foreach ($result as $node) {
        // print_r($node);
        // $content = $doc->saveHTML($node->nodeValue);
        $content = $doc->saveHTML($node);
        // var_dump($content);
        $new_content = handle_content($url, $content);
        // print_r($content);
        $termID = getTermID($urlAlians);
        $nodesJson[] = [
          'type' => [['target_id' => 'dfs_page']],
          'status' => [['value' => TRUE]],
          'title' => [['value' => $title]],
          'path' => [['alias' => $urlAlians]],
          'body' => [['value' => $new_content, 'format' => 'full_html']],
          'field_dfs_page_structure' => [['target_id' => $termID, 'target_type' => 'taxonomy_term']]
        ];
      }
    }
  }
}

/**
 * Get the TermID from the MAP array().
 * @param  string $url [description]
 * @return string $id   [term ID]
 */
function getTermID($path) {
  $path_dir = pathinfo($path, PATHINFO_DIRNAME);
  $terms_map = [
    'consumer' => '37', // Consumers
    'banking' => '38', // Applications & Licensing
    'insurance' => '40', // Industry Guidance
    'legal' => '41', // Reports & Publications
    'reportpub' => '41',
    'about' => '42'  // Contact Us
  ];

  foreach ($terms_map as $term => $id) {
    if (strpos($path_dir, "/$term") === 0) {
      return $id;
    }
  }
  return '43';
}

/**
 * Get the Dom page title.
 * @param  DOMDucument $dom [description]
 * @return string      [description]
 */
function get_dom_title(&$dom) {
  $list = $dom->getElementsByTagName("title");
  if ($list->length > 0) {
    return $list->item(0)->textContent;
  }
  return FALSE;
}

/**
 * Replace old link href with new href.
 * @param  string $content [html content]
 * @return string          [html content]
 */
function handle_content($urlCur, $content) {
  // print "/*** urlCur=$urlCur ***/\n";
  $docDOM = new DOMDocument();
  // print "#,";
  @$docDOM->loadHTML($content);
  // print_r($docDOM);
  // print "### Before ###\n content\n";
  $new_content = get_elements($docDOM, $urlCur, $content, 'a', 'href');
  // print "### After ###\n content\n";
  $new_content = get_elements($docDOM, $urlCur, $new_content, 'img', 'src');

  return $new_content;
  // unset($docDOM);
}

/**
 * Replace old tag attributes  with new.
 * @param string $content [html content] *
 * @return string  [html content ]
 */
function get_elements(&$docDom, $urlCur, &$content, $tag, $attribut) {
  // var_dump ($docDom);
  // print "tag=$tag | att=$attribut\n";
  $urlCur = parse_url($urlCur, PHP_URL_PATH);
  $links = [];
  $links_new = [];

  $arr = $docDom->getElementsByTagName($tag);
  $num = 0;
  foreach ($arr as $item) {
    $href = trim($item->getAttribute($attribut));

    if (!check_href_valid($href)) {
      continue;
    }
    // print "$num :: $href | tag=$tag\n";
    $num++;
    if ($tag == 'img') {
      $hrefNew = change_url_img($urlCur, $href);
    }
    elseif ($tag == 'a') {
      $hrefNew = change_url($urlCur, $href);
    }

    if (strpos($hrefNew,'//') === 0) {
      str_replace ($hrefNew, '/', '//');
    }

    if ($hrefNew != $href) {
      $links[] = $href;
      $links_new[] = $hrefNew;
      // print "\nold: $href \nnew: $hrefNew\n";
    }
  }

  if (count($links_new) > 0) {
    // print "\n#####1 OLD\n";
    // var_dump($links);
    // print "\n#####2 NEW\n";
    // var_dump($links_new);
    // print "\n******* old *******: \n content\n";
    $newContent = str_replace($links, $links_new, $content);
    // print "\n ******* NEW *******: \n newContent\n";
    // return $newContent;
  }else {
    $newContent = $content;
  }

  return $newContent;

}


/**
 * Check if valide href.
 */

function check_href_valid($href) {

  if(!isset($href) || $href == "" || strpos($href, '#') === 0) {
    return FALSE;
  }
  if (stristr($href, 'mailto:') ||
    stristr($href, 'tel:+1') ||
    stristr($href, 'www.w3') ||
    stristr($href, 'myportal' ) ||
    stristr($href, 'queensda.org') ||
    stristr($href, 'www.ny.gov') ||
    stristr($href, 'nystateofhealth.ny')
  ) {
    return FALSE;
  }


  return TRUE;
}
/**
 * Change to /docs/OLD_HREF if it points to a file.
 * @param string $href [url]
 * @return string       [url]
 */
function change_url($urlCur, $href) {
  $relHref = $href;
  $absHref = absurl($urlCur, $href);
  if ($absHref == 10) {
    return $href;
  }
  elseif (!$absHref) {
    return $href;
  }
  $arr = pathinfo($absHref);
  // var_dump ($absHref); var_dump ($relHref);
  // print "-- absHref: $absHref\n";

  $filename = $arr['basename'];
  if (isset($arr['extension']) && is_a_file($arr['extension'])) {
    // print "::FILE :: $absHref\n";
    if (copy_doc($absHref, FILE_URL . $absHref)) {
      $absHref = FILE_URL . $absHref;
    }
  }
  return $absHref ;
}

/**
 * Change to IMAGE_URL: /sites/default/files/dfs_images.
 * @param  string $href [old url]
 * @return string       [new url]
 */
function change_url_img($urlCur, $href) {
  // print "1::img-src: $href\n";
  $absUrl = absurl($urlCur, $href);
  // print "2::img-src: " . IMAGE_URL. "$absUrl\n";
  return IMAGE_URL . $absUrl;
}

/**
 * Check if extenstion name is a kind of files.
 * @param  string  $str [extesion name]
 * @return boolean
 */
function is_a_file($str) {
  $arr = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'];
  return in_array(strtolower($str), $arr);
}

/**
 * Help function to Copy files (.
 * @param  string $src /about/abc/efg-2017.pdf
 * @param  string $dst /docs/about/abc/efg-2017.pdf
 * @return Boolean      [description]
 */
function copy_doc($src, $dst) {
  // print "src old:: $src\ndst old:: $dst\n\n";
  $result = FALSE;
  $src = LOCAL_DIR . $src;
  $dst = LOCAL_DIR . $dst;
  if (file_exists($dst)) {
    return $dst;
  }
  if (_mycopy($src, $dst)) {
    $result = $dst;
  }
  // print "FILE old:: $src\nFile new:: $dst\n\n";
  return $result;
}

/**
 * Copy files (PDF, doc, text) to new directory.
 * @param  string $s1 [current file path]
 * @param  string $s2 [new file path/direcotry]
 * @return Boolean
 */
function _mycopy($s1, $s2) {
  if (!file_exists($s1)){
    return $s2;
  }

  str_replace('//', '/', $s1);
  str_replace('//', '/', $s2);
  $path = pathinfo($s2);
  if (!file_exists($path['dirname'])) {
    mkdir($path['dirname'], 0777, TRUE);
    // print "Local DIR:: "; print_r($path); print "\n";
  }
  // no copy on dfs.ny.gov
  // return $s2;

  if (!copy($s1, $s2)) {
    echo "--> Copy $s1 to $s2 failed \n";
    return FALSE;
  }
  // print "==> Copy a to b: $s1 => $s2\n";
  return $s2;
}

/**
 * Download files (pdf, txt)
 */
function _download_file($src_url, $dst_path) {

}

/**
 *
*/
function POST_Drupal($json) {

  $crl = curl_init();
  $url = "http://nydfs.local/user/login";
  curl_setopt($crl, CURLOPT_URL, $url);
  curl_setopt($crl, CURLOPT_COOKIEFILE, "/tmp/cookie.txt");
  curl_setopt($crl, CURLOPT_COOKIEJAR, "/tmp/cookie.txt");
  curl_setopt($crl, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($crl, CURLOPT_POST, 1);

  // The key of the postdata is the “name” of the form field.
  $postdata=array(
    "name" => "gungwang",
    "pass" => "D_F_S-YorkNew2018",
    "form_id" => "user_login_form",
    "op" => "Log in",
  );

  // Tell curl we're going to send $postdata as the POST data
  curl_setopt ($crl, CURLOPT_POSTFIELDS, $postdata);

  $result = curl_exec($crl);
  $headers = curl_getinfo($crl);
  curl_close($crl);

  if ($headers['url'] == $url) {
    die("Cannot login.\n");
  }
  else {
    print "Login:"; print_r($headers); print "\n";
  }

  // Add a node as POST method.
  $url2 = "http://nydfs.local/node?_format=json";
  curl_setopt($crl, CURLOPT_URL, $url2);
  // echo curl_errno($crl);

  // $i = 1;
  // foreach ($nodesJson as $json) {

    curl_setopt($crl, CURLOPT_POSTFIELDS, $json);

    $result = curl_exec($crl);
    $headers = curl_getinfo($crl);

    if (!$result || $headers['url'] == $url2) {
      print "# $i:: failed: "; print_r($result);
      die("Cannot add Node!\n");
    }
    else {
      print ":: Create node.\n";
    }
    // $i++;
  // }

  curl_close($crl);
}
