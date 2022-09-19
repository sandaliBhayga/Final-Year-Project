/** 
 * EmergencyLK 
 * Home Screen of the Application  -> Main Screen Component
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    Linking,
    BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../config/Metrics';
import Assets from '../../config/Assets';
import AppStyles from '../../config/AppStyles';
import ViewCrimeReports from './Crime/ViewCrimeReports';
import MissingPersons from './MissingPerson/MissingPersons';
import MedicalHelp from './MediHelp/MedicalHelp';
import TsunamiAlerts from './AddAlerts/TsunamiAlerts';
import EarthquakeAlerts from './AddAlerts/EarthquakeAlerts';
import FloodAlerts from './AddAlerts/FloodAlerts';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            missing_persons_count :'',
            medical_help_count:'',
            menu_items: [
                {id:1, title: "View Crime Reports", image:Assets.HOME_CRIME_REPORT},
                {id:2, title: "View Missing Persons", image:Assets.HOME_MISSING_PERSONS},
                {id:3, title: "View Medical Helps", image:Assets.HOME_MEDICAL_HELP},
                {id:4, title: "Add Tsunami Alerts", image:Assets.HOME_TSUNAMI_ALERTS},
                {id:5, title: "Add Earthquake Alerts", image:Assets.HOME_EARTHQUAKE},
                {id:6, title: "Add Flood Alerts", image:Assets.HOME_FLOOD},
              ]
        }
    }

    componentWillMount(){
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
      
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton(){
        BackHandler.exitApp();
        return true;
    }

    clickEventListener(item) {
        // alert(item.title)
        if(item.id == 1){ 
            this.props.navigation.navigate("ViewCrimeReports",{screen:ViewCrimeReports})
        }else if(item.id == 2){
            this.props.navigation.navigate("MissingPersons",{screen:MissingPersons})
        }else if(item.id == 3){
            this.props.navigation.navigate("MedicalHelp",{screen:MedicalHelp})
        }else if(item.id == 4){
            this.props.navigation.navigate("TsunamiAlerts",{screen:TsunamiAlerts})
        }else if(item.id == 5){
            this.props.navigation.navigate("EarthquakeAlerts",{screen:EarthquakeAlerts})
        }else if(item.id == 6){
            this.props.navigation.navigate("FloodAlerts",{screen:FloodAlerts})
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
            <ScrollView>
            <LinearGradient 
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
                colors={['#1E1E1E', '#823636', '#E44D4D']}  
                style={styles.homeBgView}>

            <View style={styles.headerView}>
            <Image source={Assets.HEADER_LOGO} style={styles.appLogo}/>
            <Image source={Assets.IC_NOTIFICATION} style={styles.notificationsIc}/>
            </View>
            <Text style={{
                fontFamily:AppStyles.primaryFontBold,
                color:AppStyles.colorWhite,
                fontSize:25,
                marginLeft:Metrics.DEVICE_WIDTH/3,
                marginTop:20
                }}>
                Admin Panel
            </Text>
            <View style={styles.borderSeparate}></View>

            <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.menu_items}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
                return item.id;
            }}
            renderItem={({item}) => {
                return (
                <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                    <View style={styles.cardFooter}></View>
                    <Image style={styles.cardImage} source={item.image}/>
                    <View style={styles.cardHeader}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                )
            }}/>
            <View style={{height:10}}></View>
            </LinearGradient>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    homeBgView:{
        width:Metrics.DEVICE_WIDTH,
        // height:Metrics.DEVICE_HEIGHT
    },
    headerView:{
        flexDirection:'row',
        width:Metrics.DEVICE_WIDTH,
        height:Platform.OS === 'android' ? Metrics.DEVICE_HEIGHT/8 : Metrics.DEVICE_HEIGHT/5,
    },
    appLogo:{
        width:Metrics.DEVICE_WIDTH/2.5,
        height:Metrics.DEVICE_HEIGHT/8,
        resizeMode:'contain',
        marginLeft:10,
    },
    notificationsIc:{
        width:30,
        height:30,
        resizeMode:'contain',
        position: 'relative',
        marginLeft:Metrics.DEVICE_WIDTH/2.1,
        marginTop:Metrics.DEVICE_HEIGHT/16
    },
    missingPersons:{
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.3)',
        width:Metrics.DEVICE_WIDTH/1.1,
        height:Metrics.DEVICE_HEIGHT/7,
        marginLeft:Metrics.DEVICE_WIDTH/25,
        marginTop:10,
        borderRadius:10,
    },
    misssingPersonsText:{
        textAlign:'center',
        fontFamily:AppStyles.primaryFontLight,
        fontSize:22,
        color:AppStyles.colorWhite,
        width:Metrics.DEVICE_WIDTH/3.5,
        marginTop:5,
    },
    missingPersongBtnContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        width:Metrics.DEVICE_WIDTH/2.7,
        height:Metrics.DEVICE_HEIGHT/15,
        borderRadius:30,
        marginLeft:Metrics.DEVICE_WIDTH/5,
        backgroundColor:AppStyles.colorWhite,
        marginTop:Metrics.DEVICE_HEIGHT/25
    },
    missingPersonButton:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.2,
        padding:20,
        marginTop:5,
        backgroundColor:'transparent'
    },
    missingPersonBtnText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFontBold,
        marginTop:-10,
        color:AppStyles.primaryColor
    },
    emergencyCallContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        width:Metrics.DEVICE_WIDTH/1.2,
        height:Metrics.DEVICE_HEIGHT/15,
        borderRadius:15,
        marginLeft:Metrics.DEVICE_WIDTH/12,
        backgroundColor:AppStyles.colorWhite,
        marginTop:Metrics.DEVICE_HEIGHT/25
    },
    emergencyCallButton:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.2,
        padding:20,
        marginTop:5,
        backgroundColor:'transparent'
    },
    emeergenctBtnText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFontBold,
        marginTop:-10,
        color:AppStyles.primaryColor
    },
    borderSeparate:{
        width:Metrics.DEVICE_WIDTH/1.2,
        height:2,
        backgroundColor:'white',
        marginTop:10,
        marginLeft:Metrics.DEVICE_WIDTH/12
    },
    list: {
        paddingHorizontal: 5,
        marginTop:10,
    },
    listContainer:{
        alignItems:'center'
    },
    card:{
        marginVertical: 10,
        backgroundColor:'rgba(0,0,0,0.2)',
        flexBasis: '40%',
        marginHorizontal: 10,
        borderRadius:30,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        height: 70,
        width: 70,
        alignSelf:'center'
    },
    title:{
        fontSize:15,
        flex:1,
        alignSelf:'center',
        textAlign:'center',
        color:AppStyles.colorWhite,
        fontFamily:AppStyles.primaryFontBold
    },
    logOutContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        width:Metrics.DEVICE_WIDTH/1.2,
        height:Metrics.DEVICE_HEIGHT/12,
        borderRadius:15,
        marginLeft:Metrics.DEVICE_WIDTH/12,
        backgroundColor:AppStyles.colorWhite,
        marginTop:Metrics.DEVICE_HEIGHT/25
    },
    logOutButton:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.2,
        padding:20,
        marginTop:5,
        backgroundColor:'transparent'
    },
    logutButtonText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFontBold,
        marginTop:-10,
        color:AppStyles.primaryColor
    }
});