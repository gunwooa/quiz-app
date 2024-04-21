import React, { FC, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { DateTime } from 'luxon';

import { color } from '~/src/styles/color';
import { QuizCategory } from '~/src/types';

import CLIcon from './common/CLIcon';
import CLText from './common/CLText';
import { CATEGORY_LOGO } from '../constants/image';
import useQuizBundle from '../hooks/useQuizBundle';
import { getStatusMessageAndColor } from '../utils/common';

type QuizCategoryListItemProps = {
  category: QuizCategory;
  onPress?: () => void | Promise<void>;
};

export const CATEGORY_ITEM_HEIGHT = 120;
const LOGO_SIZE = 68;

const QuizCategoryListItem: FC<QuizCategoryListItemProps> = ({ category, onPress }) => {
  const { quizBundleList, getProgressingQuizBundleIndex } = useQuizBundle({});

  const quizBundle = useMemo(
    () => quizBundleList[getProgressingQuizBundleIndex(category.id)],
    [category.id, getProgressingQuizBundleIndex, quizBundleList],
  );

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={CATEGORY_LOGO[category.id]}
        style={[styles.logo, { width: LOGO_SIZE, height: LOGO_SIZE, borderRadius: LOGO_SIZE / 2 }]}
      />

      <View style={styles.infoBox}>
        <CLText type="Body2" color={color.GRAY_SCALE_7} numberOfLines={2}>
          {category.name}
        </CLText>

        {quizBundle?.status === 'progress' && (
          <View style={styles.statusBox}>
            <CLText type="Caption2" color={color.GRAY_SCALE_7}>
              퀴즈 생성 날짜{'\n'}
              {`${DateTime.fromISO(quizBundle?.createdAt ?? '').toFormat('yyyy-MM-dd HH:mm:ss')}`}
            </CLText>

            <CLText
              type="Caption1"
              color={getStatusMessageAndColor('progress').color}
              textAlign="right"
              mr={-16}
              numberOfLines={1}>
              {getStatusMessageAndColor('progress').message}
            </CLText>
          </View>
        )}
      </View>
      <CLIcon icon="ArrowRightGray" stroke={color.GRAY_SCALE_5} width={14} height={14} />
    </TouchableOpacity>
  );
};

export default QuizCategoryListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: CATEGORY_ITEM_HEIGHT,
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
