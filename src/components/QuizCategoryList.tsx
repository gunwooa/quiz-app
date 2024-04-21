import React, { FC, useEffect, useId, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ObserverKey, QuizCategory, ScreenListScrollToTopObserverParams } from '~/src/types';

import QuizListItem from './QuizListItem';
import { usePreventDoubleClick } from '../hooks/usePreventDoubleClick';
import useQuizBundle from '../hooks/useQuizBundle';
import useQuizCategoriesQuery from '../hooks/useQuizCategoriesQuery';
import { ScreenParamList } from '../routes/NavigationContainer';
import { useObserverStore } from '../stores/observer';

type QuizCategoryListProps = {};

const QuizCategoryList: FC<QuizCategoryListProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenParamList>>();
  const { preventDoubleClick } = usePreventDoubleClick();
  const { data: categories } = useQuizCategoriesQuery();
  const { getProgressingQuizBundleIndex, quizReset, quizBundleList } = useQuizBundle({});
  const { add, remove } = useObserverStore();

  const flatListRef = useRef<FlatList>(null);
  const cid = useId();

  const handlePressCategory = preventDoubleClick((category: QuizCategory) => {
    const quizBundle = quizBundleList[getProgressingQuizBundleIndex(category.id)];
    quizReset({ id: quizBundle?.id ?? -1, type: 'progress' });

    const queryEnabled = getProgressingQuizBundleIndex(category.id) === -1;
    navigation.push('QuizDetail', { category, queryEnabled });
  });

  useEffect(() => {
    const observer = {
      id: cid,
      listener: (value: ScreenListScrollToTopObserverParams) => {
        if (value === 'QuizTab') {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
      },
    };
    add(ObserverKey.ScreenListScrollToTop, observer);
    return () => {
      remove(ObserverKey.ScreenListScrollToTop, observer.id);
    };
  }, [add, cid, remove]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={categories}
        renderItem={({ item }) => {
          return (
            <QuizListItem
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
