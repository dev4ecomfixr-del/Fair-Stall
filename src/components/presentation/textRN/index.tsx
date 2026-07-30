import React from 'react';
import { Text } from 'react-native';

import { COLORS } from '../../../constants/Colors';

export type GlyphName =
  | 'search'
  | 'bag'
  | 'heart'
  | 'arrow'
  | 'ticket'
  | 'store'
  | 'craft'
  | 'food'
  | 'event'
  | 'map'
  | 'home'
  | 'user'
  | 'clock'
  | 'star';

const glyphs: Record<GlyphName, string> = {
  search: '⌕',
  bag: '▱',
  heart: '♡',
  arrow: '→',
  ticket: '✦',
  store: '▦',
  craft: '✣',
  food: '◒',
  event: '♬',
  map: '⌖',
  home: '⌂',
  user: '○',
  clock: '◷',
  star: '★',
};

export function Glyph({
  name,
  size = 20,
  color = COLORS.ink,
}: {
  name: GlyphName;
  size?: number;
  color?: string;
}) {
  return (
    <Text style={{ color, fontSize: size, lineHeight: size + 2, fontWeight: '700' }}>
      {glyphs[name]}
    </Text>
  );
}
