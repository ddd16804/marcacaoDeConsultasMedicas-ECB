import React from 'react';
import { Icon } from 'react-native-elements';
import {Container, EmptyIcon, Message, SubMessage} from '../../styles';
import theme from '../../../../styles/theme';

interface EmptyStateProps {
  icon: string;
  message: string;
  subMessage?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  message,
  subMessage
}) => (
  <Container>
    <EmptyIcon>
      <Icon 
        name={icon} 
        size={40} 
        color={theme.colors.secondary}
        type="material"
      />
    </EmptyIcon>
    
    <Message>{message}</Message>
    
    {subMessage && (
      <SubMessage>{subMessage}</SubMessage>
    )}
  </Container>
);

export default EmptyState;