import React from 'react';

import { act, render } from '@testing-library/react-native';

import QuizTimer from '~/src/components/QuizTimer';

// Jest의 타이머 기능을 사용 설정
jest.useFakeTimers();

describe('QuizTimer', () => {
  it('isActive가 true일 때 타이머가 초를 증가시키는지 검증', () => {
    const setSeconds = jest.fn(); // setSeconds 함수를 모킹
    render(<QuizTimer seconds={0} isActive={true} setSeconds={setSeconds} />);

    // 타이머를 한 단계 전진시키고, setSeconds가 호출되었는지 확인
    act(() => {
      jest.advanceTimersByTime(1000); // 1000ms (1초) 전진
    });
    expect(setSeconds).toHaveBeenCalledTimes(1); // setSeconds가 정확히 한 번 호출되어야 함

    // 함수가 올바른 인자와 함께 호출되었는지 검증
    expect(setSeconds).toHaveBeenCalledWith(expect.any(Function));
  });

  it('isActive가 false일 때 타이머가 멈추는지 검증', () => {
    const setSeconds = jest.fn();
    const { rerender } = render(<QuizTimer seconds={0} isActive={true} setSeconds={setSeconds} />);

    // isActive를 false로 변경하고 rerender
    rerender(<QuizTimer seconds={0} isActive={false} setSeconds={setSeconds} />);

    // 타이머를 한 단계 더 전진시키고, setSeconds가 호출되지 않는지 확인
    act(() => {
      jest.advanceTimersByTime(1000); // 1000ms (1초) 전진
    });
    expect(setSeconds).toHaveBeenCalledTimes(0); // isActive가 false이므로 호출되지 않아야 함
  });

  it('표시되는 시간 포맷이 올바른지 확인', () => {
    const { getByText } = render(
      <QuizTimer seconds={3661} isActive={false} setSeconds={jest.fn()} />,
    );
    expect(getByText('01 : 01 : 01')).toBeTruthy(); // 3661초는 1시간 1분 1초
  });
});
