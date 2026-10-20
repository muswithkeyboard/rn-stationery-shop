import { Pressable, StyleSheet, Text, View } from 'react-native';
import PillIcon from './PillIcon';
import { Drug } from '../types/drug';
import { useOrderStore } from '../stores/orderStore';

interface Props {
  drug: Drug;
  onPress: () => void;
}

export default function DrugListItem({ drug, onPress }: Props) {
  const add = useOrderStore((s) => s.add);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <PillIcon />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {drug.name} {drug.dosage}
        </Text>
        <Text style={styles.meta}>
          {drug.form} · {drug.manufacturer}
        </Text>
        {drug.prescription_required && (
          <Text style={styles.rx}>По рецепту</Text>
        )}
      </View>

      {/* stopPropagation: чтобы тап по кнопке не открывал экран препарата */}
      <Pressable
        style={styles.addBtn}
        onPress={(e) => {
          e.stopPropagation();
          add(drug);
        }}
      >
        <Text style={styles.addBtnText}>+</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6eef8',
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '700' },
  meta: { fontSize: 12, color: '#888', marginTop: 2 },
  rx: { fontSize: 12, color: '#111', fontWeight: '600', marginTop: 4 },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 22, lineHeight: 24, fontWeight: '700' },
});
