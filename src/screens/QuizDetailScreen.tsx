import React, { useEffect, useMemo } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CLText from '../components/common/CLText';
import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import QuizDetailSkeleton from '../components/QuizDetailSkeleton';
import useQuizDetailQuery from '../hooks/useQuizDetailQuery';
import { ScreenParamList } from '../routes/NavigationContainer';
import useQuizListStore from '../stores/quiz-bundle-list';
import { color } from '../styles/color';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizDetail'>;

const QuizDetailScreen = ({ route }: Props) => {
  const { category, quizBundleId, queryEnabled = false } = route.params;

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
    categoryId: category?.id ?? -1,
    quizBundleId,
    enabled: queryEnabled,
    gcTime: 0,
  });

  const quizBundle = useMemo(() => {
    return category?.id
      ? quizBundleList[getProgressingQuizBundleIndex(category.id)]
      : quizBundleList.find((q) => q.id === quizBundleId);
  }, [category?.id, getProgressingQuizBundleIndex, quizBundleId, quizBundleList]);

  useEffect(() => {
    if (
      category &&
      getProgressingQuizBundleIndex(category.id) === -1 &&
      !isFetching &&
      data?.results
    ) {
      const _quizBundle = generateQuizBundle({
        category,
        originQuizzes: data?.results ?? [],
      });
      pushQuizBundle(_quizBundle);
    }
  }, [
    category,
    data?.results,
    generateQuizBundle,
    getProgressingQuizBundleIndex,
    isFetching,
    pushQuizBundle,
  ]);

  console.log(
    category,
    getProgressingQuizBundleIndex(category?.id),
    quizBundle?.id,
    '🔥',
    isFetching,
    data?.results.length,
  );
  // console.log('1✅', quizBundle);
  // console.log('2✅', JSON.stringify(quizBundleList));

  return (
    <>
      <NavBackScreenHeader
        headerCenter={
          <View style={styles.headerCenterBox}>
            <CLText type="Body3" color={color.GRAY_SCALE_7}>
              {category?.name}
            </CLText>
          </View>
        }
      />

      {isFetching ? (
        <QuizDetailSkeleton />
      ) : (
        <>
          <Button
            title="refetch"
            onPress={() => {
              setter(quizBundle?.id ?? -1, 'status', 'complete');
              // const updatedQuizzes = [...quiz.quizzes];
              // updatedQuizzes[quiz.currentQuizzesIndex].selectedIndex = 1;
              // setter(quiz.id, 'quizzes', updatedQuizzes);
              // removeQuizBundle(quizBundle?.id ?? -1);
              // refetch();
            }}
          />
          <Button title="reset" onPress={reset} />
          <CLText type="H1">{quizBundle?.id}</CLText>
        </>
      )}
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
