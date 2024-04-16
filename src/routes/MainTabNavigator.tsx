import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import QuizTabScreen from '@src/screens/QuizTabScreen';
import RecordTabScreen from '@src/screens/RecordTabScreen';

export type MainTabParamList = {
  QuizTab: undefined;
  RecordTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="QuizTab" component={QuizTabScreen} />
      <Tab.Screen name="RecordTab" component={RecordTabScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
