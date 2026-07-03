import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { Media } from './Media';
import { partida } from '../data/copa';

const LINHA = 'rgba(255,255,255,0.5)';

export function FieldMock({ tocando }: { tocando: boolean }) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  useEffect(() => {
    if (tocando) {
      tx.value = withRepeat(withTiming(70, { duration: 2400, easing: Easing.inOut(Easing.sin) }), -1, true);
      ty.value = withRepeat(withTiming(-30, { duration: 1600, easing: Easing.inOut(Easing.sin) }), -1, true);
    } else {
      cancelAnimation(tx);
      cancelAnimation(ty);
    }
    return () => {
      cancelAnimation(tx);
      cancelAnimation(ty);
    };
  }, [tocando]);

  const bola = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  return (
    <Media bg={partida.bg} preset="video" stripes={10} style={StyleSheet.absoluteFill}>
      <View style={styles.meio} />
      <View style={styles.circulo} />
      <View style={styles.pontoCentro} />
      <View style={styles.bolaWrap} pointerEvents="none">
        <Animated.View style={[styles.bola, bola]} />
      </View>
    </Media>
  );
}

const styles = StyleSheet.create({
  meio: { position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, marginLeft: -1, backgroundColor: LINHA },
  circulo: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 96,
    height: 96,
    marginLeft: -48,
    marginTop: -48,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: LINHA,
  },
  pontoCentro: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 6,
    height: 6,
    marginLeft: -3,
    marginTop: -3,
    borderRadius: 3,
    backgroundColor: LINHA,
  },
  bolaWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  bola: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(0,0,0,0.35)' },
});
