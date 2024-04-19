import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import useOpenScreen from '~/src/hooks/useOpenScreen';
import { QuizCategory } from '~/src/types';

import QuizCategoryListItem from './QuizCategoryListItem';
import useQuizBundle from '../hooks/useQuizBundle';
import useQuizCategoriesQuery from '../hooks/useQuizCategoriesQuery';

type QuizCategoryContainerProps = {};

const QuizCategoryContainer: FC<QuizCategoryContainerProps> = () => {
  const { openScreen } = useOpenScreen();
  const { data: categories } = useQuizCategoriesQuery();
  const { getProgressingQuizBundleIndex } = useQuizBundle({});

  const handlePressCategory = useCallback(
    (category: QuizCategory) => {
      const queryEnabled = getProgressingQuizBundleIndex(category.id) === -1;
      openScreen('push', 'QuizDetail', { category, queryEnabled });
    },
    [getProgressingQuizBundleIndex, openScreen],
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

export default QuizCategoryContainer;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 20,
  },
});
