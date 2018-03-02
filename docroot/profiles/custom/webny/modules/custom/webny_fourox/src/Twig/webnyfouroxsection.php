<?php

namespace Drupal\webny_fourox\Twig;

/**
 * Class webnyfouroxsection extends \Twig_Extension.
 */
class webnyfouroxsection extends \Twig_Extension {


    /**
     * @vars / members
     */
    public $hasSuggestion       = FALSE;
    public $suggestionURL       = '';
    public $userURL             = '';
    public $suggestionURLFull   = '';

    /**
     * Function getName()
     */
    public function getName() {
        return 'webny_fourox.twig_extension';
    }

    /**
     * Function getFunctions.
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('fouroxSuggestions', array($this, 'fouroxSuggestions'), array(
                'is_safe' => array('html'),
            )),
            new \Twig_SimpleFunction('getHasSuggestions', array($this, 'getHasSuggestions'), array(
                'is_safe' => array('html'),
            )),
            new \Twig_SimpleFunction('getUserURL', array($this, 'getUserURL'), array(
                'is_safe' => array('html'),
            )),
            new \Twig_SimpleFunction('getSuggestionURLFull', array($this, 'getSuggestionURLFull'), array(
                'is_safe' => array('html'),
            )),
            new \Twig_SimpleFunction('getSuggestionURL', array($this, 'getSuggestionURL'), array(
                'is_safe' => array('html'),
            )),
        );
    }

    /**
     * Function fouroxSuggestions() to provide new link suggestions to the user.
     */
    public function fouroxSuggestions() {

        $fourox = $this->getSuggestedFiles();
        return $fourox['string'];

    }

    /**
     * Function fouroxHasSuggestions() demonstrates if suggestions are present
     */
    public function getHasSuggestions(){
        return $this->hasSuggestion;
    }

    /**
     * Function getuserURL()
     */
    public function getUserURL(){
        return $this->userURL;
    }

    /**
     * Function getSuggestionURLFull()
     */
    public function getSuggestionURLFull() {
        return $this->suggestionURLFull;
    }

    /**
     * Function getSuggestionURL()
     */
    public function getSuggestionURL() {
        return $this->suggestionURL;
    }

    /**
     * Function scrubURLstring() to scrub URL string
     */
    public function scrubURLstring($str) {

        $str = explode('_',$str);
        $es = $str[0];

        // STRIP .pdf FROM STRING IF EXISTS
        if(substr($es, strlen($es) - 4, strlen($es)) == '.pdf'){
            $es = str_replace('_', '', substr($es, 0,strlen($es) - 4));
        }

        // STRIP .docx FROM STRING IF EXISTS
        if(substr($es, strlen($es) - 5, strlen($es)) == '.docx'){
            $es = str_replace('_', '', substr($es, 0,strlen($es) - 5));
        }

        return $es;

    }

    /**
     * Protected function to obtain other information from the db
     */
    protected function getSuggestedFiles() {

        // VARS
        $fourox                 = array();
        $string                 = NULL;
        $fid                    = NULL;
        $eid                    = NULL;
        $curbedSearchString     = NULL;
        $suggestionsQuery       = NULL;
        $this->hasSuggestion    = FALSE;
        $filename               = '';

        // TIMESTAMP NOW
        $datenow = date('U');

        // TIME LIMIT: Default set to 90 days
        //$timespan = 7776000;
        $timespan = 31536000; // <-- ONE YEAR

        // CURRENT TIME LIMIT
        $timelimit = $datenow - $timespan;

        // EXPLODE THE URL -- GET THE FILENAME
        $stringParts    = explode('/', filter_var($_SERVER['REQUEST_URI'], FILTER_SANITIZE_STRING));
        $domainPrefix   = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'];
        $this->userURL = $domainPrefix.filter_var($_SERVER['REQUEST_URI'], FILTER_SANITIZE_STRING);

        // CHECK OF VALUE ONE, THREE, AND SIX TO VERIFY THIS IS A DOCUMENT CONTENT TYPE
        if(isset($stringParts[6]) && $stringParts[1] == 'system' && $stringParts[3] == 'documents') {
            $filename = $stringParts[6];
        }

        // CHECK IF FILENAME IS NOT AN EMPTY STRING | $filename is $stringParts[6];
        // THIS WILL VERIFY
        if($filename != '') {

            // STRING WITHOUT EXTENTIONS -- SCRUB
            $curbedSearchString = $this->scrubURLstring($filename);


            // DO TEST ONLY IF THERE'S A SEARCH STRING AVAILABLE
            if($curbedSearchString != NULL) {

                // PREFIX URL
                $urlPrefix = '/system/files/';

                // QUERY TO GET SPECIFIC FILE DATA
                $suggestionsQuery = "
                     SELECT t.`filename`, t.`uri`, t.`created`, t.`changed`, t.`status`, t.`filemime`, 
                     e.`entity_id`, t.`fid`, e.`field_webny_document_file_upload_target_id` as `efid`                                
                     FROM `file_managed` t, `node_revision__field_webny_document_file_upload` e 
                     WHERE e.`field_webny_document_file_upload_target_id` = t.`fid` AND 
                           t.changed > $timelimit AND t.uri LIKE '%$curbedSearchString%'
                     ORDER by t.`created` DESC LIMIT 1 
                     ";

                // GET QUERY DATA
                $connection = \Drupal::database();
                $query = $connection->query($suggestionsQuery);
                $results = $query->fetchAll();

                // OBJECT NOTATION GATHERING
                foreach ($results as $r) {

                    // SUGGESTION URL
                    $this->suggestionURL        = $urlPrefix . substr($r->uri, 10);
                    $this->suggestionURLFull    = $domainPrefix . $this->suggestionURL;

                    // SET VALUES
                    $this->hasSuggestion = TRUE;
                    $fid = $r->fid;
                    $eid = $r->entity_id;
                }
            }
        }

        // UPDATE FOUROX
        $fourox['string'] = $string;
        $fourox['fid']    = $fid;
        $fourox['eid']    = $eid;

        return $fourox;
    }

}
