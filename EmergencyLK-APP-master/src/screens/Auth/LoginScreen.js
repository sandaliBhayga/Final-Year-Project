/** 
 * EmergencyLK 
 * Login Screen of the Application
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Alert,
    BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBackBtn from '../../components/Header/HeaderBackBtn';
import Metrics from '../../config/Metrics';
import Assets from '../../config/Assets';
import AppStyles from '../../config/AppStyles';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../config/API';
import HomeScreen from '../HomeScreen/HomeScreen';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            loading:false,
        }
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    //On Press event for the back button 
    backButtonOnPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    //Form Validation
    loginFormValidation = () => {
        if(this.state.email.length<=0 || this.state.password.length<=0){
            Alert.alert(
                'Fill All Fields',
                'Please fill all the fields ...',
                [
                {text: 'OK',},
                ],
                {cancelable: false},
            );
        }else{
            this.API_UserLogin(); // User Login Fetch Function
        }
    }

    //Login button click method
    buttonOnClickListner = () => {
        this.loginFormValidation();
    }

    //API Call method for User Login
    API_UserLogin = () => {

        this.setState({loading:true})
        fetch(API.API_LOGIN,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Email":this.state.email,
                "Password": this.state.password
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                if(responseText.status_code == '200'){ //Login Sucessfull 
                    this.setState({loading:false})
                    //Save User Name and Email - AsyncStorage
                    try {
                        AsyncStorage.setItem('Logged_User_Email', JSON.stringify(this.state.email));
                    }
                    catch (e) {
                    console.log('caught error', e);
                    }

                    this.props.navigation.navigate("HomeScreen",{screen:HomeScreen}) //Navigate to home screen

                }else if(responseText.status_code == '401'){  // Invalid login credentials
                    this.setState({loading:false})
                    Alert.alert(
                        'Invalid Credentials',
                        'Check your email and password...',
                        [
                        {text: 'OK',},
                        ],
                        {cancelable: false},
                    );
                }
            })
            .catch((error) => {
                this.setState({loading:false})
                Alert.alert(
                    'Error Occured !',
                    'Please try again later...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
        });
    }

    render() {
        return (
            <View style={styles.container}>
           
           <ScrollView>
            <LinearGradient 
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
                colors={['#1E1E1E', '#823636', '#E44D4D']}  
                style={styles.headerView}>
            <HeaderBackBtn 
                title='Login'
                onPress={ ()=> this.backButtonOnPress()}
            />
            <Image source={Assets.APP_LOGO} style={styles.appLogo}/>
            </LinearGradient>

            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_EMAIL}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
            </View> 
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_PASSWORD}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                keyboardType="default"
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}/>
            </View> 

            <View style={{height:40}}></View>

            <CustomButtonPrimary 
                title='LOGIN'
                onPress = { ()=> this.buttonOnClickListner()}
            />

            <View style={{height:10}}></View>
            </ScrollView>

            <Spinner
            visible={this.state.loading}
            cancelable={false}
            />
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView:{
        width:Metrics.DEVICE_WIDTH,
        height:Metrics.DEVICE_HEIGHT/2.4,
        backgroundColor:'red',
        borderBottomRightRadius:150,
    },
    appLogo:{
        width:Metrics.DEVICE_WIDTH,
        height:Metrics.DEVICE_HEIGHT/3.8,
        resizeMode:'contain',
    },
    inputContainer: {
        borderRadius:20,
        width:Metrics.DEVICE_WIDTH/1.2,
        height:Metrics.DEVICE_HEIGHT/12,
        flexDirection: 'row',
        alignItems:'center',
        marginTop:20,
        marginLeft:Metrics.DEVICE_WIDTH/13,
        backgroundColor:'#E9E9E9'
    },
    inputs:{
        height:40,
        marginLeft:16,
        flex:1,
        fontFamily:AppStyles.primaryFont,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
});