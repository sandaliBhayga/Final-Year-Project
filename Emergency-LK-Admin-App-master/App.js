/** 
 * EmergencyLK 
 * Loading component of the Application -> Main Class
 */

import React from 'react';
import AppContainer from './src/routes/routes';

console.disableYellowBox = true;  //Deisbale yellow box

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
