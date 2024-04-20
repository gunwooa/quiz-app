import { useMemo } from 'react';

import useQuizBundleListStore from '../stores/quiz-bundle-list';

const useQuizBundle = ({
  categoryId,
  quizBundleId,
}: {
  categoryId?: number;
  quizBundleId?: number;
}) => {
  const { quizBundleList, getProgressingQuizBundleIndex, ...rest } = useQuizBundleListStore();

  const quizBundle = useMemo(() => {
    return categoryId
      ? quizBundleList[getProgressingQuizBundleIndex(categoryId)]
      : quizBundleList.find((q) => q.id === quizBundleId);
  }, [categoryId, getProgressingQuizBundleIndex, quizBundleId, quizBundleList]);

  return {
    quizBundle,
    quizBundleList,
    getProgressingQuizBundleIndex,
    ...rest,
  };
};

export default useQuizBundle;
