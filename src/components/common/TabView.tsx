import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, ViewStyle } from 'react-native';

import { TabView as RNTabView, TabBar } from 'react-native-tab-view';

import { color } from '~/src/styles/color';

import CLText from './CLText';

type TabViewRoute<KeyType extends string> = {
  key: KeyType;
  title: string;
};

type tTabViewProps<KeyType extends string> = {
  tabs: TabViewRoute<KeyType>[];
  tabKey: KeyType;
  swipeEnabled?: boolean;
  onChangeTabKey: (tabKey: KeyType) => void;
  screens: { tabKey: KeyType; screen: ReactNode }[];
  notUseTabBar?: boolean;
  animationEnabled?: boolean;
  tabBarItemStyle?: ViewStyle;
};

const findTabViewIndex = (routes: tTabViewProps<string>['tabs'], key: string) =>
  routes.findIndex((r) => r.key === key);

const TabView = <KeyType extends string>({
  tabs,
  tabKey,
  swipeEnabled = false,
  onChangeTabKey,
  screens,
  notUseTabBar = false,
  animationEnabled = true,
  tabBarItemStyle,
}: tTabViewProps<KeyType>) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(findTabViewIndex(tabs, tabKey));

  const renderScreen = useCallback(
    (route: TabViewRoute<KeyType>) => screens.find((s) => s.tabKey === route.key)?.screen ?? <></>,
    [screens],
  );

  useEffect(() => {
    setIndex(findTabViewIndex(tabs, tabKey));
  }, [notUseTabBar, tabKey, tabs]);

  return (
    <RNTabView
      navigationState={{ routes: tabs, index }}
      onIndexChange={setIndex}
      renderScene={({ route: tab }) => renderScreen(tab)}
      onSwipeEnd={() => {
        const unequalTabKeys = tabKey !== tabs[index].key;
        if (unequalTabKeys) {
          onChangeTabKey(tabs[index].key);
        }
      }}
      renderTabBar={
        !notUseTabBar
          ? (props) => (
              <TabBar
                {...props}
                renderTabBarItem={({ route: tab }) => {
                  const tabIndex = findTabViewIndex(tabs, tab.key);
                  const isActive = tabIndex === index;

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setIndex(tabIndex);
                        onChangeTabKey(tab.key);
                      }}
                      style={[
                        tabBarItemStyle,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          borderBottomWidth: isActive ? 2 : 0,
                          borderBottomColor: isActive ? color.BLACK : 'transparent',
                        },
                      ]}>
                      <CLText type="Body1">{tab.title}</CLText>
                    </TouchableOpacity>
                  );
                }}
                renderIndicator={() => null}
                style={styles.tabBarContainer}
                contentContainerStyle={styles.tabBarContentContainer}
                gap={16}
              />
            )
          : () => <></>
      }
      swipeEnabled={swipeEnabled}
      initialLayout={{ width: layout.width }}
      animationEnabled={animationEnabled}
    />
  );
};

export default TabView;

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: color.WHITE,
  },

  tabBarContentContainer: {
    paddingHorizontal: 24,
  },
});
