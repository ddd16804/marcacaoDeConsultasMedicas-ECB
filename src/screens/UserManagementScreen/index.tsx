import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useUserManagement } from './hooks/useUserManagement';
import UserList from './components/UserList';
import { Container, Content, Title, HeaderSection } from './styles';

const UserManagementScreen: React.FC = () => {
  const {
    users,
    loading,
    handleDeleteUser,
    navigateBack,
    handleAddUser,
    handleEditUser
  } = useUserManagement();

  return (
    <Container>
      <Header />
      <ScrollView>
        <Content>
          <HeaderSection>
            <Title>Gerenciar Usuários</Title>
            
            <Button
              title="Adicionar Novo Usuário"
              onPress={handleAddUser}
              containerStyle={styles.button}
              buttonStyle={styles.buttonStyle}
              icon={<MaterialIcons name="person-add" size={20} color={theme.colors.white} />}
              iconRight
            />
          </HeaderSection>

          <UserList
            users={users}
            loading={loading}
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
          />

          <Button
            title="Voltar"
            onPress={navigateBack}
            containerStyle={styles.button}
            buttonStyle={styles.backButton}
            icon={<MaterialIcons name="arrow-back" size={20} color={theme.colors.white} />}
          />
        </Content>
      </ScrollView>
    </Container>
  );
};

const styles = {
  button: {
    marginBottom: 16,
    width: '100%',
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 14,
    borderRadius: 10,
  },
};

export default UserManagementScreen;