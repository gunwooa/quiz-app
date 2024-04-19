// 필요한 모듈 import
import axios from 'axios';

import { Quiz, QuizCategoryResponse, QuizResponse } from '../types';

const BASE_URL = 'https://opentdb.com';

export const getQuizCategories = async () => {
  const res = await axios.get<QuizCategoryResponse>(`${BASE_URL}/api_category.php`);
  return res.data;
};

export const getQuiz = async ({
  categoryId,
  amount = 15,
  type = 'multiple',
}: {
  categoryId: number;
  amount?: number;
  type?: Quiz['type'];
}) => {
  const res = await axios.get<QuizResponse>(`${BASE_URL}/api.php`, {
    params: { amount, category: categoryId, type },
  });
  return res.data;
};
