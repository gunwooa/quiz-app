import React, { Suspense } from 'react';
import { Button } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import QuizCategoryList from '../components/QuizCategoryList';
import QuizMainTabSkeleton from '../components/QuizMainTabSkeleton';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizTab'>;

const QuizTabScreen = ({}: Props) => {
  const { allReset } = useQuizBundle({});

  return (
    <>
      <ScreenHeader
        headerLeft="퀴즈"
        headerRight={<Button title="all reset" onPress={allReset} />}
      />

      <Suspense fallback={<QuizMainTabSkeleton />}>
        <QuizCategoryList />
      </Suspense>
    </>
  );
};

export default QuizTabScreen;
