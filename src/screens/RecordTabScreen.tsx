import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const RecordTabScreen = ({ navigation }: Props) => {
  return (
    <>
      <ScreenHeader headerLeft="기록" />
      <Text>RecordTabScreen</Text>
      <Button title="Go to QuizDetail" onPress={() => navigation.navigate('QuizDetail')} />
      <Button title="Go to RecordDetail" onPress={() => navigation.navigate('RecordDetail')} />
    </>
  );
};

export default RecordTabScreen;

const styles = StyleSheet.create({});
