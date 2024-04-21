import React, { FC, useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { DateTime } from 'luxon';

import QuizContentBox from './QuizContentBox';
import QuizContentNavBar from './QuizContentNavBar';
import QuizTimer from './QuizTimer';
import QuizTotalIndicator from './QuizTotalIndicator';
import useOpenScreen from '../hooks/useOpenScreen';
import useQuizBundle from '../hooks/useQuizBundle';
import useQuizDetailQuery from '../hooks/useQuizDetailQuery';
import { useObserverStore } from '../stores/observer';
import { ObserverKey, QuizCategory } from '../types';

type QuizContainerProps = {
  category?: QuizCategory;
  quizBundleId?: number;
};

const QuizContainer: FC<QuizContainerProps> = ({ category, quizBundleId }) => {
  const { openScreen } = useOpenScreen();
  const { add, remove } = useObserverStore();

  const { refetch } = useQuizDetailQuery({
    categoryId: category?.id ?? -1,
    quizBundleId,
    enabled: false,
  });

  const { quizBundle, removeQuizBundle, setter } = useQuizBundle({
    categoryId: category?.id,
    quizBundleId,
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const cid = useId();

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
          onPress: async () => {
            removeQuizBundle(quizBundle?.id ?? -1);
            refetch().then(() => {
              handleStartTimer();
            });

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
  }, [handleResetTimer, handleStartTimer, quizBundle?.id, refetch, removeQuizBundle]);

  useEffect(() => {
    const focusedQuizSelectedIndex =
      quizBundle?.quizzes[quizBundle.currentQuizzesIndex].selectedIndex;
    if (focusedQuizSelectedIndex !== null && focusedQuizSelectedIndex !== undefined) {
      setSelectedIndex(focusedQuizSelectedIndex);
    }
  }, [quizBundle?.currentQuizzesIndex, quizBundle?.quizzes]);

  useEffect(() => {
    const observer = { id: cid, listener: handleRefetchQuiz };
    add(ObserverKey.QuizRefetchCall, observer);
    return () => {
      remove(ObserverKey.QuizRefetchCall, observer.id);
    };
  }, [add, cid, handleRefetchQuiz, remove]);

  return (
    <>
      <QuizContentBox
        quizBundle={quizBundle}
        selectedIndex={selectedIndex}
        ListHeaderComponent={
          quizBundle?.status === 'complete' ? (
            <QuizTotalIndicator quizBundleId={quizBundleId ?? -1} />
          ) : (
            <QuizTimer seconds={seconds} isActive={isActive} setSeconds={setSeconds} />
          )
        }
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
  );
};

export default QuizContainer;
