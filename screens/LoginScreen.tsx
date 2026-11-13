import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { RootStackParamList } from '../types/navigation';
import PasswordInput from '../components/PasswordInput';

WebBrowser.maybeCompleteAuthSession();

// Фейковые данные для входа
const FAKE_LOGIN = 'admin';
const FAKE_PASSWORD = '12345';

// Client ID из GitHub → Settings → Developer settings → OAuth Apps
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
};

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  // Запрет скриншотов и записи экрана, пока открыт экран входа
  usePreventScreenCapture();

  const navigation = useNavigation<Nav>();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GITHUB_CLIENT_ID,
      scopes: ['read:user'],
      redirectUri: makeRedirectUri({ scheme: 'pharmacyapp' }),
    },
    discovery,
  );

  const goToApp = () => navigation.replace('DrugList');

  useEffect(() => {
    if (response?.type === 'success') {
      goToApp();
    }
  }, [response]);

  const handleLogin = () => {
    if (login === FAKE_LOGIN && password === FAKE_PASSWORD) {
      goToApp();
    } else {
      Alert.alert('Ошибка', 'Неверный логин или пароль');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Аптека</Text>
      <Text style={styles.subtitle}>Войдите, чтобы продолжить</Text>

      <TextInput
        style={styles.input}
        placeholder="Логин"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <PasswordInput value={password} onChangeText={setPassword} />

      <Pressable style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Войти</Text>
      </Pressable>

      <Text style={styles.or}>или</Text>

      <Pressable
        style={[styles.btn, styles.githubBtn]}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.btnText}>Войти через GitHub</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f4f7fb',
  },
  title: { fontSize: 32, fontWeight: '800', color: '#0057B8', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#0057B8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  githubBtn: { backgroundColor: '#111' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  or: { textAlign: 'center', color: '#999', marginVertical: 12 },
});
