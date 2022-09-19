/**
 * EmergencyLK
 * Report Missing Person Screen
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Alert,
  BackHandler,
  TouchableOpacity,
  Platform,
} from 'react-native';
import HeaderPrimary from '../../components/Header/HeaderPrimary';
import Assets from '../../config/Assets';
import Metrics from '../../config/Metrics';
import AppStyles from '../../config/AppStyles';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import API from '../../config/API';
import HomeScreen from '../HomeScreen/HomeScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import {RNS3} from 'react-native-s3-upload';

export default class MissingPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reporter_name: '',
      reporter_email: '',
      reporter_mobileno: '',
      reporter_location: '',
      missing_pName: '',
      missing_pDistrct: '',
      missing_pHeight: '',
      missing_pAge: '',
      missing_pLastLocation: '',
      missing_pGender: '',
      missing_pMoreDetails: '',
      missing_pType: '',
      gender_data: [{label: 'Male', value: 0}, {label: 'Female', value: 1}],
      person_type_data: [
        {label: 'Person', value: 0},
        {label: 'Animal', value: 1},
      ],
      loading: false,
      avatarSource: '',
      image_name: '',
      image_uri: '',
      image_type: '',
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
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack(null);
    return true;
  };

  //Home navigation method
  navigateToHome = () => {
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack(null);
    return true;
  };
  //Image Picker -> Upload User Image
  uploadImage = () => {
    const options = {
      // quality: 0.5,
      title: 'Select User Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 300,
      maxHeight: 300,
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const imageName = response.fileName;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        if (Platform.OS == 'android') {
          this.setState({
            avatarSource: source,
            image_name: imageName,
            image_uri: response.uri,
            image_type: response.type,
          });
        } else {
          if (
            typeof response.fileName === 'undefined' ||
            response.fileName === null
          ) {
            // on iOS, using camera returns undefined fileName. This fixes that issue, so API can work.
            var getFilename = response.uri.split('/');
            imgName = getFilename[getFilename.length - 1];
            this.setState({
              avatarSource: source,
              image_name: imgName,
              image_uri: response.uri,
              image_type: response.type,
            });
          } else {
            this.setState({
              avatarSource: source,
              image_name: imageName,
              image_uri: response.uri,
              image_type: response.type,
            });
          }
        }
      }
    });
  };

  //Form Validation
  reportFormValidation = () => {
    if (
      this.state.reporter_name.length <= 0 ||
      this.state.reporter_email.length <= 0 ||
      this.state.reporter_mobileno.length <= 0 ||
      this.state.reporter_location.length <= 0 ||
      this.state.missing_pName.length <= 0 ||
      this.state.missing_pDistrct.length <= 0 ||
      this.state.missing_pHeight.length <= 0 ||
      this.state.missing_pAge.length <= 0 ||
      this.state.missing_pLastLocation <= 0 ||
      this.state.missing_pGender.length <= 0 ||
      this.state.missing_pMoreDetails.length <= 0 ||
      this.state.missing_pType.length <= 0
    ) {
      Alert.alert(
        'Fill All Fields',
        'Please fill all the fields ...',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      //Report missing person API call
      this.API_Report_MissingPerson();
    }
  };

  //Report missing person API call function
  API_Report_MissingPerson = () => {
    this.setState({loading: true});
    //Getting gender
    var Gender;
    if (this.state.missing_pGender == 0) {
      Gender = 'Male';
    } else {
      Gender = 'Female';
    }

    //Getting Person Type
    var PersonType;
    if (this.state.missing_pType == 0) {
      PersonType = 'Person';
    } else {
      PersonType = 'Animal';
    }

    const file = {
      uri: this.state.image_uri,
      name: this.state.image_name,
      type: this.state.image_type,
    };

    const options = {
      keyPrefix: 'images/',
      bucket: 'wellnes-sample',
      region: 'us-east-1',
      accessKey: API.AWSS3_ACCESS_KEY,
      secretKey: API.AWSS3_SECRET_KEY,
      successActionStatus: 201,
    };

    RNS3.put(file, options).then(response => {
      console.log('AWS RESPONSE ', response);
      fetch(API.API_REPORT_MISSING_PERSON, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Image: this.state.image_name,
          Reporter_Name: this.state.reporter_name,
          Reporter_Mobile_Number: this.state.reporter_mobileno,
          Reporter_Address: this.state.reporter_location,
          Reporter_Email: this.state.reporter_email,
          Person_Name: this.state.missing_pName,
          Person_Type: PersonType,
          Person_District: this.state.missing_pDistrct,
          Person_Height: this.state.missing_pHeight,
          Person_Age: this.state.missing_pAge,
          Last_Seen_Location: this.state.missing_pLastLocation,
          Gender: Gender,
          Other_Info: this.state.missing_pMoreDetails,
        }),
      })
        .then(response => response.json())
        .then(responseText => {
          this.setState({loading: false});
          if (responseText.status_code == '200') {
            Alert.alert(
              'Report Added !',
              'You have successfully report missing person ...',
              [{text: 'OK', onPress: () => this.navigateToHome()}],
              {cancelable: false},
            );
          } else if ((responseText.status_code = '401')) {
            Alert.alert(
              'Error Occured !',
              'Please try again later...',
              [{text: 'OK'}],
              {cancelable: false},
            );
          }
        })
        .catch(error => {
          this.setState({loading: false});
          Alert.alert(
            'Error Occured !',
            'Please try again later...',
            [{text: 'OK'}],
            {cancelable: false},
          );
        });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderPrimary
          title="Report Missing Person"
          onPress={() => this.backButtonOnPress()}
        />
        <ScrollView>
          <Image
            source={Assets.HOME_MISSING_PERSONS}
            style={styles.missingPersonImage}
          />

          <View style={styles.genderView}>
            <Text
              style={{
                fontFamily: AppStyles.primaryFont,
                fontSize: 20,
                marginBottom: 10,
                marginTop: 10,
              }}>
              Select Type
            </Text>
            <RadioForm
              radio_props={this.state.person_type_data}
              initial={-1}
              formHorizontal={true}
              labelHorizontal={false}
              buttonColor={AppStyles.primaryColor}
              selectedButtonColor={AppStyles.primaryColor}
              buttonSize={30}
              buttonOuterSize={40}
              animation={false}
              labelStyle={{
                fontFamily: AppStyles.primaryFontLight,
                fontSize: 18,
              }}
              buttonWrapStyle={{marginLeft: 20}}
              onPress={value => {
                this.setState({missing_pType: value});
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: AppStyles.primaryFont,
              fontSize: 20,
              marginBottom: 10,
              marginTop: 10,
              marginLeft: Metrics.DEVICE_WIDTH / 9,
            }}>
            Upload Photo
          </Text>
          <TouchableOpacity
            onPress={() => this.uploadImage()}
            style={{
              marginTop: 10,
              height: 200,
              width: 200,
              backgroundColor: '#ed6d6d',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            {this.state.avatarSource ? (
              <Image
                source={this.state.avatarSource}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                }}
              />
            ) : (
              <Image
                source={Assets.IC_UPLOAD}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            )}
          </TouchableOpacity>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={Assets.CRIME_REPORTER_NAME}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Your Name"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={reporter_name => this.setState({reporter_name})}
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.IC_EMAIL} />
            <TextInput
              style={styles.inputs}
              placeholder="Your Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={reporter_email => this.setState({reporter_email})}
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={Assets.CRIME_REPORTER_MOBILE}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Your Mobile Number"
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              onChangeText={reporter_mobileno =>
                this.setState({reporter_mobileno})
              }
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_LOCATION} />
            <TextInput
              style={styles.inputs}
              placeholder="Your Address"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={reporter_location =>
                this.setState({reporter_location})
              }
            />
          </View>

          <View style={styles.borderSeparate} />

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={Assets.CRIME_REPORTER_NAME}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Missing Person's Name"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={missing_pName => this.setState({missing_pName})}
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_LOCATION} />
            <TextInput
              style={styles.inputs}
              placeholder="Missing Person's District"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={missing_pDistrct =>
                this.setState({missing_pDistrct})
              }
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.PERSON_HEIGHT} />
            <TextInput
              style={styles.inputs}
              placeholder="Missing Person's Height"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={missing_pHeight => this.setState({missing_pHeight})}
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.PERSON_AGE} />
            <TextInput
              style={styles.inputs}
              placeholder="Missing Person's Age"
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              onChangeText={missing_pAge => this.setState({missing_pAge})}
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={Assets.CRIME_LOCATION} />
            <TextInput
              style={styles.inputs}
              placeholder="Last Seen Location"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={missing_pLastLocation =>
                this.setState({missing_pLastLocation})
              }
            />
          </View>

          <View style={styles.genderView}>
            <Text
              style={{
                fontFamily: AppStyles.primaryFont,
                fontSize: 20,
                marginBottom: 10,
                marginTop: 10,
              }}>
              Gender
            </Text>
            <RadioForm
              radio_props={this.state.gender_data}
              initial={-1}
              formHorizontal={true}
              labelHorizontal={false}
              buttonColor={AppStyles.primaryColor}
              selectedButtonColor={AppStyles.primaryColor}
              buttonSize={30}
              buttonOuterSize={40}
              animation={false}
              labelStyle={{
                fontFamily: AppStyles.primaryFontLight,
                fontSize: 18,
              }}
              buttonWrapStyle={{marginLeft: 20}}
              onPress={value => {
                this.setState({missing_pGender: value});
              }}
            />
          </View>

          <View style={{height: 10}} />
          <View style={styles.inputContainerMore}>
            <TextInput
              style={styles.inputsMore}
              placeholder="More Information"
              keyboardType="default"
              underlineColorAndroid="transparent"
              multiline={true}
              onChangeText={missing_pMoreDetails =>
                this.setState({missing_pMoreDetails})
              }
            />
          </View>

          <View style={{height: 10}} />
          <CustomButtonPrimary
            title="REPORT MISSING PERSON"
            onPress={() => this.reportFormValidation()}
          />

          <View style={{height: 10}} />
        </ScrollView>

        <Spinner visible={this.state.loading} cancelable={false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  missingPersonImage: {
    width: Metrics.DEVICE_WIDTH / 3,
    height: Metrics.DEVICE_HEIGHT / 4,
    resizeMode: 'contain',
    marginLeft: Metrics.DEVICE_WIDTH / 3,
  },
  inputContainer: {
    borderRadius: 20,
    width: Metrics.DEVICE_WIDTH / 1.2,
    height: Metrics.DEVICE_HEIGHT / 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: Metrics.DEVICE_WIDTH / 13,
    backgroundColor: '#E9E9E9',
  },
  inputContainerMore: {
    borderRadius: 20,
    width: Metrics.DEVICE_WIDTH / 1.2,
    height: Metrics.DEVICE_HEIGHT / 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: Metrics.DEVICE_WIDTH / 13,
    backgroundColor: '#E9E9E9',
  },
  inputs: {
    height: Metrics.DEVICE_HEIGHT / 5,
    marginLeft: 16,
    flex: 1,
    fontFamily: AppStyles.primaryFont,
  },
  inputsMore: {
    height: 200,
    marginLeft: 16,
    flex: 1,
    fontFamily: AppStyles.primaryFont,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  borderSeparate: {
    width: Metrics.DEVICE_WIDTH / 1.2,
    height: 2,
    backgroundColor: 'black',
    marginTop: Metrics.DEVICE_HEIGHT / 15,
    marginLeft: Metrics.DEVICE_WIDTH / 12,
  },
  genderView: {
    marginLeft: Metrics.DEVICE_WIDTH / 9,
    marginTop: 10,
  },
});
