import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PillIcon from './PillIcon';
import { Drug } from '../types/drug';

export default function DrugDetailsCard({ drug }: { drug: Drug }) {
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <View style={styles.icon}>
        <PillIcon size={120} />
      </View>
      <Text style={styles.category}>{drug.category}</Text>
      <Text style={styles.name}>{drug.name}</Text>
      <Text style={styles.latin}>{drug.latin_name}</Text>

      {drug.prescription_required && (
        <Text style={styles.rx}>Отпускается по рецепту врача</Text>
      )}

      <Text style={styles.row}>Действующее вещество: {drug.active_substance}</Text>
      <Text style={styles.row}>Форма: {drug.form}</Text>
      <Text style={styles.row}>Дозировка: {drug.dosage}</Text>
      <Text style={styles.row}>Производитель: {drug.manufacturer}</Text>
      <Text style={styles.stock}>В наличии: {drug.stock} уп.</Text>
      <Text style={styles.desc}>{drug.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  icon: {
    height: 160,
    borderRadius: 16,
    backgroundColor: '#f2f5fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  category: { fontSize: 12, color: '#0057B8', textTransform: 'uppercase' },
  name: { fontSize: 22, fontWeight: '700', marginTop: 6 },
  latin: { fontSize: 14, color: '#999', fontStyle: 'italic', marginBottom: 12 },
  rx: {
    fontSize: 13,
    color: '#111',
    fontWeight: '600',
    marginBottom: 12,
  },
  row: { fontSize: 15, color: '#333', marginBottom: 6 },
  stock: { fontSize: 13, color: '#0057B8', marginTop: 4, marginBottom: 16 },
  desc: { fontSize: 15, lineHeight: 22, color: '#333' },
});
