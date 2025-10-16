import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}: ButtonProps) {
  const theme = useTheme();

  return (
    <ButtonContainer
      onPress={onPress}
      disabled={disabled || loading}
      variant={variant}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.secondary} />
      ) : (
        <ButtonText variant={variant}>{title}</ButtonText>
      )}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.TouchableOpacity<{ variant: 'primary' | 'secondary' }>`
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  border: 2px solid
    ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primary : theme.colors.border};
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text<{ variant: 'primary' | 'secondary' }>`
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.secondary : theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
`;
