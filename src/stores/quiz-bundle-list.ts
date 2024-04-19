import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Quiz } from '../types';
import { shuffle } from '../utils/common';

type QuizBundle = {
  id: number;
  categoryId: number;
  status: 'progress' | 'again' | 'complete';
  currentQuizzesIndex: number;
  quizzes: {
    origin: Quiz;
    options: [string, string, string, string];
    answerIndex: number;
    selectedIndex: number | null;
    elapsedTimeInSeconds: number | null;
  }[];
};

interface QuizListStore {
  quizBundleList: QuizBundle[];
  getProgressingQuizBundleIndex: (categoryId: number) => number;
  createId: () => number;
  generateQuizBundle: (params: { categoryId: number; originQuizzes: Quiz[] }) => QuizBundle;
  pushQuizBundle: (quizBundle: QuizBundle) => void;
  removeQuizBundle: (id: number) => void;
  setter: <K extends keyof QuizBundle>(id: number, key: K, value: QuizBundle[K]) => void;

  reset: () => void;
}

const useQuizListStore = create<QuizListStore>()(
  persist(
    (set, get) => ({
      quizBundleList: [],
      getProgressingQuizBundleIndex: (categoryId) => {
        return get()
          .quizBundleList.filter((q) => q.categoryId === categoryId)
          .findIndex((q) => q.status === 'progress');
      },
      createId: () => {
        const ids = get().quizBundleList.map((q) => q.id);
        if (!ids.length) {
          return 0;
        }
        const maxId = Math.max(...ids);
        return maxId + 1;
      },
      generateQuizBundle: ({ categoryId, originQuizzes }) => {
        const quizzes: QuizBundle['quizzes'] = originQuizzes.map((quiz) => {
          const options = shuffle([quiz.correct_answer, ...quiz.incorrect_answers]);
          const answerIndex = options.indexOf(quiz.correct_answer);
          return {
            origin: quiz,
            options: options as [string, string, string, string],
            answerIndex,
            selectedIndex: null,
            elapsedTimeInSeconds: null,
          };
        });
        const quizBundle: QuizBundle = {
          id: get().createId(),
          categoryId,
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

    { name: 'quiz-list-store', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useQuizListStore;
