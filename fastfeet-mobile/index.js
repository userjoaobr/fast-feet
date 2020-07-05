import { AppRegistry } from 'react-native';
import FastFeet from './src';
import { name as appName } from './app.json';

require('react-native').unstable_enableLogBox();

AppRegistry.registerComponent(appName, () => FastFeet);
