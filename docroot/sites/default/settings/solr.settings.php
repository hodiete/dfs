<?php

/**
 * @file
 * Contains search configuration.
 */

// Disable index provided by acquia_search module (using webny_index).
$config['search_api.index.acquia_search_index']['read_only'] = TRUE;
$config['search_api.index.acquia_search_index']['status'] = FALSE;

// Use local search server on local vm environment.
if ($is_local_env && !$_ENV['PIPELINE_ENV']) {
  $config['search_api.server.acquia_search_server']['status'] = FALSE;
  $config['search_api.server.local_webny']['status'] = TRUE;

  $config['search_api.index.webny_index']['server'] = 'local_webny';
  $config['search_api.index.webny_index']['read_only'] = FALSE;
  $config['search_api.index.webny_index']['status'] = TRUE;
}

if ($is_ah_env) {
  $config['search_api.server.acquia_search_server']['status'] = TRUE;
  $config['search_api.server.local_webny']['status'] = FALSE;

  $config['search_api.index.webny_index']['read_only'] = FALSE;
  $config['search_api.index.webny_index']['status'] = TRUE;
}
