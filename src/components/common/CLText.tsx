import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

// mt, mb, ml, mr 을 props로 받아서 margin을 적용할 수 있도록 구현 해줘

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
  textAlign?: 'left' | 'center' | 'right';
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
} & TextProps;

const styles = StyleSheet.create({
  H1: { fontSize: 32, fontWeight: 'bold' },
  H2: { fontSize: 28, fontWeight: 'bold' },
  H3: { fontSize: 24, fontWeight: '600' },
  H4: { fontSize: 20, fontWeight: '600' },
  Body1: { fontSize: 18, fontWeight: '600' },
  Body2: { fontSize: 16, fontWeight: '600' },
  Body3: { fontSize: 14, fontWeight: '600' },
  Body4: { fontSize: 12, fontWeight: '600' },
  Caption1: { fontSize: 12, fontWeight: 'normal' },
  Caption2: { fontSize: 11, fontWeight: 'normal' },
  Caption3: { fontSize: 10, fontWeight: 'normal' },
  Caption4: { fontSize: 9, fontWeight: 'normal' },
});

const CLText: React.FC<CLTextProps> = ({
  type,
  color,
  textAlign,
  mt,
  mb,
  ml,
  mr,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        styles[type],
        {
          color,
          textAlign,
          marginTop: mt,
          marginBottom: mb,
          marginLeft: ml,
          marginRight: mr,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default CLText;
