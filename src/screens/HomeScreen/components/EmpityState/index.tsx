import React from 'react';
import { Button } from 'react-native-elements';
import { Container, Message } from './styles';

interface EmptyStateProps {
  message?: string;
  onRetry?: () => void;
  loading?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'Nenhuma consulta agendada', 
  onRetry,
  loading = false
}) => {
  return (
    <Container>
      <Message>{message}</Message>
      {onRetry && (
        <Button
          title="Tentar Novamente"
          onPress={onRetry}
          loading={loading}
          buttonStyle={{ marginTop: 16 }}
        />
      )}
    </Container>
  );
};

export default EmptyState;