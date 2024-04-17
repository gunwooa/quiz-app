import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { usePreventDoubleClick } from './usePreventDoubleClick';
import { ScreenParamList } from '../routes/NavigationContainer';

const useOpenScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenParamList>>();
  const { preventDoubleClick } = usePreventDoubleClick();

  const openScreen = preventDoubleClick(
    <Screen extends keyof ScreenParamList>(
      type: 'navigate' | 'push' | 'replace',
      screen: Screen,
      params: ScreenParamList[Screen],
    ) => {
      // FIXME : 타입 에러가 발생하는데, 일단 무시하고 진행합니다.
      if (type === 'navigate') {
        navigation.navigate(screen, params);
      } else if (type === 'push') {
        navigation.push(screen, params);
      } else if (type === 'replace') {
        navigation.replace(screen, params);
      }
    },
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return { openScreen, goBack };
};

export default useOpenScreen;
