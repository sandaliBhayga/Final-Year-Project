/**
 * EmergencyLK 
 * Button With Transparent and Coloe Border Component
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';

export default class CustomButtonBorder extends Component {
    render() {
        return (
            <View style={styles.bottonCotainer}>
            <TouchableOpacity onPress={this.props.onPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    bottonCotainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent:'center',
    },
    buttonContainer:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.2,
        backgroundColor:'transparent',
        padding:20,
        shadowOpacity:30,
        borderRadius:10,
        borderColor:AppStyles.primaryColor,
        borderWidth:2,
        marginTop:15,
    },
    buttonText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFont,
        marginTop:-10,
        color:AppStyles.primaryColor
    },
});

CustomButtonBorder.propTypes = {
    onPress: PropTypes.func,
    title:PropTypes.string,
}