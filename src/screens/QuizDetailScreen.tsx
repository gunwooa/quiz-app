import React, { useCallback, useEffect } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CLText from '../components/common/CLText';
import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import QuizContentNavBar from '../components/QuizContentNavBar';
import QuizDetailSkeleton from '../components/QuizDetailSkeleton';
import useQuizBundle from '../hooks/useQuizBundle';
import useQuizDetailQuery from '../hooks/useQuizDetailQuery';
import { ScreenParamList } from '../routes/NavigationContainer';
import { color } from '../styles/color';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizDetail'>;

const QuizDetailScreen = ({ route }: Props) => {
  const { category, quizBundleId, queryEnabled = false } = route.params;

  const { data, isFetching, refetch } = useQuizDetailQuery({
    categoryId: category?.id ?? -1,
    quizBundleId,
    enabled: queryEnabled,
    gcTime: 0,
  });

  const {
    quizBundle,
    getProgressingQuizBundleIndex,
    pushQuizBundle,
    removeQuizBundle,
    generateQuizBundle,
    reset,
  } = useQuizBundle({ categoryId: category?.id, quizBundleId });

  const handleRefetchQuiz = useCallback(() => {
    Alert.alert(
      '알림',
      '현재까지 푼 문제가 초기화됩니다.\n계속해서 새로운 문제를 불러오시겠습니까?',
      [
        {
          text: '네',
          onPress: () => {
            removeQuizBundle(quizBundle?.id ?? -1);
            refetch();
          },
          style: 'destructive',
        },
        {
          text: '아니요',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }, [quizBundle?.id, refetch, removeQuizBundle]);

  // TODO : useQuizBundle 훅 내부로 옮길지 고민, 안옮겨도 될듯, 이 화면에서만 사용하는 것 같음
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
              {category?.name} ({quizBundle?.id}) {/* FIXME : 임시용 표시  */}
            </CLText>
          </View>
        }
        headerRight={
          <TouchableOpacity onPress={handleRefetchQuiz}>
            <CLText type="Body3" color={color.BLUE}>
              다른문제
            </CLText>
          </TouchableOpacity>
        }
      />

      {isFetching ? (
        <QuizDetailSkeleton />
      ) : (
        <>
          {/* <Button
            title="refetch"
            onPress={() => {
              setter(quizBundle?.id ?? -1, 'status', 'complete');
              // const updatedQuizzes = [...quiz.quizzes];
              // updatedQuizzes[quiz.currentQuizzesIndex].selectedIndex = 1;
              // setter(quiz.id, 'quizzes', updatedQuizzes);
            }}
          /> */}
          <Button title="reset" onPress={reset} />

          <QuizContentNavBar
            // categoryId={category?.id}
            // quizBundleId={quizBundleId}
            quizBundle={quizBundle}
          />
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
  refetchButton: {
    fontSize: 16,
  },
});
