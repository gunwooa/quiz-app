import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import useOpenScreen from '~/src/hooks/useOpenScreen';

import QuizCategoryItem from './QuizCategoryItem';
import useQuizCategoriesQuery from '../../hooks/useQuizCategoriesQuery';

type QuizCategoryContainerProps = {};

const QuizCategoryContainer: FC<QuizCategoryContainerProps> = () => {
  const { openScreen } = useOpenScreen();
  const { data: categories } = useQuizCategoriesQuery();

  const handlePressCategory = useCallback(
    (categoryId: number) => {
      openScreen('push', 'QuizDetail', { categoryId });
    },
    [openScreen],
  );

  return (
    <>
      <FlatList
        data={categories}
        renderItem={({ item }) => {
          return (
            <QuizCategoryItem
              category={item}
              onPress={() => {
                handlePressCategory(item.id);
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
