import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenParamList } from '~/src/routes/NavigationContainer';

import CLIcon from './CLIcon';
import ScreenHeader, { ScreenHeaderProps } from './ScreenHeader';

type NavBackScreenHeaderProps = {} & Omit<ScreenHeaderProps, 'headerLeft'>;

const NavBackScreenHeader: FC<NavBackScreenHeaderProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenParamList>>();

  return (
    <ScreenHeader
      headerLeft={
        <CLIcon
          icon="NavBack"
          containerStyle={styles.iconContainer}
          onPress={() => {
            navigation.goBack();
          }}
        />
      }
      {...props}
    />
  );
};

export default NavBackScreenHeader;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    marginLeft: -8,
  },
});
