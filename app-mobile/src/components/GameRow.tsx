import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, type } from '../theme';
import { Game } from '../domain/models';
import { PressableScale } from './PressableScale';

export function GameRow({ game }: { game: Game }) {
  const router = useRouter();
  return (
    <PressableScale style={styles.row} scaleTo={0.98} onPress={() => router.push('/player/semi')}>
      <View style={styles.left}>
        {game.live ? (
          <Text style={styles.live}>AO VIVO</Text>
        ) : (
          <Text style={styles.hora}>{game.time}</Text>
        )}
      </View>
      <View style={styles.divisor} />
      <View style={styles.times}>
        <View style={styles.timeLinha}>
          <View style={styles.timeEsq}>
            <Text style={styles.flag}>{game.homeFlag}</Text>
            <Text style={styles.nome}>{game.home}</Text>
          </View>
          <Text style={styles.placar}>{game.homeScore}</Text>
        </View>
        <View style={[styles.timeLinha, { marginTop: 8 }]}>
          <View style={styles.timeEsq}>
            <Text style={styles.flag}>{game.awayFlag}</Text>
            <Text style={styles.nome}>{game.away}</Text>
          </View>
          <Text style={styles.placar}>{game.awayScore}</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radius.card,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  left: { width: 52, alignItems: 'center' },
  live: { color: colors.vermelho, fontWeight: '800', fontSize: 11, fontFamily: type.eb },
  hora: { color: colors.text, fontSize: 16, fontFamily: type.display },
  divisor: { width: 1, height: 34, backgroundColor: 'rgba(255,255,255,0.08)' },
  times: { flex: 1 },
  timeLinha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeEsq: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  flag: { fontSize: 19 },
  nome: { color: colors.text, fontWeight: '700', fontSize: 14, fontFamily: type.b },
  placar: { color: colors.muted, fontWeight: '700', fontSize: 13, fontFamily: type.b },
});
