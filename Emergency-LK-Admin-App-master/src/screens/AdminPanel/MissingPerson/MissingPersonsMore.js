/**
 * EmergencyLK
 * Missing Person View More Screen
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Metrics from '../../../config/Metrics';
import HeaderBackBtn from '../../../components/Header/HeaderBackBtn';
import AppStyles from '../../../config/AppStyles';
import Assets from '../../../config/Assets';
import API from '../../../config/API';
import ImageView from 'react-native-image-viewing';

export default class MissingPersonsMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingp_image: this.props.navigation.state.params.MisiingPerson.Image,
      missingp_name: this.props.navigation.state.params.MisiingPerson
        .Person_Name,
      missingp_type: this.props.navigation.state.params.MisiingPerson
        .Person_Type,
      missingp_district: this.props.navigation.state.params.MisiingPerson
        .Person_District,
      missingp_height: this.props.navigation.state.params.MisiingPerson
        .Person_Height,
      missingp_age: this.props.navigation.state.params.MisiingPerson.Person_Age,
      missingp_gender: this.props.navigation.state.params.MisiingPerson.Gender,
      missingp_lastseen: this.props.navigation.state.params.MisiingPerson
        .Last_Seen_Location,
      reporter_name: this.props.navigation.state.params.MisiingPerson
        .Reporter_Name,
      reporter_email: this.props.navigation.state.params.MisiingPerson.gmail,
      reporter_mobno: this.props.navigation.state.params.MisiingPerson
        .Reporter_Mobile_Number,
      selectedImage: [],
      isImageViewVisible: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonOnPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.backButtonOnPress,
    );
  }

  //Back Button Press Event
  backButtonOnPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  //Contact User Button Press
  contactReporter = value => {
    if (value == 'call') {
      Linking.openURL(`tel:${this.state.reporter_mobno}`);
    } else {
      Linking.openURL('mailto:' + this.state.reporter_email);
    }
  };

  //Get Selected Image As Full View
  getSelectedImageFull = () => {
    let tempArray = [
      {
        uri: API.IMAGE_SERVRE_PATH + this.state.missingp_image,
      },
    ];
    this.setState({selectedImage: tempArray});
    this.setState({isImageViewVisible: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <LinearGradient
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.1}}
            colors={['#1E1E1E', '#823636', '#E44D4D']}
            style={styles.headerView}>
            <HeaderBackBtn
              title="Missing Persons"
              onPress={() => this.backButtonOnPress()}
            />

            <Text style={styles.title}>
              Missing Person In {this.state.missingp_lastseen}
            </Text>

            <TouchableOpacity onPress={() => this.getSelectedImageFull()}>
              <Image
                source={{
                  uri: API.IMAGE_SERVRE_PATH + this.state.missingp_image,
                }}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>

            <View style={styles.missingPersons}>
              <Text style={styles.misssingPersonsText}>Name : </Text>
              <Text style={styles.misssingPersonsText}>
                {this.state.missingp_name}
              </Text>
            </View>

            <View style={styles.missingPersons}>
              <Text style={styles.misssingPersonsText}>Type : </Text>
              <Text style={styles.misssingPersonsText}>
                {this.state.missingp_type}
              </Text>
            </View>

            <View style={styles.missingPersons}>
              <Text style={styles.misssingPersonsText}>District : </Text>
              <Text style={styles.misssingPersonsText}>
                {this.state.missingp_district}
              </Text>
            </View>

            <View style={styles.missingPersons}>
              <Text style={styles.misssingPersonsText}>Height : </Text>
              <Text style={styles.misssingPersonsText}>
                {this.state.missingp_height}
              </Text>
            </View>

            <View style={styles.missingPersons}>
              <Text style={styles.misssingPersonsText}>Age : </Text>
              <Text style={styles.misssingPersonsText}>
                {this.state.missingp_age}
              </Text>
            </View>

            <View style={styles.missingPersons}>
              <Text style={styles.misssingPersonsText}>Gender : </Text>
              <Text style={styles.misssingPersonsText}>
                {this.state.missingp_gender}
              </Text>
            </View>

            <View style={styles.missingPersons}>
              <Text style={styles.misssingPersonsText}>
                Last Seen Location :{' '}
              </Text>
              <Text style={styles.misssingPersonsText}>
                {this.state.missingp_lastseen}
              </Text>
            </View>
          </LinearGradient>

          <View style={{height: 20}} />

          <View style={styles.infoConrainer}>
            <Text style={styles.infoHeading}>Posted By : </Text>
            <View style={{height: 20}} />
            <Text style={styles.infoBody}>{this.state.reporter_name}</Text>
          </View>
          <View style={{height: 20}} />
          <View style={styles.infoConrainer}>
            <Text style={styles.infoHeading}>Contact : </Text>
            <View style={{height: 20}} />
          </View>

          <View style={styles.bottonCotainer}>
            <TouchableOpacity
              onPress={() => this.contactReporter('call')}
              style={styles.buttonContainer}>
              <Image source={Assets.IC_GET_CALL} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Get Call</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottonCotainer}>
            <TouchableOpacity
              onPress={() => this.contactReporter('email')}
              style={styles.buttonContainer}>
              <Image source={Assets.IC_GET_EMAIL} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 10}} />
        </ScrollView>
        <ImageView
          images={this.state.selectedImage}
          imageIndex={0}
          presentationStyle="overFullScreen"
          visible={this.state.isImageViewVisible}
          onRequestClose={() => this.setState({isImageViewVisible: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    width: Metrics.DEVICE_WIDTH,
    height: Metrics.DEVICE_HEIGHT / 0.8,
  },
  title: {
    fontFamily: AppStyles.primaryFont,
    color: AppStyles.colorWhite,
    fontSize: 20,
    textAlign: 'center',
    marginTop: Metrics.DEVICE_HEIGHT / 30,
  },
  missingPersons: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Metrics.DEVICE_WIDTH / 1.1,
    height: Metrics.DEVICE_HEIGHT / 10,
    marginLeft: Metrics.DEVICE_WIDTH / 25,
    marginTop: 5,
    borderRadius: 10,
  },
  misssingPersonsText: {
    textAlign: 'left',
    fontFamily: AppStyles.primaryFontLight,
    fontSize: 18,
    color: AppStyles.colorWhite,
    marginTop: 20,
    marginLeft: 10,
  },
  infoConrainer: {
    marginLeft: Metrics.DEVICE_WIDTH / 12,
  },
  infoHeading: {
    fontFamily: AppStyles.primaryFontBold,
    fontSize: 22,
    color: AppStyles.colorBlack,
  },
  infoBody: {
    fontFamily: AppStyles.primaryFont,
    fontSize: 20,
    color: AppStyles.colorBlack,
  },
  bottonCotainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 50,
    width: Metrics.DEVICE_WIDTH / 1.6,
    backgroundColor: 'transparent',
    // padding:20,
    shadowOpacity: 30,
    borderRadius: 10,
    borderColor: AppStyles.primaryColor,
    borderWidth: 2,
    marginTop: 15,
    flexDirection: 'row',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: AppStyles.primaryFont,
    marginTop: Metrics.DEVICE_HEIGHT / 50,
    color: AppStyles.primaryColor,
    marginLeft: Metrics.DEVICE_WIDTH / 10,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 5,
  },
});
