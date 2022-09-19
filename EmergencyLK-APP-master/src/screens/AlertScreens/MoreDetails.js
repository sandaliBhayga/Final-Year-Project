/** 
 * EmergencyLK 
 * Missing Person View More Screen
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    BackHandler,
    Image,
    ScrollView,
    Linking,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../config/Metrics';
import HeaderBackBtn from '../../components/Header/HeaderBackBtn';
import AppStyles from '../../config/AppStyles';
import CustomButtonBorder from '../../components/CustomButton/CustomButtonBorder';
import Assets from '../../config/Assets';

export default class MoreDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header_title:this.props.navigation.state.params.Title,
            alert_country:this.props.navigation.state.params.Alert.Alert_Country,
            alert_location:this.props.navigation.state.params.Alert.Alert_Location,
            alert_date:this.props.navigation.state.params.Alert.Alert_Date,
            alert_time:this.props.navigation.state.params.Alert.Alert_Time,
            alert_level:this.props.navigation.state.params.Alert.Alert_Level,

        }
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

    //Get call to emergency number
    callEmergencyNumber = () => {
        Linking.openURL(`tel:${119}`)
    }
    
    render() {
        return (
            <View style={styles.container}>

            <ScrollView>
            <LinearGradient 
            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
            colors={['#1E1E1E', '#823636', '#E44D4D']}  
            style={styles.headerView}>

            <HeaderBackBtn title='More Details' onPress={ () => this.backButtonOnPress()}/>

            <Text style={styles.title}> {this.state.header_title}{this.state.alert_country}</Text>


            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Affected Country : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.alert_country}</Text>
            </View>

            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Locations : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.alert_location}</Text>
            </View>

            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Date : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.alert_date}</Text>
            </View>

            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Time : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.alert_time}</Text>
            </View>

            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Risk Level : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.alert_level}</Text>
            </View>

            </LinearGradient>

            <View style={{height:20}}></View>
            
            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={ ()=> this.callEmergencyNumber()} style={styles.buttonContainer}>
            <Image source={Assets.IC_GET_CALL} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>CALL EMERGENCY</Text>
            </TouchableOpacity>
            </View>
            <View style={{height:10}}></View>
        
            </ScrollView>
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
        height:Metrics.DEVICE_HEIGHT/1.3
    },
    title:{
        fontFamily:AppStyles.primaryFont,
        color:AppStyles.colorWhite,
        fontSize:20,
        textAlign:'center',
        marginTop:Metrics.DEVICE_HEIGHT/30
    },
    missingPersons:{
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.3)',
        width:Metrics.DEVICE_WIDTH/1.1,
        height:Metrics.DEVICE_HEIGHT/10,
        marginLeft:Metrics.DEVICE_WIDTH/25,
        marginTop:5,
        borderRadius:10,
    },
    misssingPersonsText:{
        textAlign:'left',
        fontFamily:AppStyles.primaryFontLight,
        fontSize:18,
        color:AppStyles.colorWhite,
        marginTop:20,
        marginLeft:10,
    },
    infoConrainer:{
        marginLeft:Metrics.DEVICE_WIDTH/12
    },
    infoHeading:{
        fontFamily:AppStyles.primaryFontBold,
        fontSize:22,
        color:AppStyles.colorBlack,
    },
    infoBody:{
        fontFamily:AppStyles.primaryFont,
        fontSize:20,
        color:AppStyles.colorBlack,
    },
    bottonCotainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent:'center',
    },
    buttonContainer:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.2,
        backgroundColor:'transparent',
        // padding:20,
        shadowOpacity:30,
        borderRadius:10,
        borderColor:AppStyles.primaryColor,
        borderWidth:2,
        marginTop:15,
        flexDirection:'row'
    },
    buttonText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFont,
        marginTop: Metrics.DEVICE_HEIGHT/50,
        color:AppStyles.primaryColor,
        marginLeft:Metrics.DEVICE_WIDTH/10
    },
    buttonIcon:{
        width:40,
        height:40,
        resizeMode:'contain',
        marginTop:3,
        marginLeft:5
    }

});