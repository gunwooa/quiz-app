import React, { FC, useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { QuizBundle } from '~/src/stores/quiz-bundle-list';
import { color } from '~/src/styles/color';

import CLIcon from './common/CLIcon';
import CLText from './common/CLText';
import { CATEGORY_LOGO } from '../constants/image';

type QuizRecordListItemProps = {
  quizBundle: QuizBundle;
  onPress?: () => void | Promise<void>;
};

export const CATEGORY_ITEM_HEIGHT = 160;
const LOGO_SIZE = 60;

const QuizRecordListItem: FC<QuizRecordListItemProps> = ({ quizBundle, onPress }) => {
  const status = useCallback(() => {
    if (!quizBundle) {
      return '';
    }

    if (quizBundle.status === 'complete') {
      return '완료';
    } else if (quizBundle.status === 'again') {
      return '다시 푸는중';
    } else if (quizBundle.status === 'progress') {
      return '진행중';
    }
    return '';
  }, [quizBundle]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={CATEGORY_LOGO[quizBundle.category.id]}
        style={[styles.logo, { width: LOGO_SIZE, height: LOGO_SIZE, borderRadius: LOGO_SIZE / 2 }]}
      />

      <View style={styles.infoBox}>
        <CLText type="Body2" color={color.GRAY_SCALE_7} numberOfLines={2}>
          {quizBundle.category.name}
        </CLText>

        {status() && (
          <CLText
            type="Caption2"
            color={color.GRAY_SCALE_6}
            textAlign="right"
            mr={-16}
            numberOfLines={1}>
            {status()}
          </CLText>
        )}
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
});
