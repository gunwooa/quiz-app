import React, { FC } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import CLText from './common/CLText';
import useQuizBundle from '../hooks/useQuizBundle';
import { color } from '../styles/color';

type QuizTotalIndicatorProps = {
  quizBundleId: number;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const QuizTotalIndicator: FC<QuizTotalIndicatorProps> = ({ quizBundleId }) => {
  const { quizBundle, setter } = useQuizBundle({
    quizBundleId,
  });

  return (
    <View style={styles.container}>
      <View style={styles.quizListBox}>
        {quizBundle?.quizzes.map((quiz, index) => (
          <TouchableOpacity
            key={`quiz-${index}`}
            onPress={() => {
              setter(quizBundleId ?? -1, 'currentQuizzesIndex', index);
            }}
            style={[
              styles.quizListItem,
              {
                backgroundColor:
                  quizBundle?.currentQuizzesIndex === index ? color.GRAY_SCALE_3 : color.WHITE,
              },
            ]}>
            <CLText type="Body3" mb={4}>
              {index + 1}
            </CLText>
            <CLText type="Body3">{quiz.answerIndex === quiz.selectedIndex ? '✅' : '❌'}</CLText>
          </TouchableOpacity>
        ))}
        <View style={styles.totalBox}>
          <CLText type="Body3">
            ✅ {quizBundle?.quizzes.filter((q) => q.answerIndex === q.selectedIndex).length}
          </CLText>
          <CLText type="Body3" ml={12}>
            ❌ {quizBundle?.quizzes.filter((q) => q.answerIndex !== q.selectedIndex).length}
          </CLText>
        </View>
      </View>
    </View>
  );
};

export default QuizTotalIndicator;

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    paddingBottom: 2,
    backgroundColor: color.GRAY_SCALE_1,
  },
  totalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: SCREEN_WIDTH / 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  quizListBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
  },
  quizListItem: {
    alignItems: 'center',
    width: (SCREEN_WIDTH - 10) / 10,
    paddingVertical: 4,
    backgroundColor: color.WHITE,
  },
});
