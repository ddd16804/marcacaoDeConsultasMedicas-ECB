import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

export const Logo = styled.Image`
  width: 36px;
  height: 36px;
  resize-mode: contain;
`;
