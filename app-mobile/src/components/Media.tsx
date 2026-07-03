import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Grad } from '../data/copa';

type Preset = 'hero' | 'thumb' | 'clip' | 'channel' | 'video' | 'none';

const SCRIM: Record<Exclude<Preset, 'none'>, { colors: string[]; locations: number[] }> = {
  hero: { colors: ['rgba(5,6,10,0.15)', 'rgba(5,6,10,0.35)', 'rgba(5,6,10,0.92)'], locations: [0, 0.45, 1] },
  thumb: { colors: ['transparent', 'rgba(0,0,0,0.75)'], locations: [0.4, 1] },
  clip: { colors: ['transparent', 'rgba(0,0,0,0.85)'], locations: [0.45, 1] },
  channel: { colors: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)'], locations: [0, 1] },
  video: { colors: ['rgba(0,0,0,0.55)', 'transparent', 'transparent', 'rgba(0,0,0,0.55)'], locations: [0, 0.3, 0.6, 1] },
};

export function Media({
  bg,
  preset = 'thumb',
  stripes = 8,
  style,
  children,
}: {
  bg: Grad;
  preset?: Preset;
  stripes?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}) {
  const [a, b] = bg;
  const scrim = preset === 'none' ? null : SCRIM[preset];
  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <View style={[StyleSheet.absoluteFill, { flexDirection: 'row' }]}>
        {Array.from({ length: stripes }).map((_, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: i % 2 === 0 ? a : b }} />
        ))}
      </View>
      {scrim && (
        <LinearGradient
          colors={scrim.colors as [string, string, ...string[]]}
          locations={scrim.locations as [number, number, ...number[]]}
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </View>
  );
}
