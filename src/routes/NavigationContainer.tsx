import React from 'react';

import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator, { MainTabParamList } from './MainTabNavigator';
import QuizDetailScreen from '../screens/QuizDetailScreen';
import RecordDetailScreen from '../screens/RecordDetailScreen';
import { QuizCategory } from '../types';

type RootStackParamList = {
  MainTab: undefined;
  QuizDetail: { category?: QuizCategory; quizBundleId?: number; queryEnabled?: boolean };
  RecordDetail: { quizBundleId: number };
};

export type ScreenParamList = RootStackParamList & MainTabParamList;

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationContainer = () => {
  return (
    <RNNavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />

        <Stack.Screen name="QuizDetail" component={QuizDetailScreen} />
        <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
      </Stack.Navigator>
    </RNNavigationContainer>
  );
};

export default NavigationContainer;
