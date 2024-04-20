import React, { Suspense } from 'react';
import { Button } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import QuizCategoryContainer from '../components/QuizCategoryContainer';
import QuizCategorySkeleton from '../components/QuizCategorySkeleton';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const QuizTabScreen = ({}: Props) => {
  const { allReset } = useQuizBundle({});

  return (
    <>
      <ScreenHeader
        headerLeft="퀴즈"
        headerRight={<Button title="all reset" onPress={allReset} />}
      />

      <Suspense fallback={<QuizCategorySkeleton />}>
        <QuizCategoryContainer />
      </Suspense>
    </>
  );
};

export default QuizTabScreen;
