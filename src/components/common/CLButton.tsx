import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { color } from '~/src/styles/color';

type CLButtonProps = {
  type: 'filled' | 'outlined';
  size: 'small' | 'medium' | 'large';
  title: string | React.ReactNode;
  color?: 'black' | 'grey';
  borderRadius?: number;
  disabled?: boolean;
  leftArea?: React.ReactNode;
  rightArea?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
};

const colorPreset = (type: string, _color: string, disabled: boolean) =>
  ({
    filled_black: {
      backgroundColor: color.BLACK,
      textColor: color.WHITE,
    },
    filled_black_disabled: {
      backgroundColor: color.GRAY_SCALE_3,
      textColor: color.WHITE,
    },
    outlined_black: {
      backgroundColor: color.WHITE,
      textColor: color.BLACK,
      borderColor: color.BLACK,
    },
    outlined_black_disabled: {
      backgroundColor: color.WHITE,
      textColor: color.GRAY_SCALE_3,
      borderColor: color.GRAY_SCALE_3,
    },

    filled_grey: {
      backgroundColor: color.GRAY_SCALE_6,
      textColor: color.WHITE,
    },
    filled_grey_disabled: {
      backgroundColor: color.GRAY_SCALE_3,
      textColor: color.WHITE,
    },
    outlined_grey: {
      backgroundColor: color.WHITE,
      textColor: color.GRAY_SCALE_6,
      borderColor: color.GRAY_SCALE_6,
    },
    outlined_grey_disabled: {
      backgroundColor: color.WHITE,
      textColor: color.GRAY_SCALE_3,
      borderColor: color.GRAY_SCALE_3,
    },
  }[disabled ? `${type}_${_color}_disabled` : `${type}_${_color}`]);

const CLButton: FC<CLButtonProps> = ({
  size,
  title,
  style,
  textStyle,
  leftArea,
  rightArea,
  onPress,
  ...styleProps
}) => {
  const styles = useMemo(() => createStyle(styleProps), [styleProps]);

  return (
    <TouchableOpacity
      disabled={styleProps.disabled}
      style={[styles.button, styles[styleProps.type], styles[size], style]}
      onPress={onPress}>
      {leftArea && leftArea}
      {typeof title === 'string' ? (
        <Text style={[styles.text, styles[`${size}Text`], textStyle]}>{title}</Text>
      ) : (
        <>{title}</>
      )}
      {rightArea && rightArea}
    </TouchableOpacity>
  );
};

export default memo(CLButton);

const createStyle = ({
  type,
  color: _color = 'black',
  borderRadius,
  disabled,
}: Pick<CLButtonProps, 'color' | 'type' | 'disabled' | 'borderRadius'>) => {
  const preset = colorPreset(type, _color, !!disabled);
  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      borderRadius: borderRadius ?? 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    filled: {
      backgroundColor: preset?.backgroundColor,
    },
    outlined: {
      borderWidth: 1,
      borderColor: preset?.borderColor,
    },

    small: { height: 38, paddingHorizontal: 12 },
    medium: { height: 42, paddingHorizontal: 16 },
    large: { height: 48, paddingHorizontal: 20 },

    text: { color: preset?.textColor, marginHorizontal: 4 },
    smallText: { fontSize: 14, fontWeight: '600' },
    mediumText: { fontSize: 16, fontWeight: 'bold' },
    largeText: { fontSize: 18, fontWeight: 'bold' },
  });
};
