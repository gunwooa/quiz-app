import React from 'react';
import { StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CLText from '../components/common/CLText';
import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizDetail'>;

const QuizDetailScreen = ({ route }: Props) => {
  const { id } = route.params;

  return (
    <>
      <NavBackScreenHeader />
      <CLText type="H1">{id}</CLText>
    </>
  );
};

export default QuizDetailScreen;

const styles = StyleSheet.create({});
