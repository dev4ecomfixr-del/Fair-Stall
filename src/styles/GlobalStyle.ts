import { StyleSheet } from 'react-native';

import { COLORS } from '../constants/Colors';

export const GlobalStyle = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

