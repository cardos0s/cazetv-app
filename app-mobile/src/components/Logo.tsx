import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { colors, type } from '../theme';

export function Logo({ size = 24, style }: { size?: number; style?: StyleProp<TextStyle> }) {
  return (
    <Text style={[styles.base, { fontSize: size }, style]}>
      <Text style={{ color: colors.text }}>CAZÉ</Text>
      <Text style={{ color: colors.verde }}>TV</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: type.display,
    letterSpacing: -0.5,
  },
});
