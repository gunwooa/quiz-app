import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import QuizRecordList from '../components/QuizRecordList';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList, 'RecordTab'>;

const RecordTabScreen = ({}: Props) => {
  return (
    <>
      <ScreenHeader headerLeft="기록" />

      <QuizRecordList />
    </>
  );
};

export default RecordTabScreen;
