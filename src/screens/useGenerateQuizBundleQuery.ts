import { useEffect } from 'react';

import useQuizDetailQuery from '../hooks/useQuizDetailQuery';
import useQuizBundleListStore from '../stores/quiz-bundle-list';
import { QuizCategory } from '../types';

const useGenerateQuizBundleQuery = ({
  category,
  quizBundleId,
  queryEnabled,
}: {
  category?: QuizCategory;
  quizBundleId?: number;
  queryEnabled: boolean;
}) => {
  const { data, isFetching } = useQuizDetailQuery({
    categoryId: category?.id ?? -1,
    quizBundleId,
    enabled: queryEnabled,
    gcTime: 0,
  });

  const { getProgressingQuizBundleIndex, generateQuizBundle, pushQuizBundle } =
    useQuizBundleListStore();

  /** @description 최초로 문제를 불러올 때, 문제 번들을 생성하여 저장합니다. (중요한 로직) */
  useEffect(() => {
    if (
      category &&
      getProgressingQuizBundleIndex(category.id) === -1 &&
      !isFetching &&
      data?.results
    ) {
      const _quizBundle = generateQuizBundle({
        category,
        originQuizzes: data?.results ?? [],
      });
      pushQuizBundle(_quizBundle);
    }
  }, [
    category,
    data?.results,
    generateQuizBundle,
    getProgressingQuizBundleIndex,
    isFetching,
    pushQuizBundle,
  ]);
};

export default useGenerateQuizBundleQuery;
