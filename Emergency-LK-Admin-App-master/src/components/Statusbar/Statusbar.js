/**
 * Author : Akila Devinda Rathnayaka 
 * Status Bar Component
 */


import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import PropTypes from 'prop-types';

export default class Statusbar extends Component{
  render() {
    return (
       <StatusBar 
       backgroundColor={this.props.backgroundColor} 
       barStyle="light-content"
       hidden={this.props.isHidden}
       />
    );
  }
}

Statusbar.propTypes = {
  isHidden: PropTypes.bool,
  backgroundColor:PropTypes.string
}
