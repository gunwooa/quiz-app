import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenParamList } from '@src/routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const RecordDetailScreen = ({}: Props) => {
  return (
    <View>
      <Text>RecordDetailScreen</Text>
    </View>
  );
};

export default RecordDetailScreen;

const styles = StyleSheet.create({});
