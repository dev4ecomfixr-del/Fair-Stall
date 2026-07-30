import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paper,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: COLORS.ink,
    fontSize: 30,
    fontWeight: '900',
  },
  copy: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
  },
});

