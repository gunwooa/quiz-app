import React, { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CLText from './CLText';

export type ScreenHeaderProps = {
  headerLeft?: ReactNode | string;
  headerCenter?: ReactNode | string;
  headerRight?: ReactNode | string;
  style?: ViewStyle;
  backgroundColor?: string;
};

const HEADER_HEIGHT = 44;

const ScreenHeader: FC<ScreenHeaderProps> = ({
  headerLeft,
  headerCenter,
  headerRight,
  style,
  backgroundColor = 'white',
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[style, { paddingTop: insets.top, backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {typeof headerLeft === 'string' ? <CLText type="H4">{headerLeft}</CLText> : headerLeft}
        </View>

        {typeof headerCenter === 'string' ? (
          <CLText type="H4">{headerCenter}</CLText>
        ) : (
          headerCenter
        )}

        <View style={styles.headerRight}>
          {typeof headerRight === 'string' ? <CLText type="H4">{headerRight}</CLText> : headerRight}
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;

export const MainTabHeaderRowView: FC<{
  children: ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => {
  return <View style={[styles.rowView, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    zIndex: 999,
    height: HEADER_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    position: 'absolute',
    left: 24,
  },
  headerRight: { position: 'absolute', right: 24 },

  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
