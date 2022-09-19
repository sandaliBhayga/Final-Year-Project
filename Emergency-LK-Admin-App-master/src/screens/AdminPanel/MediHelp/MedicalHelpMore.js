/** 
 * EmergencyLK 
 * Medical Help View More Screen
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
import Metrics from '../../../config/Metrics';
import HeaderBackBtn from '../../../components/Header/HeaderBackBtn';
import AppStyles from '../../../config/AppStyles';
import Assets from '../../../config/Assets';

export default class MedicalHelpMore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            help_title:this.props.navigation.state.params.Help.Help_Title,
            help_type:this.props.navigation.state.params.Help.Help_Type,
            help_location:this.props.navigation.state.params.Help.Reporter_Address,
            posted_by:this.props.navigation.state.params.Help.Reporter_Name,
            mobile_number:this.props.navigation.state.params.Help.Reporter_Mobile_Number,
            email:this.props.navigation.state.params.Help.Reporter_Email,
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

    //Contact User Button Press
    contactReporter = (value) => {
        if(value == 'call'){
            Linking.openURL(`tel:${this.state.mobile_number}`)
        }else{
            Linking.openURL('mailto:'+this.state.email)
        }
    }

    render() {
        return (
            <View style={styles.container}>

            <ScrollView>
            <LinearGradient 
            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
            colors={['#1E1E1E', '#823636', '#E44D4D']}  
            style={styles.headerView}>

            <HeaderBackBtn title='Medical Help' onPress={ () => this.backButtonOnPress()}/>

            <Text style={styles.title}>{this.state.help_title}</Text>


            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Help Type : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.help_type}</Text>
            </View>

            <View style={styles.missingPersons}>
            <Text style={styles.misssingPersonsText}>Location : </Text>
            <Text style={styles.misssingPersonsText}>{this.state.help_location}</Text>
            </View>

            </LinearGradient>

            <View style={{height:20}}></View>

            <View style={styles.infoConrainer}>
            <Text style={styles.infoHeading}>Posted By : </Text>
            <View style={{height:20}}></View>
            <Text style={styles.infoBody}>{this.state.posted_by}</Text>
            </View>

            <View style={{height:20}}></View>

            <View style={styles.infoConrainer}>
            <Text style={styles.infoHeading}>Contact : </Text>
            <View style={{height:20}}></View>
            </View>
            
            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={ ()=> this.contactReporter('call')} style={styles.buttonContainer}>
            <Image source={Assets.IC_GET_CALL} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>Get Call</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={ ()=> this.contactReporter('email')}  style={styles.buttonContainer}>
            <Image source={Assets.IC_GET_EMAIL} style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
            </View>

            

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
        height:Metrics.DEVICE_HEIGHT/2
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
        marginTop:30,
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
        width:Metrics.DEVICE_WIDTH/1.6,
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