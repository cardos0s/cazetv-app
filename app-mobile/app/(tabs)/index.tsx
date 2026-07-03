import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { colors, spacing, radius, type } from '../../src/theme';
import { AppHeader } from '../../src/components/AppHeader';
import { Media } from '../../src/components/Media';
import { LiveDot } from '../../src/components/LiveDot';
import { PressableScale } from '../../src/components/PressableScale';
import { GameRow } from '../../src/components/GameRow';
import { LiveMatchCard } from '../../src/components/LiveMatchCard';
import { ClipCard } from '../../src/components/ClipCard';
import { partida, liveMatches, todayGames, clips } from '../../src/data/copa';

function SectionTitle({ children, live, verTudo }: { children: string; live?: boolean; verTudo?: boolean }) {
  return (
    <View style={styles.sectionRow}>
      <View style={styles.sectionLeft}>
        {live && <LiveDot size={7} />}
        <Text style={styles.section}>{children}</Text>
      </View>
      {verTudo && <Text style={styles.verTudo}>Ver tudo</Text>}
    </View>
  );
}

export default function Inicio() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <Animated.View entering={FadeInDown.duration(500).springify().damping(16)} style={styles.heroWrap}>
          <PressableScale scaleTo={0.98} onPress={() => router.push('/player/semi')}>
            <Media bg={partida.bg} preset="hero" stripes={10} style={styles.hero}>
              <View style={styles.liveBadge}>
                <LiveDot size={7} color="#fff" />
                <Text style={styles.liveBadgeTxt}>AO VIVO</Text>
              </View>
              <View style={styles.viewersBadge}>
                <Ionicons name="eye" size={13} color={colors.verde} />
                <Text style={styles.viewersTxt}>{partida.viewers}</Text>
              </View>
              <View style={styles.heroBottom}>
                <Text style={styles.heroComp}>{partida.comp} · 67'</Text>
                <View style={styles.heroScore}>
                  <View style={styles.heroTeam}>
                    <Text style={styles.heroFlag}>{partida.homeFlag}</Text>
                    <Text style={styles.heroSigla}>{partida.home}</Text>
                  </View>
                  <Text style={styles.heroPlacar}>
                    {partida.homeScore} <Text style={{ color: colors.dim }}>·</Text> {partida.awayScore}
                  </Text>
                  <View style={styles.heroTeam}>
                    <Text style={styles.heroSigla}>{partida.away}</Text>
                    <Text style={styles.heroFlag}>{partida.awayFlag}</Text>
                  </View>
                </View>
              </View>
            </Media>
          </PressableScale>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80).springify().damping(16)} style={styles.ctaWrap}>
          <PressableScale scaleTo={0.97} style={styles.cta} onPress={() => router.push('/player/semi')}>
            <Ionicons name="play" size={16} color={colors.sobreVerde} />
            <Text style={styles.ctaTxt}>ASSISTIR AGORA</Text>
          </PressableScale>
        </Animated.View>

        <View style={{ marginTop: spacing.huge }}>
          <SectionTitle live verTudo>AO VIVO AGORA</SectionTitle>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hRow}
          >
            {liveMatches.map((m, i) => (
              <Animated.View key={m.home + m.away} entering={FadeInDown.delay(i * 90).springify().damping(15)}>
                <LiveMatchCard match={m} />
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        <View style={{ marginTop: spacing.huge, paddingHorizontal: spacing.xl }}>
          <Text style={styles.sectionPlain}>JOGOS DE HOJE</Text>
          {todayGames.map((g, i) => (
            <Animated.View key={g.home + g.away} entering={FadeInDown.delay(i * 70).springify().damping(16)}>
              <GameRow game={g} />
            </Animated.View>
          ))}
        </View>

        <View style={{ marginTop: spacing.xxl }}>
          <Text style={[styles.sectionPlain, { paddingHorizontal: spacing.xl }]}>CORTES & MELHORES MOMENTOS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hRow}>
            {clips.map((c, i) => (
              <Animated.View key={c.title} entering={FadeIn.delay(i * 80)}>
                <ClipCard clip={c} />
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

  heroWrap: { marginHorizontal: spacing.lg, marginTop: 2 },
  hero: { height: 210, borderRadius: radius.hero },
  liveBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.vermelho,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  liveBadgeTxt: { color: '#fff', fontWeight: '800', fontSize: 11, letterSpacing: 0.6, fontFamily: type.eb },
  viewersBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  viewersTxt: { color: '#fff', fontWeight: '700', fontSize: 11, fontFamily: type.b },
  heroBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg },
  heroComp: { fontSize: 10, fontWeight: '700', letterSpacing: 1.4, color: colors.verde, marginBottom: 10, fontFamily: type.b },
  heroScore: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroTeam: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroFlag: { fontSize: 26 },
  heroSigla: { fontFamily: type.display, fontSize: 22, color: '#fff' },
  heroPlacar: { fontFamily: type.display, fontSize: 34, color: '#fff', letterSpacing: 1 },

  ctaWrap: { marginHorizontal: spacing.lg, marginTop: spacing.md },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.verde,
    paddingVertical: 14,
    borderRadius: radius.card,
  },
  ctaTxt: { color: colors.sobreVerde, fontWeight: '900', fontSize: 15, fontFamily: type.black },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  section: { fontFamily: type.display, fontSize: 17, color: colors.text },
  sectionPlain: { fontFamily: type.display, fontSize: 17, color: colors.text, marginBottom: spacing.md },
  verTudo: { fontSize: 12, color: colors.verde, fontWeight: '700', fontFamily: type.b },
  hRow: { gap: 12, paddingHorizontal: spacing.xl, paddingBottom: 4 },
});
