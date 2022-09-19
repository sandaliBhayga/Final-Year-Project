/**
 * EmergencyLK 
 * Add  FloodAlerts Screen
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
    BackHandler,
    TouchableOpacity
} from 'react-native';
import HeaderPrimary from '../../../components/Header/HeaderPrimary';
import Assets from '../../../config/Assets';
import Metrics from '../../../config/Metrics';
import AppStyles from '../../../config/AppStyles';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CustomButtonPrimary from '../../../components/CustomButton/CustomButtonPrimary';
import API from '../../../config/API';
import Spinner from 'react-native-loading-spinner-overlay';
import HomeScreen from '../HomeScreen';
import DateTimePicker from "react-native-modal-datetime-picker";

export default class FloodAlerts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert_country:'',
            alert_location:'',
            alert_date:'Select Date',
            alert_time:'Select Time',
            priority_level:'',
            priority_level_data:[  
                {label: 'High', value: 0 },
                {label: 'Normal', value: 1 },
                {label: 'Low', value: 2 }
            ],
            loading:false,
            isDatePickerVisible: false,
            isTimePickerVisible:false,
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
            alert_date : mdate[1] + " " + mdate[2] + ", " + mdate[3]
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
            alert_time : mtime[4]
        });
        this.hideTimePicker();
    };

    //Home Navigation Method
    navigateToHome = () => {
        this.props.navigation.navigate("HomeScreen",{screen:HomeScreen})
    }

    //Form Validation
    onSubmitFormValidation = () => {
        if(this.state.alert_country.length<=0 ||
            this.state.alert_location.length<=0 ||
            this.state.alert_date.length<=0 ||
            this.state.alert_time.length<=0 ||
            this.state.priority_level.length<=0){
                Alert.alert(
                    'Fill All Fields',
                    'Please fill all the fields ...',
                    [
                    {text: 'OK',},
                    ],
                    {cancelable: false},
                );
            }else{
                this.API_Submit_Alert(); // Success API call method
            }
    }

    //Post Alert API Function
    API_Submit_Alert = () => {

        this.setState({loading:true})

        //Get Selected Help Type
        var Priority_Level;
        if(this.state.priority_level == 0){
            Priority_Level = 'High'
        }else if(this.state.priority_level == 1){
            Priority_Level =  'Normal'
        }else{
            Priority_Level =  'Low'
        }

        fetch(API.API_SAVE_FLOOD_ALERT,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
                "Alert_Country":this.state.alert_country,
                "Alert_Location":this.state.alert_location,
                "Alert_Date":this.state.alert_date,
                "Alert_Time":this.state.alert_time,
                "Alert_Level":Priority_Level
            })
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.status_code == '200'){
                    Alert.alert(
                        'Alert Submitted !',
                        'You have successfully submit alert...',
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
            title='Add Flood Alert'
            onPress={ () => this.backButtonOnPress()}
            />

            <ScrollView>
            <Image source={Assets.HOME_FLOOD} style={styles.medicalHelpImage}/>

            <View style={styles.helpTypeView}>
            <Text style={{fontFamily:AppStyles.primaryFont,fontSize:20,marginBottom:10,marginTop:10}}>Risk Level</Text>
            <RadioForm
                radio_props={this.state.priority_level_data}
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
                onPress={(value) => {this.setState({priority_level:value})}}
            />
            </View>

            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Affected Country"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(alert_country) => this.setState({alert_country})}/>
            </View> 

            <View style={{height:10}}></View>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Affected Sub Area"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(alert_location) => this.setState({alert_location})}/>
            </View> 

            <View style={{height:10}}></View>
            <TouchableOpacity onPress={ ()=> this.showDatePicker()}>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_DATE}/>
            <Text style={styles.dateAndtime}>{this.state.alert_date}</Text>
            </View> 
            </TouchableOpacity>

            <View style={{height:10}}></View>
            <TouchableOpacity onPress={ ()=> this.showTimePicker()}>
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_TIME}/>
            <Text style={styles.dateAndtime}>{this.state.alert_time}</Text>
            </View> 
            </TouchableOpacity>


            <View style={{height:10}}></View>
            <CustomButtonPrimary title='ADD ALERT' onPress={ ()=> this.onSubmitFormValidation()}/>

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
    dateAndtime:{
        fontFamily:AppStyles.primaryFont,
        marginLeft:18
    },
});