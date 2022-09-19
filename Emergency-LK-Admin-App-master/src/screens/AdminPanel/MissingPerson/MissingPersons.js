/**
 * EmergencyLK
 * Missing Persons News Feed
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HeaderPrimary from '../../../components/Header/HeaderPrimary';
import Metrics from '../../../config/Metrics';
import AppStyles from '../../../config/AppStyles';
import API from '../../../config/API';
import Spinner from 'react-native-loading-spinner-overlay';
import MissingPersonsMore from './MissingPersonsMore';

export default class MissingPersons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      missingp_data: [],
    };
  }

  clickEventListener = item => {
    this.props.navigation.navigate('MissingPersonsMore', {
      screen: MissingPersonsMore,
      MisiingPerson: item,
    });
  };

  componentWillMount() {
    this.API_Get_MissingPersons();
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

  //Get All Missing Persons Details API function
  API_Get_MissingPersons = () => {
    this.setState({loading: true});

    fetch(API.API_GET_MISSING_PERSONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseText => {
        this.setState({loading: false});
        if (responseText.data[0].status_code == '200') {
          this.setState({missingp_data: responseText.data});
        } else {
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
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderPrimary
          title="All Missing Persons"
          onPress={() => this.backButtonOnPress()}
        />

        <ScrollView>
          <FlatList
            style={styles.tasks}
            columnWrapperStyle={styles.listContainer}
            data={this.state.missingp_data}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={[styles.card, {borderColor: AppStyles.primaryColor}]}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}>
                  <View style={styles.cardContent}>
                    <Text style={[styles.description]}>
                      Missing person in {item.Last_Seen_Location}
                    </Text>
                    <Text style={styles.date}>
                      Reported By : {item.Reporter_Name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
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
  tasks: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 6,
    height: Metrics.DEVICE_HEIGHT / 7,
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: AppStyles.colorBlack,
    fontFamily: AppStyles.primaryFontBold,
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: '#696969',
    marginTop: 5,
    fontFamily: AppStyles.primaryFont,
  },
});
