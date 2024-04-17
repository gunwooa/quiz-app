import React, { FC } from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

import { color } from '~/src/styles/color';
import { QuizCategory } from '~/src/types';

import CLIcon from '../common/CLIcon';
import CLText from '../common/CLText';

type QuizCategoryItemProps = {
  category: QuizCategory;
  onPress?: () => void | Promise<void>;
};

export const CATEGORY_ITEM_HEIGHT = 100;
const LOGO_SIZE = 60;

const CATEGORY_LOGO: Record<number, ImageSourcePropType> = {
  9: require('assets/images/general-knowledge.webp'),
  10: require('assets/images/books.webp'),
  11: require('assets/images/film.webp'),
  12: require('assets/images/music.webp'),
  13: require('assets/images/musicals-theatres.webp'),
  14: require('assets/images/television.webp'),
  15: require('assets/images/video-games.webp'),
  16: require('assets/images/board-games.webp'),
  17: require('assets/images/science-nature.webp'),
  18: require('assets/images/science-computers.webp'),
  19: require('assets/images/science-mathematics.webp'),
  20: require('assets/images/mythology.webp'),
  21: require('assets/images/sports.webp'),
  22: require('assets/images/geography.webp'),
  23: require('assets/images/history.webp'),
  24: require('assets/images/politics.webp'),
  25: require('assets/images/art.webp'),
  26: require('assets/images/celebrities.webp'),
  27: require('assets/images/animals.webp'),
  28: require('assets/images/vehicles.webp'),
  29: require('assets/images/comics.webp'),
  30: require('assets/images/science-gadgets.webp'),
  31: require('assets/images/japanese-anime-manga.webp'),
  32: require('assets/images/cartoon-animations.webp'),
};

const QuizCategoryItem: FC<QuizCategoryItemProps> = ({ category, onPress }) => {
  const isProgress = false;

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

        {/* TODO : 상태 : 진행중 | 다시푸는중 | 완료 (진행중 상태일때만 표시됨)  */}
        {isProgress && (
          <CLText type="Caption2" color={color.GRAY_SCALE_6} numberOfLines={1}>
            {'진행중'}
          </CLText>
        )}
      </View>
      <CLIcon icon="ArrowRightGray" stroke={color.GRAY_SCALE_5} width={14} height={14} />
    </TouchableOpacity>
  );
};

export default QuizCategoryItem;

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
