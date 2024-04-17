import { useCallback, useEffect, useRef } from 'react';

/**
 * @description 연속된 클릭을 방지하는 훅
 * 이 훅은 지정된 action 함수를 클릭 핸들러로 감싸고, 첫 번째 클릭 후 일정 시간 동안 추가 클릭을 무시합니다.
 */
export function usePreventDoubleClick() {
  const isClicked = useRef(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const preventDoubleClick = useCallback(
    <T extends (...args: any[]) => void>(action: T) =>
      (...args: Parameters<T>) => {
        if (isClicked.current) {
          return;
        }
        isClicked.current = true;
        action(...args);
        timeoutIdRef.current = setTimeout(() => {
          isClicked.current = false;
        }, 500);
      },
    [],
  );

  return { preventDoubleClick };
}
