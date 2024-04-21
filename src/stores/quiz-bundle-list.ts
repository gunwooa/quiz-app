import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'html-entities';
import { DateTime } from 'luxon';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Quiz, QuizCategory } from '../types';
import { shuffle } from '../utils/common';

export type QuizBundle = {
  id: number; // 불변
  category: QuizCategory; // 불변
  status: 'progress' | 'again' | 'complete';
  currentQuizzesIndex: number; // 현재 풀고 있는 문제의 인덱스
  createdAt: string; // 최초 문제를 생성한 시간, ISO format, 불변
  completedAt: string | null; // 문제를 푼 시간, ISO format, 기록탭에서 정혈 할 때 필요, 다시 풀 때마다 바뀜
  elapsedTimeInSeconds: number | null; // 문제를 모두 푸는데 걸린 시간(초)
  quizzes: {
    origin: Quiz; // 불변
    options: string[]; // 보기, 다시 풀 때마다 바뀜
    answerIndex: number; // 정답, 다시 풀 때마다 바뀜
    selectedIndex: number | null; // 사용자가 선택한 답
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

  allReset: () => void;
  quizReset: ({ id, type }: { id: number; type: 'progress' | 'again' }) => void;
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
          const answerIndex = options.indexOf(decodedQuiz.correct_answer);
          return {
            origin: decodedQuiz,
            options,
            answerIndex,
            selectedIndex: null,
          };
        });

        const quizBundle: QuizBundle = {
          id: get().createId(),
          category,
          status: 'progress',
          currentQuizzesIndex: 0,
          createdAt: DateTime.now().toISO(),
          completedAt: null,
          elapsedTimeInSeconds: null,
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

      allReset: () => {
        set({ quizBundleList: [] });
      },
      quizReset: ({ id, type }) => {
        set({
          quizBundleList: get().quizBundleList.map((q) =>
            q.id === id
              ? {
                  ...q,
                  status: type,
                  currentQuizzesIndex: 0,
                  createdAt: DateTime.now().toISO(),
                  completedAt: null,
                  elapsedTimeInSeconds: null,
                  quizzes: q.quizzes.map((quiz) => {
                    /** @description 다시 풀 때마다 보기 순서가 바뀌어야 하므로 options를 다시 섞어줌 */
                    const options = shuffle([
                      quiz.origin.correct_answer,
                      ...quiz.origin.incorrect_answers,
                    ]);
                    const answerIndex = options.indexOf(quiz.origin.correct_answer);
                    return {
                      ...quiz,
                      options,
                      answerIndex,
                      selectedIndex: null,
                    };
                  }),
                }
              : q,
          ),
        });
      },
    }),

    { name: 'quiz-bundle-list-store', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useQuizBundleListStore;
