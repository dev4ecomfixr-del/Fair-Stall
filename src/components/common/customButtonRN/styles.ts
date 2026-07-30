import { StyleSheet } from 'react-native';

import { COLORS } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  button: {
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});

