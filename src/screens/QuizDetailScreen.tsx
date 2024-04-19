import React, { useEffect, useMemo, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';

import CLText from '../components/common/CLText';
import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import { queryKey } from '../constants/queryKey';
import useQuizDetailQuery from '../hooks/useQuizDetailQuery';
import { ScreenParamList } from '../routes/NavigationContainer';
import useQuizListStore from '../stores/quiz-bundle-list';
import { color } from '../styles/color';
import { QuizCategoryResponse } from '../types';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizDetail'>;

const QuizDetailScreen = ({ route, navigation }: Props) => {
  const { categoryId } = route.params;
  const queryClient = useQueryClient();

  const {
    quizBundleList,
    setter,
    getProgressingQuizBundleIndex,
    pushQuizBundle,
    removeQuizBundle,
    generateQuizBundle,
    reset,
  } = useQuizListStore();

  const { data, isFetching, refetch } = useQuizDetailQuery({
    categoryId,
    gcTime: 0,
  });

  const quizName = queryClient
    .getQueryData<QuizCategoryResponse>(queryKey.quizCategories())
    ?.trivia_categories.find((c) => c.id === categoryId)?.name;

  const quizBundle = useMemo(
    () => quizBundleList[getProgressingQuizBundleIndex(categoryId)],
    [categoryId, getProgressingQuizBundleIndex, quizBundleList],
  );

  console.log(categoryId, getProgressingQuizBundleIndex(categoryId), '🔥', isFetching, data);

  useEffect(() => {
    if (getProgressingQuizBundleIndex(categoryId) === -1 && data?.results) {
      const q = generateQuizBundle({
        categoryId,
        originQuizzes: data?.results ?? [],
      });

      pushQuizBundle(q);
    }
  }, [
    categoryId,
    data?.results,
    generateQuizBundle,
    getProgressingQuizBundleIndex,
    pushQuizBundle,
  ]);

  console.log('✅', JSON.stringify(quizBundle));

  return (
    <>
      <NavBackScreenHeader
        headerCenter={
          <View style={styles.headerCenterBox}>
            <CLText type="Body3" color={color.GRAY_SCALE_7}>
              {quizName}
            </CLText>
          </View>
        }
      />

      <CLText type="H1">{categoryId}</CLText>
    </>
  );
};

export default QuizDetailScreen;

const styles = StyleSheet.create({
  headerCenterBox: {
    alignItems: 'center',
    width: '50%',
  },
});

{
  /* <Button
        title="refetch"
        onPress={() => {
          // setter(id, 'status', 'again');
          // const quiz = quizBundleList[getProgressingQuizBundleIndex(categoryId)];
          // const updatedQuizzes = [...quiz.quizzes];
          // updatedQuizzes[quiz.currentQuizzesIndex].selectedIndex = 1;
          // setter(quiz.id, 'quizzes', updatedQuizzes);
          // removeQuizBundle(getProgressingQuizBundleIndex(categoryId));
          // refetch();
        }}
      /> */
}
{
  /* <Button title="reset" onPress={reset} /> */
}
