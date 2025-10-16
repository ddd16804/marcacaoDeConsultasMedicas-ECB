import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const TimeSlotContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const TimeSlotGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

export const TimeSlotButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${props => 
    props.selected ? theme.colors.primary : theme.colors.cardBackground};
  padding: 12px;
  border-radius: 8px;
  min-width: 80px;
  align-items: center;
  border-width: 1px;
  border-color: ${props => 
    props.selected ? theme.colors.primary : theme.colors.border};
`;

export const TimeSlotText = styled.Text<{ selected: boolean }>`
  color: ${props => 
    props.selected ? theme.colors.white : theme.colors.text};
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
`;