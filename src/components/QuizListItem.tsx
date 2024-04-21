import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { DateTime } from 'luxon';

import { color } from '~/src/styles/color';

import CLIcon from './common/CLIcon';
import CLText from './common/CLText';
import { CATEGORY_LOGO } from '../constants/image';
import useQuizBundle from '../hooks/useQuizBundle';
import { QuizCategory } from '../types';
import { getStatusMessageAndColor } from '../utils/common';

type QuizListItemProps = {
  category?: QuizCategory;
  quizBundleId?: number;
  containerStyle?: ViewStyle;
  onPress?: () => void | Promise<void>;
};

export const QUIZ_LIST_ITEM_HEIGHT = 120;
const LOGO_SIZE = 76;

const QuizListItem: FC<QuizListItemProps> = ({
  category,
  quizBundleId,
  containerStyle,
  onPress,
}) => {
  const { quizBundle } = useQuizBundle({
    categoryId: category?.id,
    quizBundleId,
  });

  const _category = category ?? quizBundle?.category;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
      {_category && (
        <Image
          source={CATEGORY_LOGO[_category.id]}
          style={[
            styles.logo,
            { width: LOGO_SIZE, height: LOGO_SIZE, borderRadius: LOGO_SIZE / 2 },
          ]}
        />
      )}

      <View style={styles.infoBox}>
        <CLText type="Body2" color={color.GRAY_SCALE_7} numberOfLines={2}>
          {_category?.name}
        </CLText>

        {quizBundle?.status ? (
          <View style={styles.statusBox}>
            <CLText type="Caption2" color={color.GRAY_SCALE_7}>
              {quizBundle.status === 'complete' ? '퀴즈 푼 날짜' : '퀴즈 생성 날짜'}
              {'\n'}
              {`${DateTime.fromISO(
                (quizBundle.status === 'complete'
                  ? quizBundle?.completedAt
                  : quizBundle.createdAt) ?? '',
              ).toFormat('yyyy-MM-dd HH:mm:ss')}`}
            </CLText>

            <CLText
              type="Caption1"
              color={getStatusMessageAndColor(quizBundle?.status).color}
              mr={-16}>
              {getStatusMessageAndColor(quizBundle?.status).message}
            </CLText>
          </View>
        ) : (
          <CLText type="Caption1" color={color.GRAY_SCALE_4} textAlign="right" mr={-16}>
            퀴즈 풀기
          </CLText>
        )}
      </View>

      <CLIcon icon="ArrowRightGray" stroke={color.GRAY_SCALE_5} width={14} height={14} />
    </TouchableOpacity>
  );
};

export default QuizListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: QUIZ_LIST_ITEM_HEIGHT,
    padding: 16,
    borderRadius: 10,
    backgroundColor: color.WHITE,
  },
  logo: {
    borderWidth: 1,
    borderColor: color.BLACK,
  },
  infoBox: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
