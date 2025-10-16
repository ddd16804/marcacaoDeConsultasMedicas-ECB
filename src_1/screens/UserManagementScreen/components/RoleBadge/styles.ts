import styled from 'styled-components/native';

interface StyledProps {
  role: string;
  color: string;
}

export const RoleBadgeContainer = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => props.color + '15'};
  padding: 8px 12px;
  border-radius: 20px;
  align-self: flex-start;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${(props: StyledProps) => props.color + '30'};
  flex-direction: row;
  align-items: center;
`;

export const RoleText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => props.color};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Roboto-Medium';
`;

export const IconContainer = styled.View`
  margin-right: 6px;
`;