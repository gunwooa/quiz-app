import React, { Suspense, useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import CLText from '../components/common/CLText';
import QuizCategoryList from '../components/QuizCategoryList';
import QuizMainTabSkeleton from '../components/QuizMainTabSkeleton';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';
import { color } from '../styles/color';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizTab'>;

const QuizTabScreen = ({}: Props) => {
  const { quizBundleReset } = useQuizBundle({});

  const handleReset = useCallback(() => {
    Alert.alert('알림', '진행 중인 문제가 모두 초기화됩니다.\n그래도 초기화 하시겠습니까?', [
      {
        text: '네',
        onPress: async () => {
          quizBundleReset(['progress']);
        },
        style: 'destructive',
      },
      {
        text: '아니요',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }, [quizBundleReset]);

  return (
    <>
      <ScreenHeader
        headerLeft="퀴즈"
        headerRight={
          <TouchableOpacity onPress={handleReset}>
            <CLText type="Body3" color={color.BLUE}>
              초기화
            </CLText>
          </TouchableOpacity>
        }
      />

      <Suspense fallback={<QuizMainTabSkeleton />}>
        <QuizCategoryList />
      </Suspense>
    </>
  );
};

export default QuizTabScreen;
