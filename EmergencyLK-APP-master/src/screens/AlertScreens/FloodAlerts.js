/**
 * EmergencyLK 
 * FloodAlerts Feed
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    BackHandler,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import API from '../../config/API';
import Spinner from 'react-native-loading-spinner-overlay';
import MoreDetails from './MoreDetails';

export default class FloodAlerts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            alert_data:[],
        }
    }

    clickEventListener = (item) => {
        this.props.navigation.navigate("MoreDetails",{screen:MoreDetails,Alert:item,Title:'Flood Warning For '})
    }

    componentWillMount(){
        this.API_Get_MissingPersons();
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

    //Get All Missing Persons Details API function
    API_Get_MissingPersons = () => {
        this.setState({loading:true})

        fetch(API.API_VIEW_FLOOD_ALERTS,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((responseText) => {
                this.setState({loading:false})
                if(responseText.data[0].status_code == '200'){
                    this.setState({alert_data:responseText.data})
                }else{

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
            title='Flood Alerts'
            onPress={ () => this.backButtonOnPress()}
            />

            <ScrollView>
            <FlatList 
                style={styles.tasks}
                columnWrapperStyle={styles.listContainer}
                data={this.state.alert_data}
                keyExtractor= {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                return (
                    <TouchableOpacity style={[styles.card, {borderColor:AppStyles.primaryColor}]} onPress={() => {this.clickEventListener(item)}}>
                    <View style={styles.cardContent}>
                        <Text style={[styles.description]}>Flood Warning for {item.Alert_Country}</Text>
                        <Text style={styles.date}>Date : {item.Alert_Date}</Text>
                        <Text style={styles.date}>Time : {item.Alert_Time}</Text>
                    </View>
                    </TouchableOpacity>
                )}}/>
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
    tasks:{
        flex:1,
      },
      cardContent: {
        marginLeft:20,
        marginTop:10,
      },
    
      card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    
        marginVertical: 20,
        marginHorizontal:15,
        backgroundColor:"white",
        flexBasis: '46%',
        padding: 10,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderLeftWidth:6,
        height:Metrics.DEVICE_HEIGHT/7,
      },
    
      description:{
        fontSize:18,
        flex:1,
        color:AppStyles.colorBlack,
        fontFamily:AppStyles.primaryFontBold
      },
      date:{
        fontSize:14,
        flex:1,
        color:"#696969",
        marginTop:5,
        fontFamily:AppStyles.primaryFont
      },
});