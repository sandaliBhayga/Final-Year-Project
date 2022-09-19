/** 
 * EmergencyLK 
 * Main Screen Component - User Authentication
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    BackHandler
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../config/Metrics';
import Statusbar from '../../components/Statusbar/Statusbar';
import AppStyles from '../../config/AppStyles';
import Assets from '../../config/Assets';
import CustomButtonBorder from '../../components/CustomButton/CustomButtonBorder';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this); 
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    //Back button handle event - Android Only
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }    

    //Button Click Listner Function
    buttonOnClickListner = (value) => {
        if(value == 'login'){
            //Navigate to Login Screena
            this.props.navigation.navigate("LoginScreen",{screen:LoginScreen})
        }else if(value == 'register'){
            //Navigate to register screen
            this.props.navigation.navigate("RegisterScreen",{screen:RegisterScreen})
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Statusbar backgroundColor={AppStyles.primaryColor}/>

            <LinearGradient 
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
                colors={['#1E1E1E', '#823636', '#E44D4D']}  
                style={styles.topHeader}>

            <Image source={Assets.APP_LOGO} style={styles.appLogo}/>
            </LinearGradient>
            
            <CustomButtonBorder 
            title='LOGIN' 
            onPress= {()=> this.buttonOnClickListner('login')}/>

            <Text style={styles.betweenText}> OR </Text>

            <CustomButtonPrimary 
            title='REGISTER' 
            onPress= {()=> this.buttonOnClickListner('register')}/>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topHeader:{
        width:Metrics.DEVICE_WIDTH,
        height:Metrics.DEVICE_HEIGHT/1.8,
        backgroundColor:AppStyles.primaryColor,
        borderBottomRightRadius:150
    },
    appLogo:{
        width:Metrics.DEVICE_WIDTH,
        height:Metrics.DEVICE_HEIGHT/2.5,
        marginTop:Metrics.DEVICE_HEIGHT/10,
        resizeMode:'contain'
    },
    betweenText:{
        fontFamily:AppStyles.primaryFontBold,
        fontSize:20,
        marginLeft:Metrics.DEVICE_WIDTH/2.2,
        marginTop:20,
    }
});