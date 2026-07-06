import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, type } from '../theme';
import { Channel } from '../domain/models';
import { Media } from './Media';
import { LiveDot } from './LiveDot';
import { PressableScale } from './PressableScale';

export function ChannelCard({ channel }: { channel: Channel }) {
  const router = useRouter();
  return (
    <PressableScale style={styles.card} scaleTo={0.98} onPress={() => router.push('/player/semi')}>
      <Media bg={channel.bg} preset="channel" style={styles.thumb}>
        <View style={styles.badge}>
          <LiveDot size={6} color="#fff" />
          <Text style={styles.badgeTxt}>AO VIVO</Text>
        </View>
        <View style={styles.viewersBadge}>
          <Text style={styles.viewersTxt}>👁 {channel.viewers}</Text>
        </View>
        <Text style={styles.titulo} numberOfLines={2}>
          {channel.title}
        </Text>
      </Media>
      <View style={styles.footer}>
        <View style={[styles.avatar, { backgroundColor: channel.avatarBg }]}>
          <Text style={styles.avatarTxt}>{channel.avatar}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.host}>{channel.host}</Text>
          <Text style={styles.tag}>{channel.tag}</Text>
        </View>
        <View style={styles.assistir}>
          <Text style={styles.assistirTxt}>Assistir</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: spacing.lg,
  },
  thumb: { height: 150 },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.vermelho,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTxt: { color: '#fff', fontSize: 10, fontWeight: '800', fontFamily: type.eb },
  viewersBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  viewersTxt: { color: '#fff', fontSize: 11, fontWeight: '700', fontFamily: type.b },
  titulo: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    color: '#fff',
    fontFamily: type.display,
    fontSize: 18,
    lineHeight: 19,
  },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontWeight: '900', color: colors.sobreVerde, fontSize: 13, fontFamily: type.black },
  host: { color: colors.text, fontWeight: '700', fontSize: 13, fontFamily: type.b },
  tag: { color: colors.muted, fontSize: 11, fontWeight: '600', fontFamily: type.sb },
  assistir: {
    borderWidth: 1.5,
    borderColor: colors.verde,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  assistirTxt: { color: colors.verde, fontSize: 11, fontWeight: '800', fontFamily: type.eb },
});
