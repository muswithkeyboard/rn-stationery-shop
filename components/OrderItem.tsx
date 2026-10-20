import { Pressable, StyleSheet, Text, View } from 'react-native';
import PillIcon from './PillIcon';
import { OrderLine } from '../types/drug';
import { useOrderStore } from '../stores/orderStore';

export default function OrderItem({ line }: { line: OrderLine }) {
  const increment = useOrderStore((s) => s.increment);
  const decrement = useOrderStore((s) => s.decrement);
  const remove = useOrderStore((s) => s.remove);

  return (
    <View style={styles.row}>
      <PillIcon />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {line.drug.name} {line.drug.dosage}
        </Text>
        <Text style={styles.meta}>{line.drug.form}</Text>

        <View style={styles.controls}>
          <Pressable style={styles.qtyBtn} onPress={() => decrement(line.drug.id)}>
            <Text style={styles.qtyText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{line.quantity}</Text>
          <Pressable style={styles.qtyBtn} onPress={() => increment(line.drug.id)}>
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
          <Pressable onPress={() => remove(line.drug.id)} style={styles.remove}>
            <Text style={styles.removeText}>Удалить</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '600' },
  meta: { fontSize: 12, color: '#888', marginBottom: 8 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e6eef8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { fontSize: 18, fontWeight: '700', color: '#0057B8' },
  qty: { fontSize: 16, fontWeight: '700', minWidth: 24, textAlign: 'center' },
  remove: { marginLeft: 'auto' },
  removeText: { color: '#e53935', fontSize: 13 },
});
