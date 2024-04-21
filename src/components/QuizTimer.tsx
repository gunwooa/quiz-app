import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import CLText from './common/CLText';
import { color } from '../styles/color';
import { formatTime } from '../utils/common';

type QuizTimerProps = {
  seconds: number;
  isActive: boolean;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
};

const QuizTimer: FC<QuizTimerProps> = ({ seconds, isActive, setSeconds }) => {
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        setSeconds((_seconds) => _seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval.current!);
    }
    return () => clearInterval(interval.current!);
  }, [isActive, seconds, setSeconds]);

  return (
    <View style={styles.container}>
      <CLText type="H3" color={color.GRAY_SCALE_7}>
        {formatTime(seconds)}
      </CLText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color.GRAY_SCALE_1,
  },
});

export default QuizTimer;
