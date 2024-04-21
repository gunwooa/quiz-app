import React, { useCallback } from 'react';
import { Alert, BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import CLText from '../components/common/CLText';
import NavBackScreenHeader from '../components/common/NavBackScreenHeader';
import QuizContainer from '../components/QuizContainer';
import QuizDetailSkeleton from '../components/QuizDetailSkeleton';
import useGenerateQuizBundleQuery from '../hooks/useGenerateQuizBundleQuery';
import useQuizBundle from '../hooks/useQuizBundle';
import { ScreenParamList } from '../routes/NavigationContainer';
import { useObserverStore } from '../stores/observer';
import { color } from '../styles/color';
import { ObserverKey } from '../types';

type Props = NativeStackScreenProps<ScreenParamList, 'QuizDetail'>;

const QuizDetailScreen = ({ route }: Props) => {
  const { category, quizBundleId, queryEnabled = false } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<ScreenParamList>>();
  const { notify } = useObserverStore();

  const { isFetching } = useGenerateQuizBundleQuery({
    category,
    quizBundleId,
    queryEnabled,
  });

  const { quizBundle } = useQuizBundle({
    categoryId: category?.id,
    quizBundleId,
  });

  const handleGoBack = useCallback(() => {
    if (quizBundle?.quizzes[0].selectedIndex === null) {
      navigation.goBack();
      return;
    }

    Alert.alert('알림', '현재까지 푼 퀴즈가 모두 초기화됩니다.\n그래도 뒤로 가시겠습니까?', [
      {
        text: '네',
        onPress: () => {
          navigation.goBack();
          /** @description quizReset 은 화면에 들어 오는 시점에 초기화 함, 이유는 앱을 메모리에서 날려버렸을때를 대비해서임 */
        },
        style: 'destructive',
      },
      {
        text: '아니요',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }, [navigation, quizBundle?.quizzes]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        handleGoBack();
        return true;
      });
      return () => subscription.remove();
    }, [handleGoBack]),
  );

  // console.log('✅ QuizDetailScreen ', category, quizBundleId, JSON.stringify(quizBundle));

  return (
    <>
      <NavBackScreenHeader
        onCustomGoBack={handleGoBack}
        headerCenter={
          <View style={styles.headerCenterBox}>
            <CLText type="Body3">
              {category?.name ?? quizBundle?.category.name} ({quizBundle?.id}){' '}
            </CLText>
          </View>
        }
        headerRight={
          category ? (
            <TouchableOpacity
              onPress={() => {
                notify(ObserverKey.QuizRefetchCall);
              }}>
              <CLText type="Body3" color={color.BLUE}>
                다른문제
              </CLText>
            </TouchableOpacity>
          ) : (
            <CLText type="Body3" color={color.GRAY_SCALE_4}>
              다시 푸는 중
            </CLText>
          )
        }
      />

      {isFetching ? (
        <QuizDetailSkeleton />
      ) : (
        <QuizContainer category={category} quizBundleId={quizBundleId} />
      )}
    </>
  );
};

export default QuizDetailScreen;

const styles = StyleSheet.create({
  headerCenterBox: {
    alignItems: 'center',
    width: '50%',
  },
  refetchButton: {
    fontSize: 16,
  },
});
