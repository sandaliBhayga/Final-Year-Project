/**
 * EmergencyLK
 * Global API URL's
 */

//Protocol and Host Links
const PROTOCOL = 'https://';
const HOST = 'emergencylk.000webhostapp.com'; //For Android emulator we are using ip address instead of localhost name ios-> localhost
//API LINKS
const API_REGISTER = PROTOCOL + HOST + '/emeergency-lk/api/user-register.php';
const API_LOGIN = PROTOCOL + HOST + '/emeergency-lk/api/user-login.php';
const API_USER_DETAILS =
  PROTOCOL + HOST + '/emeergency-lk/api/get-user-details.php';
const API_REPORT_CRIME =
  PROTOCOL + HOST + '/emeergency-lk/api/report-crime.php';
const API_REPORT_MISSING_PERSON =
  PROTOCOL + HOST + '/emeergency-lk/api/report-miss-persons.php';
const API_MDEICAL_HELP =
  PROTOCOL + HOST + '/emeergency-lk/api/report-medical-help.php';
const API_MISSINGP_COUNT =
  PROTOCOL + HOST + '/emeergency-lk/api/missingp-count.php';
const API_GET_MISSING_PERSONS =
  PROTOCOL + HOST + '/emeergency-lk/api/get-missing-persons.php';
const API_GET_MEDHELP_COUNT =
  PROTOCOL + HOST + '/emeergency-lk/api/get-medhelp-count.php';
const API_GET_MEDHELP_REPORTS =
  PROTOCOL + HOST + '/emeergency-lk/api/get-medhelp-reports.php';
const API_VIEW_TSUNAMI_ALERTS =
  PROTOCOL + HOST + '/emeergency-lk/api/admin/view-tsunami-alerts.php';
const API_VIEW_FLOOD_ALERTS =
  PROTOCOL + HOST + '/emeergency-lk/api/admin/view-flood-alerts.php';
const API_VIEW_EQ_ALERTS =
  PROTOCOL + HOST + '/emeergency-lk/api/admin/view-earthquake-alerts.php';

//Amazon AWS Services
const AWSS3_ACCESS_KEY = 'AKIAJOG23S6VAVYADGBA';
const AWSS3_SECRET_KEY = '7d3gyKGwj/iMlIRk5mD3dBsmZ3c4zmd3CzevxDKE';
const IMAGE_SERVRE_PATH = 'https://wellnes-sample.s3.amazonaws.com/images/';
//Exporting All API Links to Use
export default {
  API_REGISTER: API_REGISTER,
  API_LOGIN: API_LOGIN,
  API_USER_DETAILS: API_USER_DETAILS,
  API_REPORT_CRIME: API_REPORT_CRIME,
  API_REPORT_MISSING_PERSON: API_REPORT_MISSING_PERSON,
  API_MDEICAL_HELP: API_MDEICAL_HELP,
  API_MISSINGP_COUNT: API_MISSINGP_COUNT,
  API_GET_MISSING_PERSONS: API_GET_MISSING_PERSONS,
  API_GET_MEDHELP_COUNT: API_GET_MEDHELP_COUNT,
  API_GET_MEDHELP_REPORTS: API_GET_MEDHELP_REPORTS,
  API_VIEW_TSUNAMI_ALERTS: API_VIEW_TSUNAMI_ALERTS,
  API_VIEW_FLOOD_ALERTS: API_VIEW_FLOOD_ALERTS,
  API_VIEW_EQ_ALERTS: API_VIEW_EQ_ALERTS,
  AWSS3_ACCESS_KEY: AWSS3_ACCESS_KEY,
  AWSS3_SECRET_KEY: AWSS3_SECRET_KEY,
  IMAGE_SERVRE_PATH: IMAGE_SERVRE_PATH,
};
