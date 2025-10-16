import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { RoleBadgeContainer, RoleText, IconContainer } from './styles';
import { getRoleText, getRoleColor, getRoleIcon } from '../../utils/userUtils';

interface RoleBadgeProps {
  role: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const color = getRoleColor(role);
  const text = getRoleText(role);
  const icon = getRoleIcon(role);

  return (
    <RoleBadgeContainer role={role} color={color}>
      <IconContainer>
        <MaterialIcons name={icon} size={14} color={color} />
      </IconContainer>
      <RoleText role={role} color={color}>
        {text}
      </RoleText>
    </RoleBadgeContainer>
  );
};

export default RoleBadge;