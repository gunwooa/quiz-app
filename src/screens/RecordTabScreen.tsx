import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenParamList } from '@src/routes/NavigationContainer';

type Props = NativeStackScreenProps<ScreenParamList>;

const RecordTabScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>RecordTabScreen</Text>
      <Button
        title="Go to QuizDetail"
        onPress={() => navigation.navigate('QuizDetail')}
      />
      <Button
        title="Go to RecordDetail"
        onPress={() => navigation.navigate('RecordDetail')}
      />
    </View>
  );
};

export default RecordTabScreen;

const styles = StyleSheet.create({});
