/** 
 * EmergencyLK 
 * Register Screen of the Application
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
import DeviceInfo from 'react-native-device-info';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBackBtn from '../../components/Header/HeaderBackBtn';
import Metrics from '../../config/Metrics';
import Assets from '../../config/Assets';
import AppStyles from '../../config/AppStyles';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../config/API';
import HomeScreen from '../HomeScreen/HomeScreen';

export default class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name:'',
            nic_number:'',
            email:'',
            password:'',
            address:'',
            selected_gender:'',
            uniqueID:'',
            loading:false,
            gender_data:[  
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }]
        }
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillMount(){
        //Get Device Unique ID
        DeviceInfo.getUniqueId().then(uniqueId => {
            this.setState({uniqueID:uniqueId})
        });
    }

    //On Press event for the back button 
    backButtonOnPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    //Form Validation
    regFormValidation = () => {
        if(this.state.full_name.length<=0 ||
         this.state.nic_number.length<=0 || 
         this.state.password.length<=0 ||
         this.state.selected_gender.length<=0 ||
         this.state.address.length<=0){
            Alert.alert(
                'Fill All Fields',
                'Please fill all the fields ...',
                [
                {text: 'OK',},
                ],
                {cancelable: false},
            );
         }else{
             this.API_RegisterUser(); // User Register API Call      
         }
    }

    //Login button click method
    buttonOnClickListner = () => {
        this.regFormValidation(); // register form validation 
    }

    //Save user details and navigate to home screen
    navigateToHome = () => {
        //Save User Name and Email - AsyncStorage
        try {
            AsyncStorage.setItem('Logged_User_Email', JSON.stringify(this.state.email));
        }
        catch (e) {
        console.log('caught error', e);
        }

        this.props.navigation.navigate("HomeScreen",{screen:HomeScreen})

    }

    //API Calling function for register user
    API_RegisterUser = () => {
        this.setState({loading:true})

        var Full_Name = this.state.full_name;
        var Email = this.state.email;
        var NIC_Number = this.state.nic_number;
        var Password = this.state.password;
        var gender;
        if(this.state.selected_gender == 0){
            gender = 'Male'
        }else{
            gender =  'Female'
        }
        var Address = this.state.address;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var current_date = date + '-' + month + '-' + year;

        fetch(API.API_REGISTER,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Full_Name":Full_Name,
                "Email":Email,
                "NIC_Number":NIC_Number,
                "Password":Password,
                "Gender":gender,
                "Address":Address,
                "Unique_ID":this.state.uniqueID,
                "Registration_Date":current_date
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                if(responseText.status_code == '200'){ //Registration auccessfull
                    this.setState({loading:false})
                    Alert.alert(
                        'Account Created !',
                        'You have successfully created new account ...',
                        [
                        {text: 'OK',onPress: () => this.navigateToHome()},
                        ],
                        {cancelable: false},
                    );
                }else if(responseText.status_code == '401'){  // NIC or email already exsists
                    this.setState({loading:false})
                    Alert.alert(
                        'User Already Exists',
                        'If you have account please log in ...',
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
                title='Register'
                onPress={ ()=> this.backButtonOnPress()}
            />
            <Image source={Assets.APP_LOGO} style={styles.appLogo}/>
            </LinearGradient>

            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_FULLNAME}/>
            <TextInput style={styles.inputs}
                placeholder="Full Name"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(full_name) => this.setState({full_name})}/>
            </View> 
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
            <Image style={styles.inputIcon} source={Assets.IC_NIC}/>
            <TextInput style={styles.inputs}
                placeholder="NIC Number"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(nic_number) => this.setState({nic_number})}/>
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
            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_ADDRESS}/>
            <TextInput style={styles.inputs}
                placeholder="Address"
                keyboardType="default"
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                multiline={true}
                onChangeText={(address) => this.setState({address})}/>
            </View> 

            <View style={styles.genderView}>
            <Text style={{fontFamily:AppStyles.primaryFont,fontSize:20,marginBottom:10,marginTop:10}}>Gender</Text>
            <RadioForm
                radio_props={this.state.gender_data}
                initial={-1}
                formHorizontal={true}
                labelHorizontal={false}
                buttonColor={AppStyles.primaryColor}
                selectedButtonColor={AppStyles.primaryColor}
                buttonSize={30}
                buttonOuterSize={40}
                animation={false}
                labelStyle={{fontFamily:AppStyles.primaryFontLight,fontSize:18}}
                buttonWrapStyle={{marginLeft: 20}}
                onPress={(value) => {this.setState({selected_gender:value})}}
            />
            </View>

            

            <View style={{height:40}}></View>

            <CustomButtonPrimary 
                title='REGISTER'
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
    genderView:{
        marginLeft:Metrics.DEVICE_WIDTH/9,
        marginTop:10,
    }
});