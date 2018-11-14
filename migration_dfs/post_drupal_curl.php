<?php

/**
 * @file
 * Read json files and import to Drupal via REST POST.
 * @param string $argv[1] : HOST name
 * @param string $argv[2] : Number in directory json-1, json-2, json-3
 *
 * Author: Gung Wang
 */

$time_start = microtime(true);

// Run php -dsafe_mode=Off post_drupal_curl.php nydfs.local 2.
if (!isset($argc)) {
  die("argc and argv disabled\n");
}
$localDIR = '/Sites/migration/output/json-' . $argv[2];
$postURL = "http://" . $argv[1] . "/node?_format=json";

$list_jsons = scandir($localDIR);
foreach ($list_jsons as $json) {
  if ($json == '.' || $json == '..') {
    continue;
  }
  $jsonStr = file_get_contents($localDIR . "/$json");
  if (trim($jsonStr) == "") {
    continue;
  }
  $jsonStr = str_replace("'", "&quot;", $jsonStr);

  print $localDIR . "/$json\n";
  POST_Drupal($jsonStr, $postURL);
}

print "\n#### Total Jsons: " . count($list_jsons) . "\n";

// Print running time.
$time_end = microtime(true);
$execution_time = ($time_end - $time_start)/60;
print "\n--------- ---------
\nTotal Execution Time: $execution_time Minits\n";
/**
 * execute the curl command line to post json to Drupal.
 * @param  string  $json [encoded json string]
 * @return boolean
 * php -dsafe_mode=Off post_drupal_curl.php dfs.ny.gov 2 > /Sites/migration/print.txt
 */
function POST_Drupal($json, $postURL) {
  $execStr = <<<EOF
  curl --include \
   --request POST \
   --user gungwang:D_F_S-YorkNew2018 \
   --header 'Content-type: application/json' \
   --header 'X-CSRF-Token: <vfuiXdJjGlptCu8R8Uv4oGhKrlnsyciB5lWdUdSpIVQ>' \
   $postURL \
   --data-binary '$json'
EOF;

  print $execStr;
  if (exec($execStr)){
    print "\n###\n";
    return TRUE;
  }
  else {
    print "\n!!!!!!!!!!!!!!!!!!!!\n";
    print $execStr;
    return FALSE;
  }
}
