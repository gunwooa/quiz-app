import React, { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { QuizCategory } from '~/src/types';

import QuizCategoryListItem from './QuizCategoryListItem';
import { usePreventDoubleClick } from '../hooks/usePreventDoubleClick';
import useQuizBundle from '../hooks/useQuizBundle';
import useQuizCategoriesQuery from '../hooks/useQuizCategoriesQuery';
import { ScreenParamList } from '../routes/NavigationContainer';

type QuizCategoryListProps = {};

const QuizCategoryList: FC<QuizCategoryListProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenParamList>>();
  const { preventDoubleClick } = usePreventDoubleClick();
  const { data: categories } = useQuizCategoriesQuery();
  const { getProgressingQuizBundleIndex, quizReset, quizBundleList } = useQuizBundle({});

  const handlePressCategory = preventDoubleClick((category: QuizCategory) => {
    const quizBundle = quizBundleList[getProgressingQuizBundleIndex(category.id)];
    quizReset({ id: quizBundle?.id ?? -1, type: 'progress' });

    const queryEnabled = getProgressingQuizBundleIndex(category.id) === -1;
    navigation.push('QuizDetail', { category, queryEnabled });
  });

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
