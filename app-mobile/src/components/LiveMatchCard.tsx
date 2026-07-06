import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, type } from '../theme';
import { LiveMatch } from '../domain/models';
import { Media } from './Media';
import { PressableScale } from './PressableScale';

export function LiveMatchCard({ match }: { match: LiveMatch }) {
  const router = useRouter();
  return (
    <PressableScale style={styles.card} scaleTo={0.97} onPress={() => router.push('/player/semi')}>
      <Media bg={match.bg} preset="thumb" style={styles.thumb}>
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>AO VIVO</Text>
        </View>
        <View style={styles.placarRow}>
          <Text style={styles.sigla}>{match.home}</Text>
          <Text style={styles.score}>{match.score}</Text>
          <Text style={styles.sigla}>{match.away}</Text>
        </View>
      </Media>
      <View style={styles.info}>
        <Text style={styles.comp}>{match.comp}</Text>
        <Text style={styles.viewers}>👁 {match.viewers}</Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 190,
    borderRadius: radius.card2,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  thumb: { height: 100 },
  badge: {
    position: 'absolute',
    top: 9,
    left: 9,
    backgroundColor: colors.vermelho,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  badgeTxt: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.5, fontFamily: type.eb },
  placarRow: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sigla: { color: '#fff', fontFamily: type.display, fontSize: 15 },
  score: { color: colors.verde, fontFamily: type.display, fontSize: 15 },
  info: { paddingHorizontal: 11, paddingVertical: 9 },
  comp: { fontSize: 11, color: colors.muted, fontFamily: type.sb },
  viewers: { fontSize: 11, color: colors.text2, marginTop: 3, fontFamily: type.m },
});
