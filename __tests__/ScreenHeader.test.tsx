import React from 'react';

import { render } from '@testing-library/react-native';

import CLText from '~/src/components/common/CLText';
import ScreenHeader from '~/src/components/common/ScreenHeader';

// // Safe area insets를 위한 모킹
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

describe('ScreenHeader', () => {
  it('headerLeft에 문자열이 제공될 때 CLText 컴포넌트로 렌더링되는지 확인', () => {
    const { getByText } = render(<ScreenHeader headerLeft="왼쪽 텍스트" />);
    // "왼쪽 텍스트"가 CLText 컴포넌트를 통해 렌더링되었는지 확인
    expect(getByText('왼쪽 텍스트')).toBeTruthy();
  });

  it('headerCenter에 문자열이 제공될 때 CLText 컴포넌트로 렌더링되는지 확인', () => {
    const { getByText } = render(<ScreenHeader headerCenter="중앙 텍스트" />);
    // "중앙 텍스트"가 CLText 컴포넌트를 통해 렌더링되었는지 확인
    expect(getByText('중앙 텍스트')).toBeTruthy();
  });

  it('headerRight에 문자열이 제공될 때 CLText 컴포넌트로 렌더링되는지 확인', () => {
    const { getByText } = render(<ScreenHeader headerRight="오른쪽 텍스트" />);
    // "오른쪽 텍스트"가 CLText 컴포넌트를 통해 렌더링되었는지 확인
    expect(getByText('오른쪽 텍스트')).toBeTruthy();
  });

  it('headerLeft, headerCenter, headerRight에 ReactNode가 제공될 때 올바르게 렌더링되는지 확인', () => {
    const leftNode = <CLText>커스텀 왼쪽</CLText>;
    const centerNode = <CLText>커스텀 중앙</CLText>;
    const rightNode = <CLText>커스텀 오른쪽</CLText>;

    const { getByText } = render(
      <ScreenHeader headerLeft={leftNode} headerCenter={centerNode} headerRight={rightNode} />,
    );
    // 각각의 ReactNode가 올바르게 렌더링되었는지 확인
    expect(getByText('커스텀 왼쪽')).toBeTruthy();
    expect(getByText('커스텀 중앙')).toBeTruthy();
    expect(getByText('커스텀 오른쪽')).toBeTruthy();
  });
});
