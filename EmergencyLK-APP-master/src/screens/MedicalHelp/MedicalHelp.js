/**
 * EmergencyLK 
 * Add Medical Help Screen
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    Alert,
    BackHandler
} from 'react-native';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Assets from '../../config/Assets';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import API from '../../config/API';
import HomeScreen from '../HomeScreen/HomeScreen';
import Spinner from 'react-native-loading-spinner-overlay';

export default class MedicalHelp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            help_title:'',
            help_type:'',
            reporter_name:'',
            reporter_mobile_no:'',
            reporter_address:'',
            reporter_email:'',
            help_more_details:'',
            help_type_data:[  
                {label: 'Blood Wanted', value: 0 },
                {label: 'Kindey Wanted', value: 1 },
                {label: 'Other Help', value: 2 }
            ],
            loading:false,
        }
    }

    componentWillMount(){

    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    //Back Button Press Event
    backButtonOnPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    //Home Navigation Method
    navigateToHome = () => {
        this.props.navigation.navigate("HomeScreen",{screen:HomeScreen})
    }

    //Form Validation
    onSubmitFormValidation = () => {
        if(this.state.help_title.length<=0 ||
            this.state.help_type.length<=0 ||
            this.state.reporter_name.length<=0 ||
            this.state.reporter_mobile_no.length<=0 ||
            this.state.reporter_address.length<=0 ||
            this.state.reporter_email.length<=0 ||
            this.state.help_more_details.length<=0){
                Alert.alert(
                    'Fill All Fields',
                    'Please fill all the fields ...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
            }else{
                this.API_Submit_MedicalHelp(); // Success API call method
            }
    }

    //Post Medical Help API Function
    API_Submit_MedicalHelp = () => {

        this.setState({loading:true})

        //Get Selected Help Type
        var Help_Type;
        if(this.state.help_type == 0){
            Help_Type = 'Blood Wanted'
        }else if(this.state.help_type == 1){
            Help_Type =  'Kidney Wanted'
        }else{
            Help_Type =  'Other Help'
        }

        fetch(API.API_MDEICAL_HELP,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Help_Title":this.state.help_title,
                "Help_Type":Help_Type,
                "Reporter_Name":this.state.reporter_name,
                "Reporter_Mobile_Number":this.state.reporter_mobile_no,
                "Reporter_Address":this.state.reporter_address,
                "Reporter_Email":this.state.reporter_email,
                "More_Details":this.state.help_more_details
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.status_code == '200'){
                    Alert.alert(
                        'Help Submitted !',
                        'You have successfully submit medical help ...',
                        [
                        {text: 'OK',onPress: () => this.navigateToHome()},
                        ],
                        {cancelable: false},
                    );
                }else{
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
            title='Medical Help'
            onPress={ () => this.backButtonOnPress()}
            />

            <ScrollView>
            <Image source={Assets.HOME_MEDICAL_HELP} style={styles.medicalHelpImage}/>

            <View style={styles.helpTypeView}>
            <Text style={{fontFamily:AppStyles.primaryFont,fontSize:20,marginBottom:10,marginTop:10}}>Help Type</Text>
            <RadioForm
                radio_props={this.state.help_type_data}
                initial={-1}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={AppStyles.primaryColor}
                selectedButtonColor={AppStyles.primaryColor}
                buttonSize={30}
                buttonOuterSize={40}
                animation={false}
                labelStyle={{fontFamily:AppStyles.primaryFontLight,fontSize:18}}
                buttonWrapStyle={{marginLeft: 20}}
                onPress={(value) => {this.setState({help_type:value})}}
            />
            </View>

            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Help Title"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(help_title) => this.setState({help_title})}/>
            </View> 


            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_REPORTER_NAME}/>
            <TextInput style={styles.inputs}
                placeholder="Your Name"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(reporter_name) => this.setState({reporter_name})}/>
            </View> 


            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_EMAIL}/>
            <TextInput style={styles.inputs}
                placeholder="Your Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(reporter_email) => this.setState({reporter_email})}/>
            </View> 


            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_REPORTER_MOBILE}/>
            <TextInput style={styles.inputs}
                placeholder="Your Mobile Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(reporter_mobile_no) => this.setState({reporter_mobile_no})}/>
            </View> 


            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_LOCATION}/>
            <TextInput style={styles.inputs}
                placeholder="Your Address"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(reporter_address) => this.setState({reporter_address})}/>
            </View> 

            <View style={{height:10}}></View>
            <View style={styles.inputContainerMore}>
            <TextInput style={styles.inputsMore}
                placeholder="More Information"
                keyboardType="default"
                underlineColorAndroid='transparent'
                multiline={true}
                onChangeText={(help_more_details) => this.setState({help_more_details})}/>
            </View> 

            <View style={{height:10}}></View>
            <CustomButtonPrimary title='SUBMIT MEDICAL HELP' onPress={ ()=> this.onSubmitFormValidation()}/>

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
    medicalHelpImage:{
        width:Metrics.DEVICE_WIDTH/3,
        height:Metrics.DEVICE_HEIGHT/4,
        resizeMode:'contain',
        marginLeft:Metrics.DEVICE_WIDTH/3
    },
    helpTypeView:{
        marginLeft:Metrics.DEVICE_WIDTH/20,
        marginTop:10,
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
        height:Metrics.DEVICE_HEIGHT/5,
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
    inputContainerMore: {
        borderRadius:20,
        width:Metrics.DEVICE_WIDTH/1.2,
        height:Metrics.DEVICE_HEIGHT/5,
        flexDirection: 'row',
        alignItems:'center',
        marginTop:20,
        marginLeft:Metrics.DEVICE_WIDTH/13,
        backgroundColor:'#E9E9E9'
    },
    inputsMore:{
        height:200,
        marginLeft:16,
        flex:1,
        fontFamily:AppStyles.primaryFont,
    },
});