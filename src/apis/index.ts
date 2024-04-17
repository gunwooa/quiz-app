// 필요한 모듈 import
import axios from 'axios';

import { QuizCategory } from '../types';

export const getQuizCategories = async () => {
  const res = await axios.get<{ trivia_categories: QuizCategory[] }>(
    'https://opentdb.com/api_category.php',
  );
  return res.data;
};
