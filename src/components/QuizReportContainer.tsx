import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { DateTime } from 'luxon';
import Svg, { Circle } from 'react-native-svg';

import CLText from './common/CLText';
import useQuizBundle from '../hooks/useQuizBundle';
import { color } from '../styles/color';
import { formatTime, getGrade } from '../utils/common';

type QuizReportBoxProps = {
  quizBundleId: number;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const QuizReportContainer: FC<QuizReportBoxProps> = ({ quizBundleId }) => {
  const { quizBundle } = useQuizBundle({
    quizBundleId,
  });

  const totalQuizCount = quizBundle?.quizzes.length ?? 0;
  const answerQuizCount =
    quizBundle?.quizzes.filter((q) => q.answerIndex === q.selectedIndex).length ?? 0;
  const percentage = (answerQuizCount / totalQuizCount) * 100;

  const radius = SCREEN_WIDTH / 3.5; // Radius of the circle
  const stroke = 16; // Stroke width of the circle progress
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const svgSize = (radius + stroke) * 2; // Size of the SVG container
  const strokeDashoffset = circumference - (circumference * percentage) / 100; // Calculate the stroke dash offset

  const infos = [
    {
      title: '정답수 / 문항수',
      value: `${answerQuizCount} / ${totalQuizCount}`,
    },
    {
      title: '퀴즈 생성 날짜',
      value: `${DateTime.fromISO(quizBundle?.createdAt ?? '').toFormat('yyyy-MM-dd\nHH:mm:ss')}`,
    },
    {
      title: '퀴즈 푼 날짜',
      value: `${DateTime.fromISO(quizBundle?.completedAt ?? '').toFormat('yyyy-MM-dd\nHH:mm:ss')}`,
    },
    {
      title: '풀이 시간',
      value: `${formatTime(quizBundle?.elapsedTimeInSeconds ?? 0)}`,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.circleBox}>
          <Svg width={svgSize} height={svgSize}>
            <Circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              fill="none"
              stroke={color.GRAY_SCALE_1}
              strokeWidth={stroke}
            />
            {percentage > 0 && (
              <Circle
                cx={svgSize / 2}
                cy={svgSize / 2}
                r={radius}
                fill="none"
                stroke={getGrade(percentage).color}
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
              />
            )}
          </Svg>

          <View style={styles.circleTextBox}>
            <CLText type="Body1" color={color.GRAY_SCALE_5}>
              정답률
            </CLText>
            <CLText type="H1" color={color.GRAY_SCALE_7}>
              {Math.round(percentage)}%
            </CLText>
          </View>
        </View>

        <View
          style={{
            ...styles.scoreText,
            backgroundColor: getGrade(percentage).color,
          }}>
          <CLText type="H4" color={color.WHITE}>
            {getGrade(percentage).message}
          </CLText>
        </View>

        <View style={styles.infoListBox}>
          {infos.map((info, index) => {
            return (
              <View
                key={`info-item-${index}`}
                style={[
                  styles.infoListItem,
                  // eslint-disable-next-line react-native/no-inline-styles
                  { borderBottomWidth: index === infos.length - 1 ? 0 : 1 },
                ]}>
                <CLText type="Body2" color={color.GRAY_SCALE_5}>
                  {info.title}
                </CLText>
                <CLText type="Body2" color={color.GRAY_SCALE_7} textAlign="right">
                  {info.value}
                </CLText>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default QuizReportContainer;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 60,
    backgroundColor: color.GRAY_SCALE_1,
  },
  card: {
    // alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    paddingBottom: 4,
    marginTop: 20,
    marginHorizontal: 24,
    backgroundColor: color.WHITE,
    shadowColor: color.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  circleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTextBox: {
    position: 'absolute',
    alignItems: 'center',
  },
  scoreText: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },

  infoListBox: {
    marginTop: 12,
  },
  infoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomColor: color.GRAY_SCALE_2,
  },
});
