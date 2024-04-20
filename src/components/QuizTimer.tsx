import React, { FC, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import CLText from './common/CLText';
import { color } from '../styles/color';

type QuizTimerProps = {
  seconds: number;
  isActive: boolean;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
};

const QuizTimer: FC<QuizTimerProps> = ({ seconds, isActive, setSeconds }) => {
  const interval = useRef<NodeJS.Timeout | null>(null);

  const formatTime = useCallback(() => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  }, [seconds]);

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
      <CLText type="H2" color={color.GRAY_SCALE_7}>
        {formatTime()}
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
