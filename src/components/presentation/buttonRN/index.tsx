import React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';

import { styles } from './styles';

type Props = PressableProps & {
  title: string;
};

export default function ButtonRN({ title, style, ...props }: Props) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

