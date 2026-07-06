import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, radius, type } from '../../src/theme';
import { LiveDot } from '../../src/components/LiveDot';
import { PressableScale } from '../../src/components/PressableScale';
import { FieldMock } from '../../src/components/FieldMock';
import { Skeleton } from '../../src/components/Skeleton';
import { useMatch, useStats } from '../../src/hooks/queries';
import { useLiveStore, reactionEmojis } from '../../src/store/liveStore';

function FloatingReaction({ emoji, left }: { emoji: string; left: string }) {
  const y = useSharedValue(0);
  const op = useSharedValue(0);
  const sc = useSharedValue(0.5);

  useEffect(() => {
    y.value = withTiming(-160, { duration: 1600, easing: Easing.out(Easing.quad) });
    op.value = withSequence(withTiming(1, { duration: 240 }), withTiming(0, { duration: 1360 }));
    sc.value = withSequence(withTiming(1.15, { duration: 240 }), withTiming(1, { duration: 1360 }));
  }, []);

  const st = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { scale: sc.value }],
    opacity: op.value,
  }));

  return <Animated.Text style={[styles.float, { left: left as any }, st]}>{emoji}</Animated.Text>;
}

export default function Player() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const matchId = id ?? 'semi';

  const match = useMatch(matchId);
  const stats = useStats(matchId);

  const minute = useLiveStore((s) => s.minute);
  const chat = useLiveStore((s) => s.chat);
  const reactions = useLiveStore((s) => s.reactions);
  const addReaction = useLiveStore((s) => s.addReaction);
  const connect = useLiveStore((s) => s.connect);
  const disconnect = useLiveStore((s) => s.disconnect);

  const [tab, setTab] = useState<'chat' | 'stats'>('chat');
  const [tocando, setTocando] = useState(true);
  const chatRef = useRef<ScrollView>(null);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const topPad = Math.max(insets.top, 12);
  const m = match.data;

  return (
    <View style={styles.fill}>
      <StatusBar hidden />

      <View style={styles.video}>
        <FieldMock tocando={tocando} />

        <View style={[styles.topCtrls, { top: topPad }]}>
          <Pressable onPress={() => router.replace('/(tabs)')} hitSlop={10} style={styles.ctrlBtn}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </Pressable>
          <Pressable hitSlop={10} style={styles.ctrlBtn}>
            <Ionicons name="scan-outline" size={18} color="#fff" />
          </Pressable>
        </View>

        <Pressable onPress={() => setTocando((v) => !v)} style={styles.centerPlay}>
          <Ionicons name={tocando ? 'pause' : 'play'} size={22} color="#fff" style={{ marginLeft: tocando ? 0 : 2 }} />
        </Pressable>

        <View style={styles.livePill}>
          <LiveDot size={6} color="#fff" />
          <Text style={styles.livePillTxt}>AO VIVO · {minute}'</Text>
        </View>

        <View style={styles.progress}>
          <View style={styles.progressFill} />
        </View>

        {reactions.map((r) => (
          <FloatingReaction key={r.id} emoji={r.emoji} left={r.left} />
        ))}
      </View>

      <View style={styles.scorebar}>
        {!m ? (
          <Skeleton height={44} rounded={radius.pill} />
        ) : (
          <>
            <View style={styles.scoreTeam}>
              <Text style={styles.scoreFlag}>{m.homeFlag}</Text>
              <Text style={styles.scoreNome}>{m.homeFull}</Text>
            </View>
            <View style={styles.scoreCentro}>
              <Text style={styles.scoreNum}>
                {m.homeScore}
                <Text style={{ color: colors.dim }}>·</Text>
                {m.awayScore}
              </Text>
              <Text style={styles.scoreTempo}>{minute}' 2º TEMPO</Text>
            </View>
            <View style={styles.scoreTeam}>
              <Text style={styles.scoreFlag}>{m.awayFlag}</Text>
              <Text style={styles.scoreNome}>{m.awayFull}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.tabs}>
        <Pressable onPress={() => setTab('chat')} style={styles.tab}>
          <Text style={[styles.tabTxt, { color: tab === 'chat' ? colors.text : colors.muted }]}>💬 Chat da torcida</Text>
          <View style={[styles.tabBorder, { backgroundColor: tab === 'chat' ? colors.verde : 'transparent' }]} />
        </Pressable>
        <Pressable onPress={() => setTab('stats')} style={styles.tab}>
          <Text style={[styles.tabTxt, { color: tab === 'stats' ? colors.text : colors.muted }]}>📊 Estatísticas</Text>
          <View style={[styles.tabBorder, { backgroundColor: tab === 'stats' ? colors.verde : 'transparent' }]} />
        </Pressable>
      </View>

      {tab === 'chat' ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={chatRef}
            style={styles.chat}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => chatRef.current?.scrollToEnd({ animated: true })}
          >
            {chat.map((msg, i) => (
              <View key={i} style={styles.msg}>
                <View style={[styles.msgAvatar, { backgroundColor: msg.color }]}>
                  <Text style={styles.msgInicial}>{msg.name[0].toUpperCase()}</Text>
                </View>
                <Text style={styles.msgTexto}>
                  <Text style={[styles.msgNome, { color: msg.color }]}>{msg.name} </Text>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.reacBar}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 14, alignItems: 'center' }}
          >
            {reactionEmojis.map((e) => (
              <PressableScale key={e} scaleTo={0.82} style={styles.reacBtn} onPress={() => addReaction(e)}>
                <Text style={{ fontSize: 20 }}>{e}</Text>
              </PressableScale>
            ))}
          </ScrollView>

          <View style={[styles.inputRow, { paddingBottom: Math.max(insets.bottom, 14) }]}>
            <View style={styles.input}>
              <Text style={styles.inputPlaceholder}>Manda a resenha...</Text>
            </View>
            <View style={styles.send}>
              <Ionicons name="send" size={16} color={colors.sobreVerde} />
            </View>
          </View>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.statsWrap} showsVerticalScrollIndicator={false}>
          {stats.isLoading || !stats.data
            ? [0, 1, 2, 3].map((i) => <Skeleton key={i} height={30} style={{ marginBottom: 18 }} />)
            : stats.data.map((s) => (
                <View key={s.label} style={styles.statRow}>
                  <View style={styles.statHead}>
                    <Text style={styles.statVal}>{s.home}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                    <Text style={styles.statVal}>{s.away}</Text>
                  </View>
                  <View style={styles.statBar}>
                    <View style={[styles.statFillHome, { flex: s.homePct }]} />
                    <View style={[styles.statFillAway, { flex: s.awayPct }]} />
                  </View>
                </View>
              ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.bg },

  video: { height: 230, width: '100%', backgroundColor: '#000' },
  topCtrls: { position: 'absolute', left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between' },
  ctrlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerPlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -28,
    marginTop: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  livePill: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.vermelho,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  livePillTxt: { color: '#fff', fontSize: 10, fontWeight: '800', fontFamily: type.eb },
  progress: { position: 'absolute', bottom: 12, right: 12, height: 4, width: 120, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)' },
  progressFill: { height: '100%', width: '72%', backgroundColor: colors.verde, borderRadius: 2 },
  float: { position: 'absolute', bottom: 40, fontSize: 26 },

  scorebar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.scoreBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scoreTeam: { flex: 1, alignItems: 'center', gap: 5 },
  scoreFlag: { fontSize: 30 },
  scoreNome: { fontFamily: type.display, color: '#fff', fontSize: 15 },
  scoreCentro: { alignItems: 'center', paddingHorizontal: 8 },
  scoreNum: { fontFamily: type.display, fontSize: 38, color: '#fff', letterSpacing: 2 },
  scoreTempo: { fontSize: 10, color: colors.muted, fontWeight: '700', marginTop: 2, fontFamily: type.b },

  tabs: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.bg },
  tab: { flex: 1, alignItems: 'center', paddingTop: 14 },
  tabTxt: { fontWeight: '800', fontSize: 13, fontFamily: type.eb, paddingBottom: 12 },
  tabBorder: { height: 2, alignSelf: 'stretch' },

  chat: { flex: 1 },
  msg: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  msgAvatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  msgInicial: { fontWeight: '800', fontSize: 11, color: colors.sobreVerde, fontFamily: type.eb },
  msgTexto: { flex: 1, color: colors.text3, fontSize: 13, lineHeight: 18, fontFamily: type.r },
  msgNome: { fontWeight: '700', fontSize: 12, fontFamily: type.b },

  reacBar: { flexGrow: 0, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 8 },
  reacBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  inputRow: { flexDirection: 'row', gap: 10, alignItems: 'center', paddingHorizontal: 14, paddingTop: 10 },
  input: { flex: 1, backgroundColor: colors.surface2, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 11 },
  inputPlaceholder: { color: colors.muted2, fontSize: 13, fontFamily: type.r },
  send: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.verde, alignItems: 'center', justifyContent: 'center' },

  statsWrap: { padding: 18, paddingBottom: 40 },
  statRow: { marginBottom: 18 },
  statHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 },
  statVal: { fontSize: 13, fontWeight: '800', color: colors.text, fontFamily: type.eb },
  statLabel: { color: colors.muted, fontWeight: '600', fontSize: 12, fontFamily: type.sb },
  statBar: { flexDirection: 'row', gap: 4, height: 7 },
  statFillHome: { backgroundColor: colors.verde, borderRadius: 4 },
  statFillAway: { backgroundColor: colors.barEmpty, borderRadius: 4 },
});
