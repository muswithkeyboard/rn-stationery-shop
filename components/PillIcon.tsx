import { StyleSheet, View } from 'react-native';

// Чёрно-белая иконка капсулы, нарисованная из View
export default function PillIcon({ size = 56 }: { size?: number }) {
  const pillW = size * 0.7;
  const pillH = size * 0.3;
  return (
    <View style={[styles.box, { width: size, height: size, borderRadius: size / 5 }]}>
      <View
        style={[
          styles.pill,
          { width: pillW, height: pillH, borderRadius: pillH / 2 },
        ]}
      >
        <View style={styles.dark} />
        <View style={styles.light} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#111',
    transform: [{ rotate: '-45deg' }],
  },
  dark: { flex: 1, backgroundColor: '#111' },
  light: { flex: 1, backgroundColor: '#fff' },
});
