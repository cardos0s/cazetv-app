import { Pressable, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ReactNode } from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressableScale({
  children,
  onPress,
  style,
  scaleTo = 0.96,
}: {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
}) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(scaleTo, { damping: 15, stiffness: 400 }))}
      onPressOut={() => (scale.value = withSpring(1, { damping: 12, stiffness: 300 }))}
      style={[style, animStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}
