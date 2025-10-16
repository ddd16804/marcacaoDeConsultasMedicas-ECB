import styled from 'styled-components/native';
import theme from '../../../../styles/theme';
export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.large}px;
`;

export const Message = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  font-size: ${theme.typography.body.fontSize}px;
`;import { TouchableOpacity } from 'react-native';
import React from 'react';          