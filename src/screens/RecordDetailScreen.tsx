import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import TabView from '../components/common/TabView';
import QuizContainer from '../components/QuizContainer';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList, 'RecordDetail'>;

type TabKey = 'report' | 'review-note';

const TABS: { key: TabKey; title: string }[] = [
  { key: 'report', title: '리포트' },
  { key: 'review-note', title: '오답 노트' },
];

const RecordDetailScreen = ({ route }: Props) => {
  const { quizBundleId } = route.params;

  const { quizBundle, setter } = useQuizBundle({
    quizBundleId,
  });

  const [tabKey, setTabKey] = useState<TabKey>('report');

  const handleIndexChange = useCallback((_tabKey: TabKey) => {
    setTabKey(_tabKey);
    // if (tabKey === _tabKey) {
    //   handleScrollToTop(_tabKey);
    // }
  }, []);

  console.log('RecordDetailScreen 🎁', quizBundle);

  useEffect(() => {
    setter(quizBundleId, 'currentQuizzesIndex', 0);
  }, [quizBundleId, setter]);

  return (
    <>
      <NavBackScreenHeader />

      <TabView<TabKey>
        tabs={TABS}
        tabKey={tabKey}
        swipeEnabled
        onChangeTabKey={handleIndexChange}
        tabBarItemStyle={styles.tabBarItemStyle}
        screens={[
          { tabKey: 'report', screen: <View /> },
          { tabKey: 'review-note', screen: <QuizContainer quizBundleId={quizBundleId} /> },
        ]}
      />
    </>
  );
};

export default RecordDetailScreen;

const styles = StyleSheet.create({
  tabBarItemStyle: {
    paddingTop: 12,
    paddingBottom: 8,
  },
});
