import styled from 'styled-components/native';

interface StyledProps {
  status: string;
  color: string;
}

export const StatusBadgeContainer = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => props.color + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => props.color};
  font-size: 12px;
  font-weight: 500;
`;