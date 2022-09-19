/**
 * EmergencyLK 
 * User Profile Screen
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import AppStyles from '../../config/AppStyles';
import CustomButtonBorder from '../../components/CustomButton/CustomButtonBorder';
import MainScreen from '../Auth/MainScreen';
import API from '../../config/API';
import Spinner from 'react-native-loading-spinner-overlay';

export default class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged_username:'',
            logged_useremail:'',
            loading:false
        }
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }
    
    componentWillMount(){
        //Get user email from async storage and call the user information API
        this.getUserLoggedEmail().then((Logged_User_Email) => {
           this.API_GetUserDetails(JSON.parse(Logged_User_Email)); // Getting user details from API
        })
    }

    //Get user email address from local storage
    getUserLoggedEmail = async () => {
        let Logged_User_Email = await AsyncStorage.getItem('Logged_User_Email');
        return Logged_User_Email;
    }

    //Back Button Press Event
    backButtonOnPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    //log out confirm
    onLogoutConfirmation = () => {
        Alert.alert(
            'Confirm !',
            'Are you sure want to log out ?',
            [
            {text: 'YES',onPress: () => this.onLogoutClickLitsner(),},
            {text: 'NO',style: 'cancel',},
            ],
            {cancelable: false},
        );
    }

    //logout button click event
    onLogoutClickLitsner = () => {
        AsyncStorage.clear(); //clear all the local storage data
        this.props.navigation.navigate("MainScreen",{screen:MainScreen}) //Navigate to main screen of the app
    }

    //User Details Get API Method
    API_GetUserDetails = (value) => {
        
        this.setState({loading:true})
        let user_email = value

        fetch(API.API_USER_DETAILS,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Email": user_email
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                if(responseText.data[0].status_code == '200'){
                    this.setState({
                        loading:false,
                        logged_useremail:responseText.data[0].Email,
                        logged_username:responseText.data[0].Full_Name
                    })
                }else if(responseText.data[0].status_code == '401'){
                    this.setState({loading:false})
                    Alert.alert(
                        'Error Occured !',
                        'Please try again later...',
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
            <HeaderPrimary 
            title='My Profile'
            onPress={ () => this.backButtonOnPress()}
            />

            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

                <Text style={styles.name}>
                  {this.state.logged_username}
                </Text>

                <Text style={styles.email}>
                  {this.state.logged_useremail}
                </Text>
            </View>

            <CustomButtonBorder title='LOG OUT' onPress={ ()=> this.onLogoutConfirmation()}/>

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
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    name:{
        fontSize:22,
        color:AppStyles.colorBlack,
        fontFamily:AppStyles.primaryFontBold
    },
    email:{
        fontSize:22,
        color:AppStyles.colorBlack,
        fontFamily:AppStyles.primaryFontLight
    },
});