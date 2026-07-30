import { StyleSheet } from 'react-native';

import { COLORS } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  button: {
    minHeight: 42,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '800',
  },
});

