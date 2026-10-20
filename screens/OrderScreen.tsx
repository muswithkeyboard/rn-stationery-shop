import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { selectOrderCount, useOrderLines, useOrderStore } from '../stores/orderStore';
import OrderItem from '../components/OrderItem';
import OrderSummary from '../components/OrderSummary';
import EmptyState from '../components/EmptyState';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Order'>;

export default function OrderScreen() {
  const navigation = useNavigation<Nav>();
  const lines = useOrderLines();
  const clear = useOrderStore((s) => s.clear);

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Заказ пуст"
        subtitle="Добавьте препараты из списка"
      />
    );
  }

  const handleOrder = () => {
    // Читаем актуальное состояние из стора вне React — фишка Zustand
    const count = selectOrderCount(useOrderStore.getState());

    Alert.alert(
      'Заказ оформлен ✅',
      `Вы забронировали ${count} уп. Заберите заказ в аптеке.`,
      [
        {
          text: 'OK',
          onPress: () => {
            clear();
            navigation.popToTop();
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lines}
        keyExtractor={(l) => l.drug.id}
        renderItem={({ item }) => <OrderItem line={item} />}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <OrderSummary />
        <Pressable style={styles.orderBtn} onPress={handleOrder}>
          <Text style={styles.orderBtnText}>Оформить заказ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fb' },
  list: { paddingVertical: 6 },
  footer: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  orderBtn: {
    backgroundColor: '#0057B8',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  orderBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
