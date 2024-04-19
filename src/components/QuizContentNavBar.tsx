import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CLButton from './common/CLButton';
import CLIcon from './common/CLIcon';
import CLText from './common/CLText';
import { QuizBundle } from '../stores/quiz-bundle-list';
import { color } from '../styles/color';

type QuizContentNavBarProps = {
  quizBundle?: QuizBundle;
  selectedIndex: number | null;
  onPressPrevButton: () => void;
  onPressNextButton: () => void;
  onCheckAnswer: () => void;
};

const QuizContentNavBar: FC<QuizContentNavBarProps> = ({
  quizBundle,
  selectedIndex,
  onPressPrevButton,
  onPressNextButton,
  onCheckAnswer,
}) => {
  const insets = useSafeAreaInsets();

  const currentQuizzesIndex = useMemo(
    () => quizBundle?.currentQuizzesIndex ?? 0,
    [quizBundle?.currentQuizzesIndex],
  );

  const focusedQuiz = quizBundle?.quizzes[currentQuizzesIndex];

  const quizTotalCount = useMemo(
    () => quizBundle?.quizzes.length ?? 0,
    [quizBundle?.quizzes.length],
  );

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
          style={styles.navButton}
          onPress={onPressPrevButton}
        />

        <CLText type="Body2" color={color.GRAY_SCALE_6}>
          {currentQuizzesIndex + 1} / {quizTotalCount}
        </CLText>

        {focusedQuiz?.selectedIndex === null ? (
          <CLButton
            type="filled"
            size="medium"
            title={'정답확인'}
            color="black"
            borderRadius={20}
            disabled={selectedIndex === null}
            style={styles.navButton}
            onPress={onCheckAnswer}
          />
        ) : (
          <CLButton
            type="outlined"
            size="medium"
            title={currentQuizzesIndex < quizTotalCount - 1 ? '다음문제' : '결과보기'}
            color="grey"
            borderRadius={20}
            disabled={selectedIndex === null}
            style={styles.navButton}
            rightArea={
              <CLIcon
                icon="ArrowRightGray"
                width={14}
                height={14}
                stroke={selectedIndex === null ? color.GRAY_SCALE_3 : color.GRAY_SCALE_7}
              />
            }
            onPress={onPressNextButton}
          />
        )}
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
    borderTopWidth: 1,
    borderTopColor: color.GRAY_SCALE_2,
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
    width: 110,
  },
});
