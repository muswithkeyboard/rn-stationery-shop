import { StyleSheet, Text, View } from 'react-native';
import { selectOrderCount, useOrderLines, useOrderStore } from '../stores/orderStore';

export default function OrderSummary() {
  const count = useOrderStore(selectOrderCount);
  const lines = useOrderLines();

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>Наименований</Text>
        <Text style={styles.value}>{lines.length}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Всего упаковок</Text>
        <Text style={styles.totalValue}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: '600' },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#0057B8' },
});
