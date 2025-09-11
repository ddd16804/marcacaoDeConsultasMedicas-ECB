import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonsContainer, ActionButton, ActionButtonText, IconContainer } from './styles';

interface UserActionsProps {
  userId: string;
  onDeleteUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  userId,
  onDeleteUser,
  onEditUser
}) => {
  const handleEdit = () => {
    onEditUser(userId);
  };

  const handleDelete = () => {
    onDeleteUser(userId);
  };

  return (
    <ButtonsContainer>
      <ActionButton
        variant="edit"
        onPress={handleEdit}
        activeOpacity={0.8}
      >
        <ActionButtonText>
          <IconContainer>
            <MaterialIcons name="edit" size={16} color={theme.colors.white} />
          </IconContainer>
          Editar
        </ActionButtonText>
      </ActionButton>
      
      <ActionButton
        variant="delete"
        onPress={handleDelete}
        activeOpacity={0.8}
      >
        <ActionButtonText>
          <IconContainer>
            <MaterialIcons name="delete" size={16} color={theme.colors.white} />
          </IconContainer>
          Excluir
        </ActionButtonText>
      </ActionButton>
    </ButtonsContainer>
  );
};

export default UserActions;
