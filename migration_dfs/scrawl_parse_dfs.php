<?php

/**
 * @file
 * Crawl and parse the webpages of NYDFS, dfs.ny.org.
 * @var [type]
 * Author: Gung Wang
 */

// Running CMD: php -f scrawl_parse_dfs.php arg1 arg2.
if (!isset($argc)) {
  die("argc and argv disabled\n");
}

// Number of arguments passed to the script.
// var_dump($argc);

// The arguments as an array. first argument is always the script name.
// var_dump($argv);

// Eg. 'www.dfs.ny.gov' , 'drupal-8-5-6.dd:8443/dfs'.
$host = $argv[1];
// Eg. depth to run recursive call.
$level = $argv[2];

define('LOCAL_DIR', '/Sites/local_dfs');
define('DHOST', $host);
$path = "http://$host";

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

_crawl_page($path, $level);

// print_r($outArr);

file_put_contents('/Sites/migration/output/url-has-urls.json', json_encode($outArr));
// file_put_contents('./output/url-all.json', json_encode($listUrlArr));
// file_put_contents('./output/url-pdf.json', json_encode($listPDFArr));
// file_put_contents('./output/url-word.json', json_encode($listWordArr));
// file_put_contents('./output/url-excel.json', json_encode($listExcelArr));
// file_put_contents('./output/url-text.json', json_encode($listTextArr));

file_put_contents('/Sites/migration/output/json/output-contents.json', json_encode($nodesJson));


// set_time_limit(0).

/**
 * Crawl pages recursively.
 * @param  string $url   https://dfs.ny.gov/index.html
 * @param  number $depth 3
 * @return void
 */
function _crawl_page($url, $depth) {
  // print "url = $url\n"; exit;

  global $outArr, $listUrlArr, $listPDFArr, $listWordArr, $listTextArr, $listExcelArr, $listInvalidArr;
  global $outstring, $listUrlstring , $listPDFstring , $listWordstring ,  $listTextstring, $listExcelstring , $listInvalidstring ;

  $outArr2 = array();
  $outSring2 = "";

  static $seen = array();
  if (isset($seen[$url]) || $depth === 0) {
    return;
  }
  else {
    $seen[$url] = TRUE;
  }

  if (!filter_var($url, FILTER_VALIDATE_URL)) {
    $listInvalidArr[] = array('url' => $url);
    $listInvalidstring .= "$url\n";
    return;
  }

  if (!stristr($url, DHOST)) {
    return;
  }
  if (stristr($url, 'mailto:') || stristr($url, 'tel:+1800')) {
    return;
  }

  $parseArr = parse_url($url);
  if (strstr($url, '#') && isset($parseArr['fragment'])) {
    return;
  }

  $pathArr = (isset($parseArr['path'])) ? pathinfo($parseArr['path']) : array();

  // Call to generate new content and store data in associat array.

  // parse_webpage_content($url, $GLOBALS['nodesJson']);

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

  if ($list->length > 0) {
    $title = $list->item(0)->textContent;
  }
  else {
    $title = isset($pathArr['basename']) ? $pathArr['basename'] : $parseArr['path'];
  }

  $anchors = $dom->getElementsByTagName('a');
  $out_anchors = $anchors;

  foreach ($out_anchors as $el) {
    $href_2 = $el->getAttribute('href');
    $href_2 = noneHttpUrl($url, $href_2);
    if ($href_2 == ""){
      continue;
    }
    if (!$fp = curl_init($href_2)) {
      continue;
    } elseif ($depth < 12 && isNavItem($href_2)) {
      continue;
    }
    $outArr2[] = array('url'=>$href_2) ;
    $outSring2 .= "$url\t$href_2\n";
  }

  $outArr[] = array( 'url'=>$url, 'links'=>$outArr2 );
  $outstring .= "$outSring2\n";



  if (isset($pathArr['extension'])) {
    $extension = strtolower($pathArr['extension']);
    switch ($extension) {
      case 'pdf':
      $listPDFArr[] = array('url'=>$url, 'title' => $title);
      $listPDFstring .= "$url\t$title\n";
      break;
      case 'doc':
      $listWordArr[] = array('url'=>$url, 'title' => $title);
      $listWordstring .= "$url\t$title\n";
      break;
      case 'docx':
      $listWordArr[] = array('url'=>$url, 'title' => $title);
      $listWordstring .= "$url\t$title\n";
      break;
      case 'txt':
      $listTextArr[] = array('url'=>$url, 'title' => $title);
      $listTextstring .= "$url\t$title\n";
      break;
      case 'xls':
      $listExcelArr[] = array('url'=>$url, 'title' => $title);
      $listExcelstring .= "$url\t$title\n";
      break;
      case 'xlsx':
      $listExcelArr[] = array('url'=>$url, 'title' => $title);
      $listExcelstring .= "$url\t$title\n";
      break;
    }
  }



  foreach ($anchors as $element) {
    $href = $element->getAttribute('href');
    $href = noneHttpUrl($url, $href);
    _crawl_page($href, $depth - 1);
  }

  $listUrlArr[] = array('url'=>$url, 'title' => $title, 'depth'=>$depth);
  $lineStr =  "$url\t$title\t$depth\n";
  $listUrlstring .= $lineStr;
  print $lineStr;
}

/**
 * Handle the HTTP and HTTPS.
 * @param  string $urlP  [url]
 * @param  string $hrefC [url]
 * @return string        [url]
 */
function noneHttpUrl($urlP, $hrefC){

  if (0 !== strpos($hrefC, 'http')) {
    //  this is where I changed hobodave's code
    $absUrl = absurl($urlP, $hrefC);
    $hrefC = ($absUrl) ? nodots($absUrl) :  "";
  }
  return  $hrefC;
  // return  str_replace('http://', 'https://', $hrefC);;
}

/**
 * Handle URL to convert to the absolute url path
 * @param  string $pgurl  [description]
 * @param  string $relUrl [description]
 * @return string         [description]
 * SRC: https://stackoverflow.com/questions/1243418/php-how-to-resolve-a-relative-url
 */
function absurl($pgurl, $relUrl) {
  $parseArr = parse_url($relUrl);
  if (strstr($relUrl, '#') && isset($parseArr['fragment']) ) {  return FALSE; }
  if (stristr($relUrl, 'mailto:')) {return FALSE;}

  if(strpos($relUrl,'://')){
    return $relUrl; //already absolute
  }
  if(substr($relUrl,0,2) == '//') {
    return 'https:'.$relUrl;
  } //shorthand scheme
  if(substr($relUrl,0,1) == '/') {
    return 'https://' . parse_url($pgurl, PHP_URL_HOST).$relUrl; //just add domain
  }
  if(strpos($pgurl,'/',9)===FALSE) {
    $pgurl .= '/';
  }//add slash to domain if needed

  return substr($pgurl,0,strrpos($pgurl,'/')+1) . $relUrl; //for relative links, gets current directory and appends new filename
}

/**
 * Handle the ../, ../../, .../ in the URL path
 * @param  string $path [description]
 * @return string       [without the ../]
 */
function nodots($path) { //Resolve dot dot slashes, no regex!
  $arr1 = explode('/',$path);
  $arr2 = array();
  foreach($arr1 as $seg) {
    switch($seg) {
      case '.':
      break;
      case '..':
      array_pop($arr2);
      break;
      case '...':
      array_pop($arr2); array_pop($arr2);
      break;
      case '....':
      array_pop($arr2); array_pop($arr2); array_pop($arr2);
      break;
      case '.....':
      array_pop($arr2); array_pop($arr2); array_pop($arr2); array_pop($arr2);
      break;
      default:
      $arr2[] = $seg;
    }
  }
  return implode('/', $arr2);
}

/*
function format_href($href){
  //if(stristr($href, 'queensda')) print "$href\n";
  $href = html_entity_decode($href);

  if (0 !== strpos($href, 'https') && 0 !== strpos($href, 'http') ) {
    $path = '/' . ltrim($href, '/');
    if (extension_loaded('https')) {
      $href = http_build_url($href , array('path' => $path));
      //print "- https: " .  $href . "\n";
    } elseif(extension_loaded('http')){
      $href = http_build_url($href , array('path' => $path));
    } else {
      $parts = parse_url($href);
      $href = (isset($parts['schema'])) ? $parts['scheme'] . '://' : "https://";
      //print $parts['scheme'] . "\n";
      //var_dump($parts);
      if (isset($parts['user']) && isset($parts['pass'])) {
        $href .= $parts['user'] . ':' . $parts['pass'] . '@';
      }
      $href .= isset($parts['host'])? $parts['host'] : DHOST;

      if (isset($parts['port'])) {
        $href .= ':' . $parts['port'];
      }
      $href .= $path;
    }
  }
  return $href;
}
*/

/**
 * Check if the url is validate
 * @param  string $url [description]
 * @return boolean      [description]
 */
function getFlag($url)
{
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
    if ($status == 200)
    {
      //print "$url\n";
        return TRUE;
    }
    else
    {
        return FALSE;
    }
    curl_close($curl);
}


/**
 * Check if the url is top level landing page (menu items)
 * @param  string  $url [description]
 * @return boolean      [description]
 */
function isNavItem($url){

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
  // $doc = new DOMDocument();
  $prefix = "//div[@id='content']";
  // @$doc->loadHTMLFile($url);
  print "3 url = $url\n";
  // print_r($doc);

  $title = get_dom_title($doc);
  $content = "";
  $urlAlians = parse_url($url, PHP_URL_PATH);

  $xpath = new DOMXPath($doc);
  $queries = [
    "$prefix//div[@id='homepub']",
    "$prefix//div[@id='procright']",
    "$prefix//div[@id='rightcol']",
    "$prefix//div[@class='pub']",
  ];

  foreach ($queries as $query) {
    if (!$result = $xpath->query($query)) {
      continue;
    }
    else {
      $content = $result->firstChild->nodeValue;
      $content = handle_content_url($content);
      $content = handle_content_img($content);
      break;
    }

  }

  $nodesJson[] = [
    'type' => [['target_id' => 'dfs_page']],
    'status' => [['value' => TRUE]],
    'title' => [['value' => $title]],
    'path' => [['alias' => $urlAlians]],
    'body' => [['value' => $content]]
  ];

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
function handle_content_url($content) {
  $doc = new DOMDocument();
  $doc->loadHTML($content);
  $links = [];
  $links_new = [];

  $arr = $doc->getElementsByTagName("a");

  foreach ($arr as $item) {
    $href = $item->getAttribute("href");
    $links[] = $href;
    $links_new[] = change_url($href);
  }

  return str_replace($links, $links_new, $content);
}

/**
 * Replace old image src with new src.
 * @param string $content [html content] *
 * @return string  [html content ]
 */
function handle_content_img($content) {
  $doc = new DOMDocument();
  $doc->loadHTML($content);
  $links = [];
  $links_new = [];

  $arr = $doc->getElementsByTagName("img");

  foreach ($arr as $item) {
    $href = $item->getAttribute("src");
    $links[] = $href;
    $links_new[] = change_url_img($href);
  }

  return str_replace($links, $links_new, $content);
}

/**
 * Change to /docs/OLD_HREF if it points to a file.
 * @param string $href [url]
 * @return string       [url]
 */
function change_url($href) {
  $href = nodots($href);
  $arr = pathinfo($href);

  if (isset($arr['extension']) && is_a_file($arr['extension'])) {
    if (copy_doc($href, FILE_URL . $href)) {
      return FILE_URL . $href;
    }
  }
  else {
    return $href;
  }
}

/**
 * Change to IMAGE_URL: /sites/default/files/dfs_images.
 * @param  string $href [old url]
 * @return string       [new url]
 */
function change_url_img($href) {
  $href = nodots($href);
  return IMAGE_URL . $href;

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
  $src = LOCAL_DIR . $src;
  $dst = LOCAL_DIR . $dst;
  if (file_exists($dst)) {
    return $dst;
  }
  if (_mycopy($src, $dst)) {
    return $dst;
  }
  else {
    return FALSE;
  }
}

/**
 * Copy files (PDF, doc, text) to new directory.
 * @param  string $s1 [current file path]
 * @param  string $s2 [new file path/direcotry]
 * @return Boolean
 */
function _mycopy($s1, $s2) {
  $path = pathinfo($s2);
  if (!file_exists($path['dirname'])) {
    mkdir($path['dirname'], 0777, TRUE);
  }
  if (!copy($s1, $s2)) {
    echo "copy $s1 to $s2 failed \n";
    return FALSE;
  }
  return $s2;
}
