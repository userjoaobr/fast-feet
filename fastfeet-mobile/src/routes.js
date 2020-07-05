import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Details from './pages/Details';
import AddProblem from './pages/AddProblem';
import ShowProblems from './pages/ShowProblems';
import Confirm from './pages/Confirm';

const AppStack = createStackNavigator(
  {
    Dashboard,
    Details,
    AddProblem,
    ShowProblems,
    Confirm,
  },
  {
    defaultNavigationOptions: {
      headerTitle: '',
      headerTransparent: true,
      headerLeftContainerStyle: {
        marginLeft: 20,
      },
    },
  },
);

const App = createBottomTabNavigator(
  {
    Entregas: AppStack,
    Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = '';
        if (routeName === 'Entregas') {
          iconName = 'local-shipping';
        }
        return <Icon name={iconName} size={24} color={tintColor} />;
      },
    }),
    resetOnBlur: true,
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: '#7d40e7',
      inactiveTintColor: '#999999',
      style: {
        backgroundColor: '#ffffff',
      },
    },
  },
);

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App,
      },
      {
        initialRouteName: isSigned ? 'App' : 'SignIn',
      },
    ),
  );
