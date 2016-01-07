<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weather extends Model
{
    static function get($name = '') {
        $weathers = simplexml_load_file('http://data.gov.tw/iisi/logaccess?dataUrl=http://opendata.cwb.gov.tw/govdownload?dataid=F-C0032-001&authorizationkey=rdec-key-123-45678-011121314&ndctype=XML&ndcnid=6069');
        $weathers = $weathers->dataset->location;
        if ($name) {
            foreach ($weathers as $location) {
                if (strpos($location->locationName, $name) !== false) {
                    return $location;
                }
            }
            return false;
        } else {
            return $weathers;
        }
    }
}
