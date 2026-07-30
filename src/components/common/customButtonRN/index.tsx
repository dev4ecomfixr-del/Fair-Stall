import React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';

import { styles } from './styles';

type Props = PressableProps & {
  label: string;
};

export default function CustomButtonRN({ label, style, ...props }: Props) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

