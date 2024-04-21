import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import CLIcon, { CLIconProps } from '~/src/components/common/CLIcon';

// SVG 아이콘 모킹
jest.mock('~/assets/icons/nav-back.svg', () => 'NavBackIcon');
jest.mock('~/assets/icons/quiz-filled.svg', () => 'QuizFilledIcon');
jest.mock('~/assets/icons/quiz-outlined.svg', () => 'QuizOutlinedIcon');
jest.mock('~/assets/icons/record-filled.svg', () => 'RecordFilledIcon');
jest.mock('~/assets/icons/record-outlined.svg', () => 'RecordOutlinedIcon');
jest.mock('~/assets/icons/arrow-right-gray.svg', () => 'ArrowRightGrayIcon');

describe('CLIcon', () => {
  it.each([
    ['NavBack'],
    ['QuizFilled'],
    ['QuizOutLined'],
    ['RecordFilled'],
    ['RecordOutlined'],
    ['ArrowRightGray'],
  ])('렌더링 테스트 - %s', (icon) => {
    const { getByTestId } = render(<CLIcon icon={icon as CLIconProps['icon']} />);
    expect(getByTestId(`cl-icon-${icon}`)).toBeTruthy();
  });

  it('클릭 이벤트 핸들링', () => {
    const onPressMock = jest.fn();
    const icon = 'NavBack';
    const { getByTestId } = render(<CLIcon icon={icon} onPress={onPressMock} />);
    fireEvent.press(getByTestId(`cl-icon-button-${icon}`));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('컨테이너 스타일 적용', () => {
    const customStyle = { padding: 10 };
    const icon = 'QuizFilled';
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CLIcon icon={icon} onPress={onPressMock} buttonStyle={customStyle} />,
    );
    const touchable = getByTestId(`cl-icon-button-${icon}`);
    expect(touchable.props.style).toMatchObject(customStyle);
  });
});
