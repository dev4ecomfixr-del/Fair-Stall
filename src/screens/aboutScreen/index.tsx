import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Mela Fest</Text>
      <Text style={styles.copy}>
        Bangladesh trade, heritage, food, craft and entertainment in one fair.
      </Text>
    </View>
  );
}

