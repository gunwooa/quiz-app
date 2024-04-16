import React from 'react';

import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuizDetailScreen from '@src/screens/QuizDetailScreen';
import RecordDetailScreen from '@src/screens/RecordDetailScreen';

import MainTabNavigator, { MainTabParamList } from './MainTabNavigator';

type RootStackParamList = {
  MainTab: undefined;
  QuizDetail: undefined;
  RecordDetail: undefined;
};

export type ScreenParamList = RootStackParamList & MainTabParamList;

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationContainer = () => {
  return (
    <RNNavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="QuizDetail" component={QuizDetailScreen} />
        <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
      </Stack.Navigator>
    </RNNavigationContainer>
  );
};

export default NavigationContainer;
