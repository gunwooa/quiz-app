import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const QuizDetailScreen = ({ navigation }: Props) => {
  return (
    <>
      <NavBackScreenHeader />
      <Text>QuizDetailScreen</Text>
      <Button title="Go to QuizTab" onPress={() => navigation.navigate('QuizTab')} />
      <Button title="Go to RecordTab" onPress={() => navigation.navigate('RecordTab')} />
    </>
  );
};

export default QuizDetailScreen;

const styles = StyleSheet.create({});
