import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { getQuiz } from '../apis';
import { queryKey } from '../constants/queryKey';
import { QuizResponse } from '../types';

const useQuizDetailQuery = ({
  categoryId,
  ...options
}: Omit<UndefinedInitialDataOptions<QuizResponse>, 'queryKey' | 'queryFn'> & {
  categoryId: number;
}) => {
  const res = useQuery({
    queryKey: queryKey.quizDetail(categoryId),
    queryFn: () => getQuiz({ category: categoryId }),
    ...options,
  });

  return {
    ...res,
  };
};

export default useQuizDetailQuery;
