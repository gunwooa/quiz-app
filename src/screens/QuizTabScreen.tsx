import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const QuizTabScreen = ({ navigation }: Props) => {
  return (
    <>
      <ScreenHeader headerLeft="퀴즈" />

      <Text>QuizTabScreen</Text>
      <Button title="Go to QuizDetail" onPress={() => navigation.navigate('QuizDetail')} />
      <Button title="Go to RecordDetail" onPress={() => navigation.navigate('RecordDetail')} />
    </>
  );
};

export default QuizTabScreen;

const styles = StyleSheet.create({});
