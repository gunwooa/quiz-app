import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const RecordDetailScreen = ({}: Props) => {
  return (
    <>
      <NavBackScreenHeader />
      <Text>RecordDetailScreen</Text>
    </>
  );
};

export default RecordDetailScreen;

const styles = StyleSheet.create({});
