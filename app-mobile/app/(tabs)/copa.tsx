import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors, spacing, radius, type } from '../../src/theme';
import { AppHeader } from '../../src/components/AppHeader';
import { GameRow } from '../../src/components/GameRow';
import { todayGames, groupA, bracket } from '../../src/data/copa';

type Tab = 'hoje' | 'grupos' | 'mata';

export default function Copa() {
  const [tab, setTab] = useState<Tab>('hoje');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <View style={{ paddingHorizontal: spacing.xl }}>
          <LinearGradient colors={['#1a7a45', '#0c5c33']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.banner}>
            <Text style={styles.trofeu}>🏆</Text>
            <Text style={styles.bannerLabel}>TRANSMISSÃO OFICIAL</Text>
            <Text style={styles.bannerTitulo}>COPA 2026</Text>
            <Text style={styles.bannerSub}>64 jogos · 100% na CazéTV</Text>
          </LinearGradient>
        </View>

        <View style={styles.tabs}>
          {(['hoje', 'grupos', 'mata'] as Tab[]).map((t) => {
            const on = tab === t;
            return (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={[styles.tab, { backgroundColor: on ? colors.verde : colors.surface }]}
              >
                <Text style={[styles.tabTxt, { color: on ? colors.sobreVerde : colors.text2 }]}>
                  {t === 'hoje' ? 'Hoje' : t === 'grupos' ? 'Grupos' : 'Mata-mata'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {tab === 'hoje' && (
          <Animated.View entering={FadeIn} style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.md }}>
            {todayGames.map((g, i) => (
              <Animated.View key={g.home + g.away} entering={FadeInDown.delay(i * 70).springify().damping(16)}>
                <GameRow game={g} />
              </Animated.View>
            ))}
          </Animated.View>
        )}

        {tab === 'grupos' && (
          <Animated.View entering={FadeIn} style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.lg }}>
            <Text style={styles.grupoTitulo}>GRUPO A</Text>
            <View style={styles.tabela}>
              <View style={styles.thead}>
                <Text style={[styles.th, styles.cPos]}>#</Text>
                <Text style={[styles.th, styles.cTime]}>TIME</Text>
                <Text style={[styles.th, styles.cNum]}>J</Text>
                <Text style={[styles.th, styles.cNum]}>SG</Text>
                <Text style={[styles.th, styles.cPts]}>PTS</Text>
              </View>
              {groupA.map((t) => (
                <View key={t.name} style={styles.tr}>
                  <Text style={[styles.cPos, styles.pos, { color: t.classificado ? colors.verde : colors.muted }]}>
                    {t.pos}
                  </Text>
                  <View style={[styles.cTime, styles.timeCell]}>
                    <Text style={styles.flag}>{t.flag}</Text>
                    <Text style={styles.timeNome}>{t.name}</Text>
                  </View>
                  <Text style={[styles.cNum, styles.num]}>{t.j}</Text>
                  <Text style={[styles.cNum, styles.num]}>{t.sg}</Text>
                  <Text style={[styles.cPts, styles.pts]}>{t.pts}</Text>
                </View>
              ))}
            </View>
            <View style={styles.legenda}>
              <View style={styles.legQuad} />
              <Text style={styles.legTxt}>Classificado</Text>
            </View>
          </Animated.View>
        )}

        {tab === 'mata' && (
          <Animated.View entering={FadeIn}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bracket}>
              {bracket.map((col) => (
                <View key={col.round} style={styles.col}>
                  <Text style={styles.round}>{col.round}</Text>
                  {col.ties.map((tie, i) => (
                    <View key={i} style={styles.tie}>
                      <View style={styles.tieLinha}>
                        <View style={styles.tieTeam}>
                          <Text style={styles.tieFlag}>{tie.aFlag}</Text>
                          <Text style={[styles.tieNome, { color: tie.aDim ? colors.dim : colors.text }]}>{tie.a}</Text>
                        </View>
                        <Text style={styles.tieScore}>{tie.aScore}</Text>
                      </View>
                      <View style={[styles.tieLinha, { marginTop: 7 }]}>
                        <View style={styles.tieTeam}>
                          <Text style={styles.tieFlag}>{tie.bFlag}</Text>
                          <Text style={[styles.tieNome, { color: tie.bDim ? colors.dim : colors.text }]}>{tie.b}</Text>
                        </View>
                        <Text style={styles.tieScore}>{tie.bScore}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

  banner: { borderRadius: 20, padding: 20, overflow: 'hidden' },
  trofeu: { position: 'absolute', right: -20, top: -30, fontSize: 120, opacity: 0.18 },
  bannerLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, color: '#c8f7dd', fontFamily: type.eb },
  bannerTitulo: { fontFamily: type.display, fontSize: 30, color: '#fff', marginTop: 4 },
  bannerSub: { fontSize: 13, color: '#d5f5e4', marginTop: 8, fontWeight: '600', fontFamily: type.sb },

  tabs: { flexDirection: 'row', gap: 8, paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 10 },
  tabTxt: { fontWeight: '800', fontSize: 13, fontFamily: type.eb },

  grupoTitulo: { fontFamily: type.display, fontSize: 16, color: colors.text, marginBottom: 10 },
  tabela: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft, borderRadius: radius.card2, overflow: 'hidden' },
  thead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  th: { fontSize: 11, fontWeight: '800', color: colors.muted, fontFamily: type.eb },
  tr: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  cPos: { width: 26 },
  cTime: { flex: 1 },
  cNum: { width: 30, textAlign: 'center' },
  cPts: { width: 34, textAlign: 'center' },
  pos: { fontWeight: '800', fontSize: 13, fontFamily: type.eb },
  timeCell: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flag: { fontSize: 17 },
  timeNome: { color: colors.text, fontWeight: '700', fontSize: 13, fontFamily: type.b },
  num: { color: colors.text2, fontSize: 13, fontWeight: '600', fontFamily: type.sb },
  pts: { color: colors.verde, fontSize: 14, fontWeight: '800', fontFamily: type.eb },
  legenda: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, paddingLeft: 2 },
  legQuad: { width: 8, height: 8, borderRadius: 2, backgroundColor: colors.verde },
  legTxt: { fontSize: 11, color: colors.muted, fontWeight: '600', fontFamily: type.sb },

  bracket: { gap: 14, paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  col: { minWidth: 150 },
  round: { fontFamily: type.display, fontSize: 13, color: colors.verde, marginBottom: 10, letterSpacing: 0.5 },
  tie: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 14 },
  tieLinha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tieTeam: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  tieFlag: { fontSize: 15 },
  tieNome: { fontWeight: '700', fontSize: 12, fontFamily: type.b },
  tieScore: { color: colors.text2, fontWeight: '800', fontSize: 13, fontFamily: type.eb },
});
