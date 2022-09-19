/** 
 * EmergencyLK 
 * Header bar with back button component
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import Assets from '../../config/Assets';

export default class HeaderBackBtn extends Component {
    render() {
        return (
            <View style={styles.headerView}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.props.onPress}>
            <Image source={Assets.IC_BACKBTN_WHITE} style={styles.backButton}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
            </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    headerView:{
        width:Metrics.DEVICE_WIDTH,
        height:Platform.OS === 'android' ? Metrics.DEVICE_HEIGHT/10 : Metrics.DEVICE_HEIGHT/6,
        backgroundColor:'transparent'
    },
    backButton:{
        width:40,
        height:40,
        resizeMode:'contain',
        marginTop:Metrics.DEVICE_HEIGHT/40
    },
    headerTitle:{
        fontFamily:AppStyles.primaryFontBold,
        fontSize:20,
        color:AppStyles.colorWhite,
        marginTop:Metrics.DEVICE_HEIGHT/30,
        marginLeft:8
    }
});

HeaderBackBtn.propTypes = {
    onPress: PropTypes.func,
    title:PropTypes.string,
}