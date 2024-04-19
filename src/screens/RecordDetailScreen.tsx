import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList, 'RecordDetail'>;

const RecordDetailScreen = ({ route }: Props) => {
  const { quizBundleId } = route.params;

  return (
    <>
      <NavBackScreenHeader />
      <Text>{quizBundleId}</Text>
    </>
  );
};

export default RecordDetailScreen;

const styles = StyleSheet.create({});
