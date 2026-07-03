import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, type } from '../theme';
import { Logo } from './Logo';

export function AppHeader() {
  return (
    <View style={styles.wrap}>
      <Logo size={24} />
      <View style={styles.right}>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.text2} />
        </View>
        <LinearGradient
          colors={[colors.verde, colors.verdeEsc]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarTxt}>C</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  search: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { color: colors.sobreVerde, fontWeight: '900', fontSize: 15, fontFamily: type.black },
});
