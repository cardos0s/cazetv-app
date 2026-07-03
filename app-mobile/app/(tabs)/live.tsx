import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, type } from '../../src/theme';
import { AppHeader } from '../../src/components/AppHeader';
import { ChannelCard } from '../../src/components/ChannelCard';
import { channels } from '../../src/data/copa';

export default function AoVivo() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>AO VIVO</Text>
        <Text style={styles.sub}>Canais e resenhas transmitindo agora</Text>
        {channels.map((ch, i) => (
          <Animated.View key={ch.title} entering={FadeInDown.delay(i * 80).springify().damping(16)}>
            <ChannelCard channel={ch} />
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  titulo: { fontFamily: type.display, fontSize: 22, color: colors.text, marginTop: 2, marginBottom: 4 },
  sub: { fontSize: 13, color: colors.muted, fontWeight: '600', marginBottom: spacing.lg, fontFamily: type.sb },
});
