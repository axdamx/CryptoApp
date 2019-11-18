import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

class App extends React.Component {
  render() {
    return <HomeScreen />
  }
}

class Detail extends React.Component {
  render() {
    return <DetailsScreen />
  }
}

const AppNavigator = createStackNavigator ({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Crypto App',
      headerStyle: {
        backgroundColor: '#1f3252',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  DetailsScreen :{
    screen: DetailsScreen,
    navigationOptions: {
      title: 'Details',
      headerStyle: {
        backgroundColor: '#1f3252',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer;
