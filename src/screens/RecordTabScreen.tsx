import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenHeader from '~/src/components/common/ScreenHeader';

import QuizRecordListItem from '../components/QuizRecordListItem';
import useOpenScreen from '../hooks/useOpenScreen';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';
import { QuizBundle } from '../stores/quiz-bundle-list';

type Props = NativeStackScreenProps<ScreenParamList>;

const SCREEN_NAME = {
  progress: 'QuizDetail',
  again: 'QuizDetail',
  complete: 'RecordDetail',
} as const;

const RecordTabScreen = ({}: Props) => {
  const { quizBundleList } = useQuizBundle({});
  const { openScreen } = useOpenScreen();

  const handlePressCategory = useCallback(
    (quizBundle: QuizBundle) => {
      openScreen('push', SCREEN_NAME[quizBundle.status], { quizBundleId: quizBundle.id });
    },
    [openScreen],
  );

  console.log('🐾 RecordTabScreen ', quizBundleList.length);

  return (
    <>
      <ScreenHeader headerLeft="기록" />

      <FlatList
        data={quizBundleList.filter((q) => q.status !== 'progress')}
        // data={quizBundleList}
        renderItem={({ item }) => {
          return (
            <QuizRecordListItem
              quizBundle={item}
              onPress={() => {
                handlePressCategory(item);
              }}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </>
  );
};

export default RecordTabScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 20,
  },
});
