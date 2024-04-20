// TODO : 대문자로 변경
export const QUERY_KEY = {
  quizCategories: () => ['quiz-categories'],
  quizDetail: ({ categoryId, quizBundleId }: { categoryId?: number; quizBundleId?: number }) => [
    'quiz-detail',
    { categoryId, quizBundleId },
  ],
} as const;
