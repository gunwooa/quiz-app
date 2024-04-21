import React, { FC, useCallback, useMemo } from 'react';
import { Dimensions, SectionList, StyleSheet, View } from 'react-native';

import CLText from './common/CLText';
import QuizRecordListItem from './QuizRecordListItem';
import useOpenScreen from '../hooks/useOpenScreen';
import useQuizBundle from '../hooks/useQuizBundle';
import { QuizBundle } from '../stores/quiz-bundle-list';
import { color } from '../styles/color';

type QuizRecordListProps = {};

const SCREEN_NAME = {
  again: 'QuizDetail',
  complete: 'RecordDetail',
} as const;

const SCREEN_HEIGHT = Dimensions.get('window').height;

const QuizRecordList: FC<QuizRecordListProps> = () => {
  const { quizBundleList, quizReset } = useQuizBundle({});
  const { openScreen } = useOpenScreen();

  console.log('🐾 RecordTabScreen ', quizBundleList.length);

  const data = useMemo(
    () => [
      {
        title: `완료됨 (${quizBundleList.filter((q) => q.status === 'complete').length})`,
        data: quizBundleList.filter((q) => q.status === 'complete'),
      },
      {
        title: `다시 풀기 (${quizBundleList.filter((q) => q.status === 'again').length})`,
        data: quizBundleList.filter((q) => q.status === 'again'),
      },
    ],
    [quizBundleList],
  );

  const handlePressCategory = useCallback(
    (quizBundle: QuizBundle) => {
      if (quizBundle.status === 'again') {
        quizReset({ id: quizBundle?.id ?? -1, type: 'again' });
      }

      openScreen('push', SCREEN_NAME[quizBundle.status as 'again' | 'complete'], {
        quizBundleId: quizBundle.id,
      });
    },
    [openScreen, quizReset],
  );

  return (
    <View>
      <SectionList
        sections={data}
        renderItem={({ item }) => {
          return (
            <QuizRecordListItem
              quizBundle={item}
              containerStyle={styles.listItem}
              onPress={() => {
                handlePressCategory(item);
              }}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <View style={styles.header}>
              <CLText type="Body2">{title}</CLText>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default QuizRecordList;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: SCREEN_HEIGHT * 0.2,
  },

  header: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.GRAY_SCALE_2,
    fontSize: 32,
    backgroundColor: '#fff',
  },

  listItem: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});
