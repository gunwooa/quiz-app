import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { DateTime } from 'luxon';

import { QuizBundle } from '~/src/stores/quiz-bundle-list';
import { color } from '~/src/styles/color';

import CLIcon from './common/CLIcon';
import CLText from './common/CLText';
import { CATEGORY_LOGO } from '../constants/image';
import { getStatusMessageAndColor } from '../utils/common';

type QuizRecordListItemProps = {
  quizBundle: QuizBundle;
  containerStyle?: ViewStyle;
  onPress?: () => void | Promise<void>;
};

export const CATEGORY_ITEM_HEIGHT = 120;
const LOGO_SIZE = 60;

const QuizRecordListItem: FC<QuizRecordListItemProps> = ({
  quizBundle,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
      <Image
        source={CATEGORY_LOGO[quizBundle.category.id]}
        style={[styles.logo, { width: LOGO_SIZE, height: LOGO_SIZE, borderRadius: LOGO_SIZE / 2 }]}
      />

      <View style={styles.infoBox}>
        <CLText type="Body2" color={color.GRAY_SCALE_7} numberOfLines={2}>
          {quizBundle.category.name}
        </CLText>

        <View style={styles.statusBox}>
          {quizBundle?.status === 'complete' ? (
            <CLText type="Caption2" color={color.GRAY_SCALE_7}>
              퀴즈 푼 날짜{'\n'}
              {`${DateTime.fromISO(quizBundle?.completedAt ?? '').toFormat('yyyy-MM-dd HH:mm:ss')}`}
            </CLText>
          ) : (
            <CLText type="Caption2" color={color.GRAY_SCALE_7}>
              퀴즈 생성 날짜{'\n'}
              {`${DateTime.fromISO(quizBundle?.createdAt ?? '').toFormat('yyyy-MM-dd HH:mm:ss')}`}
            </CLText>
          )}

          <CLText
            type="Caption1"
            color={getStatusMessageAndColor(quizBundle?.status).color}
            textAlign="right"
            mr={-16}
            numberOfLines={1}>
            {getStatusMessageAndColor(quizBundle?.status).message}
          </CLText>
        </View>
      </View>

      <CLIcon icon="ArrowRightGray" stroke={color.GRAY_SCALE_5} width={14} height={14} />
    </TouchableOpacity>
  );
};

export default QuizRecordListItem;

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
