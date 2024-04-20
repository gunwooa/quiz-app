import React from 'react';

import {
  DefaultTheme,
  NavigationContainer as RNNavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator, { MainTabParamList } from './MainTabNavigator';
import QuizDetailScreen from '../screens/QuizDetailScreen';
import RecordDetailScreen from '../screens/RecordDetailScreen';
import { color } from '../styles/color';
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
    <RNNavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: color.GRAY_SCALE_1,
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />

        <Stack.Screen
          name="QuizDetail"
          component={QuizDetailScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
      </Stack.Navigator>
    </RNNavigationContainer>
  );
};

export default NavigationContainer;
