import React from 'react';
import RoleBadge from '../RoleBadge';
import UserActions from '../UserActions';
import { 
  LoadingText, 
  EmptyText, 
  UserListContainer, 
  UserCard, 
  UserInfo, 
  UserName, 
  UserEmail 
} from '../../styles';
import { User } from '../../../../types/auth';

interface UserListProps {
  users: User[];
  loading: boolean;
  onDeleteUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  onDeleteUser,
  onEditUser
}) => {
  if (loading) {
    return <LoadingText>Carregando usuários...</LoadingText>;
  }

  if (users.length === 0) {
    return <EmptyText>Nenhum usuário cadastrado</EmptyText>;
  }

  return (
    <UserListContainer>
      {users.map((user) => (
        <UserCard key={user.id}>
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserInfo>
          
          <RoleBadge role={user.role} />
          
          <UserActions
            userId={user.id}
            onDeleteUser={onDeleteUser}
            onEditUser={onEditUser}
          />
        </UserCard>
      ))}
    </UserListContainer>
  );
};

export default UserList;