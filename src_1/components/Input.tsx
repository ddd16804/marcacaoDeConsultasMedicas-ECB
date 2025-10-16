import React from 'react';
import styled from 'styled-components/native';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  error?: string;
  accessibilityLabel?: string;
}

export default function Input({
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  accessibilityLabel,
}: InputProps) {
  return (
    <Container>
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
        accessibilityLabel={accessibilityLabel || placeholder}
        accessibilityHint={placeholder}
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const StyledInput = styled.TextInput`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 13px;
  margin-top: 4px;
`;
