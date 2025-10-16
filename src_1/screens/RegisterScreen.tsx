import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';

export default function RegisterScreen() {
  const theme = useTheme();
  const { register } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!name || !email || !password) {
        throw new Error('Todos os campos são obrigatórios.');
      }

      await register(name, email, password);
      setSuccess(true);
      Alert.alert('🎉 Cadastro concluído', 'Agora você pode fazer login!');
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar usuário.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Title>Crie sua conta</Title>

        <Input value={name} onChangeText={setName} placeholder="Nome completo" />
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
        />

        {error && <Message type="error">{error}</Message>}
        {success && <Message type="success">Cadastro realizado com sucesso!</Message>}

        <Button
          title={loading ? 'Enviando...' : 'Cadastrar'}
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
        />
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

const Message = styled.Text<{ type: 'error' | 'success' }>`
  color: ${({ theme, type }) =>
    type === 'error' ? theme.colors.error : theme.colors.success};
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
`;
