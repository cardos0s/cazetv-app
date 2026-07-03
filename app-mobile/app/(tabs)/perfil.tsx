import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius, type } from '../../src/theme';
import { AppHeader } from '../../src/components/AppHeader';

const ITENS = [
  { icon: 'heart-outline', label: 'Meus times' },
  { icon: 'notifications-outline', label: 'Notificações de jogos' },
  { icon: 'download-outline', label: 'Downloads' },
  { icon: 'settings-outline', label: 'Configurações' },
  { icon: 'help-circle-outline', label: 'Ajuda' },
] as const;

export default function Perfil() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <LinearGradient
            colors={[colors.verde, colors.verdeEsc]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarTxt}>C</Text>
          </LinearGradient>
          <Text style={styles.nome}>Casimiro</Text>
          <Text style={styles.tag}>@casimito · Torcedor CazéTV</Text>
        </View>

        <View style={styles.card}>
          {ITENS.map((it, i) => (
            <View key={it.label} style={[styles.linha, i < ITENS.length - 1 && styles.borda]}>
              <Ionicons name={it.icon} size={20} color={colors.verde} />
              <Text style={styles.linhaTxt}>{it.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.muted2} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  hero: { alignItems: 'center', paddingVertical: spacing.xxl },
  avatar: { width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { color: colors.sobreVerde, fontFamily: type.black, fontSize: 34 },
  nome: { color: colors.text, fontFamily: type.display, fontSize: 24, marginTop: 12 },
  tag: { color: colors.muted, fontSize: 13, fontWeight: '600', marginTop: 4, fontFamily: type.sb },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft, borderRadius: radius.card2, overflow: 'hidden' },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 15 },
  borda: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  linhaTxt: { flex: 1, color: colors.text, fontSize: 14, fontWeight: '700', fontFamily: type.b },
});
