import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList, 'RecordDetail'>;

const RecordDetailScreen = ({ route }: Props) => {
  const { quizBundleId } = route.params;

  const { quizBundle } = useQuizBundle({
    quizBundleId,
  });

  console.log('RecordDetailScreen 🎁', quizBundle);

  return (
    <>
      <NavBackScreenHeader />
      <Text>{quizBundle?.elapsedTimeInSeconds}</Text>
    </>
  );
};

export default RecordDetailScreen;

const styles = StyleSheet.create({});
