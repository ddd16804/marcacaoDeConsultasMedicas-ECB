import React, { useState, useContext } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';

export default function LoginScreen() {
  const theme = useTheme();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      if (!email || !password) {
        throw new Error('Preencha todos os campos.');
      }

      await signIn(email, password);
      Alert.alert('✅ Sucesso', 'Login realizado com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Falha ao realizar login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Title>Bem-vindo(a) ao HealthStop</Title>

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType="email-address"
          error={error && !email ? 'E-mail obrigatório' : undefined}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
          error={error && !password ? 'Senha obrigatória' : undefined}
        />

        {error && <ErrorText>{error}</ErrorText>}

        <Button
          title={loading ? 'Entrando...' : 'Entrar'}
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />

        {loading && <ActivityIndicator size="small" color={theme.colors.primary} />}
      </Content>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  text-align: center;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
`;
