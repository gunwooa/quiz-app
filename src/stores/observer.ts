import { create } from 'zustand';

import { ObserverKey } from '../types';

export interface Observer<T> {
  id: string;
  listener: (data: T) => void;
}

interface ObserverStore<T> {
  observers: {
    [key: string]: Observer<T>[];
  };
  add: (key: ObserverKey, observer: Observer<T>) => void;
  remove: (key: ObserverKey, id: string) => void;
  notify: (key: ObserverKey, data?: T) => void;
}

export const useObserverStore = create<ObserverStore<any>>((set, get) => ({
  observers: {},
  add: (key, observer) => {
    set((state) => {
      const { observers } = state;
      return {
        ...state,
        observers: {
          ...observers,
          [key]: [...(observers[key] || []), observer],
        },
      };
    });
  },
  remove: (key, id) => {
    set((state) => {
      const { observers } = state;
      return {
        ...state,
        observers: {
          ...observers,
          [key]: observers[key]?.filter((observer) => observer.id !== id) || [],
        },
      };
    });
  },
  notify: (key, data) => {
    const { observers } = get();
    observers[key]?.forEach((observer) => observer.listener(data));
  },
}));
