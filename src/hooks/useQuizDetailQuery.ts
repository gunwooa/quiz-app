import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { getQuiz } from '../apis';
import { QUERY_KEY } from '../constants/queryKey';
import { QuizResponse } from '../types';

const useQuizDetailQuery = ({
  categoryId,
  quizBundleId,
  ...options
}: Omit<UndefinedInitialDataOptions<QuizResponse>, 'queryKey' | 'queryFn'> & {
  categoryId: number;
  quizBundleId?: number;
}) => {
  const res = useQuery({
    queryKey: QUERY_KEY.quizDetail({ categoryId, quizBundleId }),
    queryFn: () => getQuiz({ categoryId }),
    ...options,
  });

  return {
    ...res,
  };
};

export default useQuizDetailQuery;
