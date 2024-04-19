import React, { Suspense } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import QuizCategoryContainer from '../components/QuizCategoryContainer';
import QuizCategorySkeleton from '../components/QuizCategorySkeleton';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const QuizTabScreen = ({}: Props) => {
  return (
    <>
      <ScreenHeader headerLeft="퀴즈" />

      <Suspense fallback={<QuizCategorySkeleton />}>
        <QuizCategoryContainer />
      </Suspense>
    </>
  );
};

export default QuizTabScreen;
