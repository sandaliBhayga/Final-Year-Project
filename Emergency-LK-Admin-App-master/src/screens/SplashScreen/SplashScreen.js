/** 
 * EmergencyLK 
 * Splash Screen Component
 */

import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native';
import Statusbar from '../../components/Statusbar/Statusbar';
import Assets from '../../config/Assets';
import Metrics from '../../config/Metrics';
import HomeScreen from '../AdminPanel/HomeScreen';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount(){

        setTimeout(() => {
            this.props.navigation.navigate("HomeScreen",{screen:HomeScreen});
        }, 1000);

    }

    componentWillUnmount(){

    }

    render() {
        return (
            <View style={styles.container}>
            <Statusbar isHidden={true}/>
            <ImageBackground source={Assets.BG_SPLASH} style={styles.splashBackground}>
            <Image source={Assets.APP_LOGO} style={styles.appLogo}/>
            </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    splashBackground:{
        width:Metrics.DEVICE_WIDTH,
        height:Metrics.DEVICE_HEIGHT
    },
    appLogo:{
        width:Metrics.DEVICE_WIDTH/1,
        height:Metrics.DEVICE_HEIGHT/3,
        marginTop:Metrics.DEVICE_HEIGHT/3,
        resizeMode:'contain'
    }
});