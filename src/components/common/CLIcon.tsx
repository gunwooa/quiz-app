import React, { type FC, useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { type SvgProps } from 'react-native-svg';

import ArrowRightGray from '~/assets/icons/arrow-right-gray.svg';
import NavBack from '~/assets/icons/nav-back.svg';
import QuizFilled from '~/assets/icons/quiz-filled.svg';
import QuizOutLined from '~/assets/icons/quiz-outlined.svg';
import RecordFilled from '~/assets/icons/record-filled.svg';
import RecordOutlined from '~/assets/icons/record-outlined.svg';

const SVG = {
  NavBack,
  QuizFilled,
  QuizOutLined,
  RecordFilled,
  RecordOutlined,
  ArrowRightGray,
};

export type CLIconProps = {
  icon: keyof typeof SVG;
  buttonStyle?: ViewStyle;
  onPress?: () => void;
} & SvgProps;

const CLIcon: FC<CLIconProps> = ({ icon, buttonStyle, onPress, ...props }) => {
  const Icon = useMemo(() => SVG[icon], [icon]);
  return onPress ? (
    <TouchableOpacity testID={`cl-icon-button-${icon}`} onPress={onPress} style={buttonStyle}>
      <Icon testID={`cl-icon-${icon}`} {...props} />
    </TouchableOpacity>
  ) : (
    <Icon testID={`cl-icon-${icon}`} {...props} />
  );
};

export default CLIcon;
