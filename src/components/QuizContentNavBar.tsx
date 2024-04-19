import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CLButton from './common/CLButton';
import CLIcon from './common/CLIcon';
import CLText from './common/CLText';
import useOpenScreen from '../hooks/useOpenScreen';
import useQuizBundle from '../hooks/useQuizBundle';
import { QuizBundle } from '../stores/quiz-bundle-list';
import { color } from '../styles/color';

type QuizContentNavBarProps = {
  quizBundle?: QuizBundle;
};

const QuizContentNavBar: FC<QuizContentNavBarProps> = ({ quizBundle }) => {
  const insets = useSafeAreaInsets();

  const { openScreen } = useOpenScreen();
  const { setter } = useQuizBundle({});

  console.log('🎁', JSON.stringify(quizBundle));

  //   const _color = disabled ? color.GRAY_SCALE_3 : color.GRAY_SCALE_6;

  const currentQuizzesIndex = useMemo(
    () => quizBundle?.currentQuizzesIndex ?? 0,
    [quizBundle?.currentQuizzesIndex],
  );

  const quizTotalCount = useMemo(
    () => quizBundle?.quizzes.length ?? 0,
    [quizBundle?.quizzes.length],
  );

  const handlePressPrevButton = useCallback(() => {
    if (!quizBundle) {
      return;
    }
    setter(quizBundle?.id, 'currentQuizzesIndex', currentQuizzesIndex - 1);
  }, [currentQuizzesIndex, quizBundle, setter]);

  const handlePressNextButton = useCallback(() => {
    if (!quizBundle) {
      return;
    }

    if (currentQuizzesIndex < quizTotalCount - 1) {
      setter(quizBundle.id, 'currentQuizzesIndex', currentQuizzesIndex + 1);
    } else {
      openScreen('push', 'RecordDetail', { quizBundleId: quizBundle?.id });
    }
  }, [currentQuizzesIndex, openScreen, quizBundle, quizTotalCount, setter]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.navBar}>
        <CLButton
          type="outlined"
          size="medium"
          title="이전문제"
          color="grey"
          borderRadius={20}
          leftArea={
            <CLIcon
              icon="ArrowRightGray"
              style={{ transform: [{ rotate: '180deg' }] }}
              width={14}
              height={14}
              stroke={!quizBundle?.currentQuizzesIndex ? color.GRAY_SCALE_3 : color.GRAY_SCALE_7}
            />
          }
          disabled={!quizBundle?.currentQuizzesIndex}
          onPress={handlePressPrevButton}
        />

        <CLText type="Body2" color={color.GRAY_SCALE_6}>
          {currentQuizzesIndex + 1} / {quizTotalCount}
        </CLText>

        <CLButton
          type="outlined"
          size="medium"
          title={currentQuizzesIndex < quizTotalCount - 1 ? '다음문제' : '결과보기'}
          color="grey"
          borderRadius={20}
          //   disabled
          rightArea={
            <CLIcon icon="ArrowRightGray" width={14} height={14} stroke={color.GRAY_SCALE_7} />
          }
          onPress={handlePressNextButton}
        />
      </View>
    </View>
  );
};

export default QuizContentNavBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: color.WHITE,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: color.WHITE,
  },

  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
  },
});
