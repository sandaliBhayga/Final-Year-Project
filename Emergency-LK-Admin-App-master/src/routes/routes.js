/** 
 * EmergencyLK 
 * Routing Screens of Application
 */

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
//All routing pages importing
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import HomeScreen from "../screens/AdminPanel/HomeScreen";
import ViewCrimeReports from "../screens/AdminPanel/Crime/ViewCrimeReports";
import CrimeReportsMore from "../screens/AdminPanel/Crime/CrimeReportMore";
import MissingPersons from "../screens/AdminPanel/MissingPerson/MissingPersons";
import MissingPersonsMore from "../screens/AdminPanel/MissingPerson/MissingPersonsMore";
import MedicalHelp from "../screens/AdminPanel/MediHelp/MedicalHelp";
import MedicalHelpMore from "../screens/AdminPanel/MediHelp/MedicalHelpMore";
import TsunamiAlerts from "../screens/AdminPanel/AddAlerts/TsunamiAlerts";
import EarthquakeAlerts from "../screens/AdminPanel/AddAlerts/EarthquakeAlerts";
import FloodAlerts from "../screens/AdminPanel/AddAlerts/FloodAlerts";



//Creating Stack Navigator for All Routes in Application
const AppNavigator = createStackNavigator({
    SplashScreen: {
      screen:SplashScreen,
      navigationOptions: { 
        header: null,  
        gesturesEnabled: false 
      },   
    },

    HomeScreen: {
        screen:HomeScreen,
        navigationOptions: { 
          header: null,  
          gesturesEnabled: false 
        },   
      },

    ViewCrimeReports: {
          screen:ViewCrimeReports,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    CrimeReportsMore: {
          screen:CrimeReportsMore,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    MissingPersons: {
          screen:MissingPersons,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    MissingPersonsMore: {
          screen:MissingPersonsMore,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    MedicalHelp: {
          screen:MedicalHelp,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    MedicalHelpMore: {
          screen:MedicalHelpMore,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    TsunamiAlerts: {
          screen:TsunamiAlerts,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    EarthquakeAlerts: {
          screen:EarthquakeAlerts,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
    FloodAlerts: {
          screen:FloodAlerts,
          navigationOptions: { 
            header: null,  
            gesturesEnabled: false 
          },   
    },
}, {
    transitionConfig: () => fromRight(),
});
    
  //Make App Navigator to creating app container
  const AppContainer = createAppContainer(AppNavigator);

  //exporting App Conrainer with all routing pages
  export default AppContainer;
  
  