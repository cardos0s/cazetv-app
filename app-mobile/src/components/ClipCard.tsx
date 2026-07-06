import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, type } from '../theme';
import { Clip } from '../domain/models';
import { Media } from './Media';
import { PressableScale } from './PressableScale';

export function ClipCard({ clip }: { clip: Clip }) {
  return (
    <PressableScale style={styles.card} scaleTo={0.96}>
      <Media bg={clip.bg} preset="clip" style={styles.thumb}>
        <View style={styles.play}>
          <Ionicons name="play" size={12} color="#fff" style={{ marginLeft: 1 }} />
        </View>
        <Text style={styles.titulo} numberOfLines={2}>
          {clip.title}
        </Text>
      </Media>
      <Text style={styles.views}>{clip.views}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: { width: 140 },
  thumb: { height: 180, borderRadius: radius.card },
  play: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
    fontFamily: type.b,
  },
  views: { color: colors.muted, fontSize: 10, fontWeight: '600', marginTop: 6, fontFamily: type.sb },
});
