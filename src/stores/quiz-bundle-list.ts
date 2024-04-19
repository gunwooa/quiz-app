import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'html-entities';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Quiz, QuizCategory } from '../types';
import { shuffle } from '../utils/common';

export type QuizBundle = {
  id: number;
  status: 'progress' | 'again' | 'complete';
  currentQuizzesIndex: number;
  category: QuizCategory;
  quizzes: {
    origin: Quiz;
    options: string[];
    answerIndex: number;
    selectedIndex: number | null;
    elapsedTimeInSeconds: number | null;
  }[];
};

interface QuizBundleListStore {
  quizBundleList: QuizBundle[];
  getProgressingQuizBundleIndex: (categoryId?: number) => number;
  createId: () => number;
  generateQuizBundle: (params: { category: QuizCategory; originQuizzes: Quiz[] }) => QuizBundle;
  pushQuizBundle: (quizBundle: QuizBundle) => void;
  removeQuizBundle: (id: number) => void;
  setter: <K extends keyof QuizBundle>(id: number, key: K, value: QuizBundle[K]) => void;

  reset: () => void;
}

const useQuizBundleListStore = create<QuizBundleListStore>()(
  persist(
    (set, get) => ({
      quizBundleList: [],
      getProgressingQuizBundleIndex: (categoryId) => {
        return get().quizBundleList.findIndex(
          (q) => q.category?.id === categoryId && q.status === 'progress',
        );
      },
      createId: () => {
        const ids = get().quizBundleList.map((q) => q.id);
        if (!ids.length) {
          return 0;
        }
        const maxId = Math.max(...ids);
        return maxId + 1;
      },
      generateQuizBundle: ({ category, originQuizzes }) => {
        const quizzes: QuizBundle['quizzes'] = originQuizzes.map((quiz) => {
          const decodedQuiz: Quiz = {
            ...quiz,
            category: decode(quiz.category),
            question: decode(quiz.question),
            correct_answer: decode(quiz.correct_answer),
            incorrect_answers: quiz.incorrect_answers.map((incorrect_answer) =>
              decode(incorrect_answer),
            ),
          };

          const options = shuffle([decodedQuiz.correct_answer, ...decodedQuiz.incorrect_answers]);
          return {
            origin: decodedQuiz,
            options,
            answerIndex: options.indexOf(decodedQuiz.correct_answer),
            selectedIndex: null,
            elapsedTimeInSeconds: null,
          };
        });
        const quizBundle: QuizBundle = {
          id: get().createId(),
          category,
          status: 'progress',
          currentQuizzesIndex: 0,
          quizzes,
        };
        return quizBundle;
      },
      pushQuizBundle: (quizBundle) => {
        set({ quizBundleList: [...get().quizBundleList, quizBundle] });
      },
      removeQuizBundle: (id) => {
        set({ quizBundleList: get().quizBundleList.filter((q) => q.id !== id) });
      },
      setter: (id, key, value) => {
        set({
          quizBundleList: get().quizBundleList.map((q) =>
            q.id === id ? { ...q, [key]: value } : q,
          ),
        });
      },

      reset: () => {
        set({ quizBundleList: [] });
      },
    }),

    { name: 'quiz-bundle-list-store', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useQuizBundleListStore;
