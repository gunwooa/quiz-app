import React from 'react';

import { render } from '@testing-library/react-native';

import CLText from '~/src/components/common/CLText';

describe('CLText', () => {
  it('기본 속성으로 정확하게 렌더링되는지 테스트', () => {
    // CLText 컴포넌트를 '샘플 텍스트'라는 자식 텍스트와 함께 렌더링합니다.
    const { getByText } = render(<CLText>샘플 텍스트</CLText>);

    // 렌더링된 텍스트에서 '샘플 텍스트' 문자열을 가진 요소를 찾습니다.
    const textElement = getByText('샘플 텍스트');

    // 찾은 요소가 실제로 존재하는지 확인합니다. 즉, 요소가 렌더링되었는지 검증합니다.
    expect(textElement).toBeTruthy();

    // 찾은 텍스트 요소의 style 프로퍼티가 다음 조건들을 만족하는지 확인합니다.
    expect(textElement.props.style).toEqual(
      // 배열 내 모든 객체가 예상하는 객체를 포함하는지 확인합니다.
      expect.arrayContaining([
        // 첫 번째 객체에서는 fontSize와 fontWeight 속성을 확인합니다.
        expect.objectContaining({
          fontSize: 14, // 'Body3' 스타일의 기본 fontSize 값
          fontWeight: '600', // 'Body3' 스타일의 기본 fontWeight 값
        }),
        // 두 번째 객체에서는 color와 lineHeight 속성을 확인합니다.
        expect.objectContaining({
          color: '#000000', // 컴포넌트 기본 색상 값
          lineHeight: 14 * 1.3, // fontSize 14에 대한 lineHeight 계산 (fontSize * 1.3)
        }),
        // 마지막 요소는 정의되지 않은 스타일이나 null 값을 포함할 수 있으므로, 이를 무시합니다.
        expect.anything(), // undefined 또는 null 값은 테스트에서 무시
      ]),
    );
  });

  it('사용자 정의 스타일 속성이 정확하게 적용되는지 테스트', () => {
    const { getByText } = render(
      <CLText type="H1" color="blue" textAlign="center" mt={10}>
        제목
      </CLText>,
    );
    const textElement = getByText('제목');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 32,
          fontWeight: 'bold',
        }),
        expect.objectContaining({
          color: 'blue',
          textAlign: 'center',
          marginTop: 10,
          lineHeight: 32 * 1.3,
        }),
        expect.anything(),
      ]),
    );
  });

  it('외부 스타일과 결합된 스타일이 정확하게 적용되는지 테스트', () => {
    const { getByText } = render(<CLText style={{ padding: 10 }}>패딩 텍스트</CLText>);
    const textElement = getByText('패딩 텍스트');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ padding: 10 })]),
    );
  });
});
