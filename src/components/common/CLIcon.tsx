import React, { type FC, useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { type SvgProps } from 'react-native-svg';

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
};

export type CLIconProps = {
  icon: keyof typeof SVG;
  containerStyle?: ViewStyle;
  onPress?: () => void;
} & SvgProps;

const CLIcon: FC<CLIconProps> = ({ icon, containerStyle, onPress, ...props }) => {
  const Icon = useMemo(() => SVG[icon], [icon]);
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Icon {...props} />
    </TouchableOpacity>
  ) : (
    <Icon {...props} />
  );
};

export default CLIcon;
