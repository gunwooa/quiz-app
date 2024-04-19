export const queryKey = {
  quizCategories: () => ['quiz-categories'],
  quizDetail: (categoryId: number) => ['quiz-detail', { categoryId }],
} as const;
