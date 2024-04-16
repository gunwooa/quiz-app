import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type TextStyleTypes =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'Body1'
  | 'Body2'
  | 'Body3'
  | 'Body4'
  | 'Caption1'
  | 'Caption2'
  | 'Caption3'
  | 'Caption4';

type CLTextProps = {
  type: TextStyleTypes;
  color?: string;
} & TextProps;

const styles = StyleSheet.create({
  H1: { fontSize: 32, fontWeight: 'bold' },
  H2: { fontSize: 28, fontWeight: 'bold' },
  H3: { fontSize: 24, fontWeight: 'bold' },
  H4: { fontSize: 20, fontWeight: 'bold' },
  Body1: { fontSize: 18, fontWeight: 'normal' },
  Body2: { fontSize: 16, fontWeight: 'normal' },
  Body3: { fontSize: 14, fontWeight: 'normal' },
  Body4: { fontSize: 12, fontWeight: 'normal' },
  Caption1: { fontSize: 12, fontWeight: 'bold' },
  Caption2: { fontSize: 11, fontWeight: 'bold' },
  Caption3: { fontSize: 10, fontWeight: 'bold' },
  Caption4: { fontSize: 9, fontWeight: 'bold' },
});

const CLText: React.FC<CLTextProps> = ({ type, color, style, ...props }) => {
  return <Text style={[styles[type], { color }, style]} {...props} />;
};

export default CLText;
