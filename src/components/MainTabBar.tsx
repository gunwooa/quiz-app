import React, { FC, useCallback, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CLIcon, { CLIconProps } from './common/CLIcon';
import { MainTabParamList } from '../routes/MainTabNavigator';
import { ScreenParamList } from '../routes/NavigationContainer';
import { color } from '../styles/color';

type MainTabBarProps = {} & BottomTabBarProps;

type HomeTabRouteName = keyof MainTabParamList;

const TAB_ICON: Record<HomeTabRouteName, CLIconProps['icon'][]> = {
  QuizTab: ['QuizOutLined', 'QuizFilled'],
  RecordTab: ['RecordOutlined', 'RecordFilled'],
};

const MainTabBar: FC<MainTabBarProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenParamList>>();

  const prevScreenName = useRef<HomeTabRouteName | null>(null);

  const handleChangeTab = useCallback(
    (routeName: HomeTabRouteName) => {
      if (prevScreenName.current === routeName) {
        // TODO : Scroll to top
      }

      navigation.navigate(routeName);

      prevScreenName.current = routeName;
    },
    [navigation],
  );

  return (
    <View style={[styles.container, { paddingBottom: props.insets.bottom }]}>
      {props.state.routeNames.map((_routeName, index) => {
        const routeName = _routeName as HomeTabRouteName;
        const isFocused = props.state.index === index;
        const icon = isFocused ? TAB_ICON[routeName][1] : TAB_ICON[routeName][0];

        return (
          <Pressable
            key={`main-tab-item-${routeName}`}
            onPress={() => handleChangeTab(routeName)}
            style={styles.tabItem}>
            <CLIcon icon={icon} width={24} height={24} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default MainTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: color.WHITE,
    shadowColor: color.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
