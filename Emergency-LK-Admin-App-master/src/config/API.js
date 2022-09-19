/**
 * EmergencyLK
 * Global API URL's
 */

//Protocol and Host Links
const PROTOCOL = 'http://';
const HOST = 'emergencylk.000webhostapp.com'; //For Android emulator we are using ip address instead of localhost name ios-> localhost
//API LINKS
const API_GET_CRIME_REPORTS =
  PROTOCOL + HOST + '/emeergency-lk/api/admin/view-crime-reports.php';
const API_GET_MISSING_PERSONS =
  PROTOCOL + HOST + '/emeergency-lk/api/get-missing-persons.php';
const API_GET_MEDHELP_REPORTS =
  PROTOCOL + HOST + '/emeergency-lk/api/get-medhelp-reports.php';
const API_SAVE_TSUNAMI_ALERT =
  PROTOCOL + HOST + '/emeergency-lk/api/admin/add-tsunami-alert.php';
const API_SAVE_FLOOD_ALERT =
  PROTOCOL + HOST + '/emeergency-lk/api/admin/add-flood-alert.php';
const API_SAVE_EARTHQUAKE_ALERT =
  PROTOCOL + HOST + '/emeergency-lk/api/admin/add-earthquake-alert.php';

const IMAGE_SERVRE_PATH = 'https://wellnes-sample.s3.amazonaws.com/images/';

//Exporting All API Links to Use
export default {
  API_GET_CRIME_REPORTS: API_GET_CRIME_REPORTS,
  API_GET_MISSING_PERSONS: API_GET_MISSING_PERSONS,
  API_GET_MEDHELP_REPORTS: API_GET_MEDHELP_REPORTS,
  API_SAVE_TSUNAMI_ALERT: API_SAVE_TSUNAMI_ALERT,
  API_SAVE_FLOOD_ALERT: API_SAVE_FLOOD_ALERT,
  API_SAVE_EARTHQUAKE_ALERT: API_SAVE_EARTHQUAKE_ALERT,
  IMAGE_SERVRE_PATH: IMAGE_SERVRE_PATH,
};
