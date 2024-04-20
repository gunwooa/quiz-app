import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import useOpenScreen from '~/src/hooks/useOpenScreen';
import { QuizCategory } from '~/src/types';

import QuizCategoryListItem from './QuizCategoryListItem';
import useQuizBundle from '../hooks/useQuizBundle';
import useQuizCategoriesQuery from '../hooks/useQuizCategoriesQuery';

type QuizCategoryListProps = {};

const QuizCategoryList: FC<QuizCategoryListProps> = () => {
  const { openScreen } = useOpenScreen();
  const { data: categories } = useQuizCategoriesQuery();
  const { getProgressingQuizBundleIndex, quizReset, quizBundleList } = useQuizBundle({});

  const handlePressCategory = useCallback(
    (category: QuizCategory) => {
      const quizBundle = quizBundleList[getProgressingQuizBundleIndex(category.id)];
      quizReset({ id: quizBundle?.id ?? -1, type: 'progress' });

      const queryEnabled = getProgressingQuizBundleIndex(category.id) === -1;
      openScreen('push', 'QuizDetail', { category, queryEnabled });
    },
    [getProgressingQuizBundleIndex, openScreen, quizBundleList, quizReset],
  );

  return (
    <>
      <FlatList
        data={categories}
        renderItem={({ item }) => {
          return (
            <QuizCategoryListItem
              category={item}
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

export default QuizCategoryList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 20,
  },
});
