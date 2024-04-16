import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenParamList } from '@src/routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const QuizDetailScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>QuizDetailScreen</Text>
      <Button
        title="Go to QuizTab"
        onPress={() => navigation.navigate('QuizTab')}
      />
      <Button
        title="Go to RecordTab"
        onPress={() => navigation.navigate('RecordTab')}
      />
    </View>
  );
};

export default QuizDetailScreen;

const styles = StyleSheet.create({});
