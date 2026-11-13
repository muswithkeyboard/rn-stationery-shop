import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

// Поле пароля: по умолчанию символы скрыты точками
export default function PasswordInput({ value, onChangeText }: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidden}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable onPress={() => setHidden(!hidden)} style={styles.toggle}>
        <Text style={styles.toggleText}>{hidden ? 'Показать' : 'Скрыть'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
  },
  input: { flex: 1, padding: 14, fontSize: 16 },
  toggle: { paddingHorizontal: 14 },
  toggleText: { color: '#0057B8', fontWeight: '600' },
});
