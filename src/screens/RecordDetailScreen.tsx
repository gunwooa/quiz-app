import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import CLText from '../components/common/CLText';
import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import TabView from '../components/common/TabView';
import QuizContainer from '../components/QuizContainer';
import QuizReportContainer from '../components/QuizReportContainer';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';
import { color } from '../styles/color';

type Props = NativeStackScreenProps<ScreenParamList, 'RecordDetail'>;

type TabKey = 'report' | 'review-note';

const TABS: { key: TabKey; title: string }[] = [
  { key: 'report', title: '리포트' },
  { key: 'review-note', title: '오답 노트' },
];

const RecordDetailScreen = ({ route }: Props) => {
  const { quizBundleId } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<ScreenParamList>>();
  const { quizBundle, setter, quizReset } = useQuizBundle({
    quizBundleId,
  });

  const [tabKey, setTabKey] = useState<TabKey>('report');

  const handleIndexChange = useCallback((_tabKey: TabKey) => {
    setTabKey(_tabKey);
  }, []);

  const handleAgainQuiz = useCallback(() => {
    Alert.alert('알림', '기록이 모두 초기화됩니다.\n그래도 다시 푸시겠습니까?', [
      {
        text: '네',
        onPress: () => {
          quizReset({ id: quizBundleId, type: 'again' });
          navigation.replace('QuizDetail', { quizBundleId });
        },
        style: 'destructive',
      },
      {
        text: '아니요',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }, [navigation, quizBundleId, quizReset]);

  // console.log('RecordDetailScreen 🎁', JSON.stringify(quizBundle));

  useEffect(() => {
    setter(quizBundleId, 'currentQuizzesIndex', 0);
  }, [quizBundleId, setter]);

  return (
    <>
      <NavBackScreenHeader
        headerCenter={
          <View style={styles.headerCenterBox}>
            <CLText type="Body4">기록 상세 ({quizBundle?.id})</CLText>
            <CLText type="Body4">{quizBundle?.category.name}</CLText>
          </View>
        }
        headerRight={
          <TouchableOpacity onPress={handleAgainQuiz}>
            <CLText type="Body3" color={color.BLUE}>
              다시풀기
            </CLText>
          </TouchableOpacity>
        }
      />

      <TabView<TabKey>
        tabs={TABS}
        tabKey={tabKey}
        swipeEnabled
        onChangeTabKey={handleIndexChange}
        tabBarItemStyle={styles.tabBarItemStyle}
        screens={[
          { tabKey: 'report', screen: <QuizReportContainer quizBundleId={quizBundleId} /> },
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
  headerCenterBox: {
    alignItems: 'center',
    width: '50%',
  },
});
