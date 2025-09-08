import React from 'react';
import { Icon } from 'react-native-elements';
import {
  Container,
  IconContainer,
  InfoContainer,
  StatsNumber,
  StatsLabel,
  TrendText
} from './styles';

interface StatsCardProps {
  icon: string;
  iconColor: string;
  backgroundColor: string;
  number: number;
  label: string;
  trend?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  iconColor,
  backgroundColor,
  number,
  label,
  trend
}) => (
  <Container>
    <IconContainer backgroundColor={backgroundColor}>
      <Icon 
        name={icon} 
        size={24} 
        color={iconColor}
        type="material"
      />
    </IconContainer>
    
    <InfoContainer>
      <StatsNumber>{number.toLocaleString('pt-BR')}</StatsNumber>
      <StatsLabel>{label}</StatsLabel>
    </InfoContainer>
    
    {trend !== undefined && (
      <TrendText positive={trend >= 0}>
        {trend >= 0 ? '+' : ''}{trend}%
      </TrendText>
    )}
  </Container>
);

export default StatsCard;