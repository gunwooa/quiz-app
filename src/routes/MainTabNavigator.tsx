import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainTabBar from '../components/MainTabBar';
import QuizTabScreen from '../screens/QuizTabScreen';
import RecordTabScreen from '../screens/RecordTabScreen';

export type MainTabParamList = {
  QuizTab: undefined;
  RecordTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => <MainTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="QuizTab" component={QuizTabScreen} />
      <Tab.Screen name="RecordTab" component={RecordTabScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
