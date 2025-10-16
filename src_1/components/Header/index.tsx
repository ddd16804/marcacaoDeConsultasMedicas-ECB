import React from 'react';
import { Container, Title, Logo } from './styles';

export default function Header() {
  return (
    <Container>
      <Logo source={require('../../assets/logo.png')} />
      <Title>HealthStop</Title>
    </Container>
  );
}
