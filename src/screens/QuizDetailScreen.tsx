import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DateTime } from 'luxon';

import useGenerateQuizBundleQuery from './useGenerateQuizBundleQuery';
import CLText from '../components/common/CLText';
import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import QuizContentContainer from '../components/QuizContentContainer';
import QuizContentNavBar from '../components/QuizContentNavBar';
import QuizDetailSkeleton from '../components/QuizDetailSkeleton';
import useOpenScreen from '../hooks/useOpenScreen';
import useQuizBundle from '../hooks/useQuizBundle';
import useQuizDetailQuery from '../hooks/useQuizDetailQuery';
import { ScreenParamList } from '../routes/NavigationContainer';
import { color } from '../styles/color';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizDetail'>;

const QuizDetailScreen = ({ route }: Props) => {
  const { category, quizBundleId, queryEnabled = false } = route.params;

  const { openScreen, goBack } = useOpenScreen();

  useGenerateQuizBundleQuery({ category, quizBundleId, queryEnabled });

  const { isFetching, refetch } = useQuizDetailQuery({
    categoryId: category?.id ?? -1,
    quizBundleId,
    enabled: queryEnabled,
    gcTime: 0,
  });

  const { quizBundle, removeQuizBundle, setter } = useQuizBundle({
    categoryId: category?.id,
    quizBundleId,
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const currentQuizzesIndex = useMemo(
    () => quizBundle?.currentQuizzesIndex ?? 0,
    [quizBundle?.currentQuizzesIndex],
  );

  const isLastQuiz = useMemo(
    () => currentQuizzesIndex === (quizBundle?.quizzes.length ?? 0) - 1,
    [currentQuizzesIndex, quizBundle?.quizzes.length],
  );

  const handleChangeSelectedIndex = useCallback((index: number | null) => {
    setSelectedIndex(index);
  }, []);

  const handleStartTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const handlePauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleResetTimer = useCallback(() => {
    handlePauseTimer();
    setSeconds(0);
  }, [handlePauseTimer]);

  const handlePressPrevButton = useCallback(() => {
    if (!quizBundle) {
      return;
    }
    setter(quizBundle?.id, 'currentQuizzesIndex', currentQuizzesIndex - 1);
    setSelectedIndex(null);
  }, [currentQuizzesIndex, quizBundle, setter]);

  const handlePressNextButton = useCallback(() => {
    if (!quizBundle) {
      return;
    }

    if (isLastQuiz) {
      openScreen('replace', 'RecordDetail', { quizBundleId: quizBundle?.id });
      setter(quizBundle.id, 'status', 'complete');
      setter(quizBundle.id, 'elapsedTimeInSeconds', seconds);
      setter(quizBundle.id, 'completedAt', DateTime.now().toISO());
    } else {
      setter(quizBundle.id, 'currentQuizzesIndex', currentQuizzesIndex + 1);
      setSelectedIndex(null);
    }
  }, [currentQuizzesIndex, isLastQuiz, openScreen, quizBundle, seconds, setter]);

  const handleCheckAnswer = useCallback(() => {
    if (!quizBundle) {
      return;
    }
    const updatedQuizzes = [...quizBundle.quizzes];
    updatedQuizzes[currentQuizzesIndex].selectedIndex = selectedIndex;
    setter(quizBundle.id, 'quizzes', updatedQuizzes);

    if (isLastQuiz) {
      handlePauseTimer();
    }
  }, [currentQuizzesIndex, handlePauseTimer, isLastQuiz, quizBundle, selectedIndex, setter]);

  const handleRefetchQuiz = useCallback(() => {
    Alert.alert(
      '알림',
      '현재까지 푼 문제가 모두 초기화됩니다.\n계속해서 새로운 문제를 불러오시겠습니까?',
      [
        {
          text: '네',
          onPress: () => {
            removeQuizBundle(quizBundle?.id ?? -1);
            refetch();
            setSelectedIndex(null);
            handleResetTimer();
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
  }, [handleResetTimer, quizBundle?.id, refetch, removeQuizBundle]);

  const handleGoBack = useCallback(() => {
    if (quizBundle?.quizzes[0].selectedIndex === null) {
      goBack();
      return;
    }

    Alert.alert('알림', '현재까지 푼 문제가 모두 초기화됩니다.\n그래도 뒤로 가시겠습니까?', [
      {
        text: '네',
        onPress: () => {
          goBack();
          // reset 은 화면으로 들어 오는 시점에 초기화 함, 이유는 앱을 메모리에서 날려버렸을때를 대비해서임
        },
        style: 'destructive',
      },
      {
        text: '아니요',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }, [goBack, quizBundle?.quizzes]);

  useEffect(() => {
    if (!isFetching) {
      handleStartTimer();
    }
  }, [handleStartTimer, isFetching]);

  useEffect(() => {
    const focusedQuizSelectedIndex =
      quizBundle?.quizzes[quizBundle.currentQuizzesIndex].selectedIndex;
    if (focusedQuizSelectedIndex !== null && focusedQuizSelectedIndex !== undefined) {
      setSelectedIndex(focusedQuizSelectedIndex);
    }
  }, [quizBundle?.currentQuizzesIndex, quizBundle?.quizzes]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        handleGoBack();
        return true;
      });
      return () => subscription.remove();
    }, [handleGoBack]),
  );

  console.log('1✅', JSON.stringify(quizBundle));
  // console.log('2✅', JSON.stringify(quizBundleList));

  return (
    <>
      <NavBackScreenHeader
        onCustomGoBack={handleGoBack}
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
          <QuizContentContainer
            quizBundle={quizBundle}
            selectedIndex={selectedIndex}
            seconds={seconds}
            isActive={isActive}
            setSeconds={setSeconds}
            onChangeSelectedIndex={handleChangeSelectedIndex}
          />

          <QuizContentNavBar
            quizBundle={quizBundle}
            selectedIndex={selectedIndex}
            onPressPrevButton={handlePressPrevButton}
            onPressNextButton={handlePressNextButton}
            onCheckAnswer={handleCheckAnswer}
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
