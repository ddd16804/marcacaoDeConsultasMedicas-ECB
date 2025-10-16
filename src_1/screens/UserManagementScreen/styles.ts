import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 24px;
  text-align: center;
  font-family: 'Roboto-Bold';
`;

export const HeaderSection = styled.View`
  margin-bottom: 24px;
`;

export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: 16px;
  margin-top: 40px;
  font-family: 'Roboto-Regular';
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: 16px;
  margin-top: 40px;
  font-style: italic;
  font-family: 'Roboto-Italic';
`;

export const UserListContainer = styled.View`
  margin-bottom: 20px;
`;

export const UserCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 20px;
  elevation: 3;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  border-left-width: 4px;
  border-left-color: ${theme.colors.primary};
`;

export const UserInfo = styled.View`
  margin-bottom: 12px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 4px;
  font-family: 'Roboto-Medium';
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  font-family: 'Roboto-Regular';
`;