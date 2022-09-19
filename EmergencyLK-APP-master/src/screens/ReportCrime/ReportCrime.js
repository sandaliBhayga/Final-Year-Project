/**
 * EmergencyLK 
 * Report Crime Screen
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Assets from '../../config/Assets';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import API from '../../config/API';
import HomeScreen from '../HomeScreen/HomeScreen';

export default class ReportCrime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reporter_name:'',
            reporter_mobileno:'',
            crime_location:'',
            reporter_location:'',
            crime_date:'Select Date',
            crime_time:'Select Time',
            crime_priorityLevel:'',
            crime_mmoredetails:'',
            loading:false,
            isDatePickerVisible: false,
            isTimePickerVisible:false,
            crime_priorityLevel_Data:[  
                {label: 'High', value: 0 },
                {label: 'Normal', value: 1},
                {label: 'Low', value: 2 }]
        }
    }
    
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonOnPress);
    }

    //Date Picker Methods
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };
    
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };
    
    handleDatePicked = date => {
        const mdate = date.toString().split(" ");
        this.setState({
            crime_date : mdate[1] + " " + mdate[2] + ", " + mdate[3]
        });
        this.hideDatePicker();
    };

    //Time Picker Methods
    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    };
    
    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false });
    };
    
    handleTimePicked = date => {
        const mtime = date.toString().split(" ");
        this.setState({
            crime_time : mtime[4]
        });
        this.hideTimePicker();
    };

    //Report crime form validation
    reportFormValidation = () => {
        if(this.state.reporter_name.length<=0 ||
            this.state.reporter_mobileno<=0 ||
            this.state.crime_location.length<=0 ||
            this.state.crime_date.length<=0 ||
            this.state.crime_time.length<=0||
            this.state.crime_mmoredetails.length<=0 ||
            this.state.reporter_location.length<=0||
            this.state.crime_priorityLevel.length<=0){
                Alert.alert(
                    'Fill All Fields',
                    'Please fill all the fields ...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
            }else{
                this.API_ReportCrime(); // Report crime API function
            }
    }

    //Back Button Press Event
    backButtonOnPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    //Navigate to Homne Screen
    navigateToHome = () => {
        this.props.navigation.navigate("HomeScreen",{screen:HomeScreen})
    }

    //Report Crime API Call Method
    API_ReportCrime = () => {

        let Priority_Level;
        //Getting Priority Level
        if(this.state.crime_priorityLevel == 0){
            Priority_Level="High"
        }else if(this.state.crime_priorityLevel == 1){
            Priority_Level="Normal"
        }else if(this.state.crime_priorityLevel == 2){
            Priority_Level="Low"
        }

        this.setState({loading:true})
        fetch(API.API_REPORT_CRIME,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Reporter_Name":this.state.reporter_name,
                "Reporter_Mobile_Number":this.state.reporter_mobileno,
                "Reporter_Location":this.state.reporter_location,
                "Crime_Location":this.state.crime_location,
                "Report_Time":this.state.crime_time,
                "Report_Date":this.state.crime_date,	
                "Prority_Level":Priority_Level,
                "More_Details":this.state.crime_mmoredetails
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                if(responseText.status_code == '200'){
                    this.setState({loading:false})
                    Alert.alert(
                        'Success !',
                        'Reported success.. Police emergency will contact you ...',
                        [
                        {text: 'OK',onPress: () => this.navigateToHome(),},
                        ],
                        {cancelable: false},
                    );
                }else if(responseText.status_code == '401'){
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
            title='Report Crime'
            onPress={ () => this.backButtonOnPress()}
            />
            <ScrollView>
            <Image source={Assets.HOME_CRIME_REPORT} style={styles.crimeReportImage}/>

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
            <Image style={styles.inputIcon} source={Assets.CRIME_REPORTER_MOBILE}/>
            <TextInput style={styles.inputs}
                placeholder="Your Mobile Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(reporter_mobileno) => this.setState({reporter_mobileno})}/>
            </View> 

            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_LOCATION}/>
            <TextInput style={styles.inputs}
                placeholder="Your Location"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(reporter_location) => this.setState({reporter_location})}/>
            </View> 


            <View style={styles.borderSeparate}></View>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_LOCATION}/>
            <TextInput style={styles.inputs}
                placeholder="Crime Location"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(crime_location) => this.setState({crime_location})}/>
            </View> 

            <View style={{height:10}}></View>
            <TouchableOpacity onPress={ ()=> this.showDatePicker()}>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_DATE}/>
            <Text style={styles.dateAndtime}>{this.state.crime_date}</Text>
            </View> 
            </TouchableOpacity>

            <View style={{height:10}}></View>
            <TouchableOpacity onPress={ ()=> this.showTimePicker()}>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_TIME}/>
            <Text style={styles.dateAndtime}>{this.state.crime_time}</Text>
            </View> 
            </TouchableOpacity>

            <View style={{height:10}}></View>
            <View style={styles.inputContainerMore}>
            <TextInput style={styles.inputsMore}
                placeholder="More Information"
                keyboardType="default"
                underlineColorAndroid='transparent'
                multiline={true}
                onChangeText={(crime_mmoredetails) => this.setState({crime_mmoredetails})}/>
            </View> 

            <View style={styles.prorityLevel}>
            <Text style={{fontFamily:AppStyles.primaryFont,fontSize:20,marginBottom:10,marginTop:10}}>Prority Level</Text>
            <RadioForm
                radio_props={this.state.crime_priorityLevel_Data}
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
                onPress={(value) => {this.setState({crime_priorityLevel:value})}}
            />
            </View>

            <View style={{height:10}}></View>
            <CustomButtonPrimary title='REPORT CRIME' onPress={ ()=> this.reportFormValidation()}/>

            <View style={{height:10}}></View>
            </ScrollView>

            <DateTimePicker
                mode='date'
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDatePicker}
            />
            <DateTimePicker
                mode='time'
                isVisible={this.state.isTimePickerVisible}
                onConfirm={this.handleTimePicked}
                onCancel={this.hideTimePicker}
            />
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
    crimeReportImage:{
        width:Metrics.DEVICE_WIDTH/3,
        height:Metrics.DEVICE_HEIGHT/4,
        resizeMode:'contain',
        marginLeft:Metrics.DEVICE_WIDTH/3
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
    inputs:{
        height:Metrics.DEVICE_HEIGHT/5,
        marginLeft:16,
        flex:1,
        fontFamily:AppStyles.primaryFont,
    },
    inputsMore:{
        height:200,
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
    borderSeparate:{
        width:Metrics.DEVICE_WIDTH/1.2,
        height:2,
        backgroundColor:'black',
        marginTop:Metrics.DEVICE_HEIGHT/15,
        marginLeft:Metrics.DEVICE_WIDTH/12
    },
    dateAndtime:{
        fontFamily:AppStyles.primaryFont,
        marginLeft:18
    },
    prorityLevel:{
        marginLeft:Metrics.DEVICE_WIDTH/9,
        marginTop:10,
    }
});