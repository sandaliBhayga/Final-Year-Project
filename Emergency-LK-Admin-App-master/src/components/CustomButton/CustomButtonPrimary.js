/**
 * EmergencyLK 
 * Button With Gradient Style
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';

export default class CustomButtonPrimary extends Component {
    render() {
        return (
            <LinearGradient 
            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.1}} 
            colors={['#1E1E1E', '#823636', '#E44D4D']}  
            style={styles.bottonCotainer}>
            <TouchableOpacity onPress={this.props.onPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    bottonCotainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent:'center',
        width:Metrics.DEVICE_WIDTH/1.2,
        borderRadius:10,
        marginLeft:Metrics.DEVICE_WIDTH/12
    },
    buttonContainer:{
        height:50,
        width:Metrics.DEVICE_WIDTH/1.2,
        padding:20,
        marginTop:5,
        backgroundColor:'transparent'
    },
    buttonText:{
        textAlign:'center',
        fontSize:18,
        fontFamily:AppStyles.primaryFont,
        marginTop:-10,
        color:AppStyles.colorWhite
    },
});

CustomButtonPrimary.propTypes = {
    onPress: PropTypes.func,
    title:PropTypes.string,
}