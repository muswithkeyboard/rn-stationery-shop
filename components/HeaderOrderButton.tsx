import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { selectOrderCount, useOrderStore } from '../stores/orderStore';

export default function HeaderOrderButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const count = useOrderStore(selectOrderCount);

  return (
    <Pressable onPress={() => navigation.navigate('Order')} style={styles.wrap}>
      {/* Иконка сумки: ручка + корпус */}
      <View style={styles.bag}>
        <View style={styles.handle} />
      </View>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 8, alignItems: 'center' },
  bag: {
    width: 22,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 3,
    alignItems: 'center',
  },
  handle: {
    width: 10,
    height: 6,
    marginTop: 2,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#0057B8', fontSize: 11, fontWeight: '700' },
});
