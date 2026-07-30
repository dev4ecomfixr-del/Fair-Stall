import React from 'react';
import { Text, type TextProps } from 'react-native';

import { styles } from './styles';

export default function CustomTextRN({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.text, style]} />;
}

