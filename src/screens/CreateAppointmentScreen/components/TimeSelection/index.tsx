import React from 'react';
import TimeSlotList from '../../../../components/TimeSlotList';
import { SectionTitle } from '../../styles';
import { TimeSlotContainer } from './styles';

interface TimeSelectionProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedTime,
  onSelectTime
}) => {
  return (
    <TimeSlotContainer>
      <SectionTitle>Selecione um Horário</SectionTitle>
      <TimeSlotList
        onSelectTime={onSelectTime}
        selectedTime={selectedTime}
      />
    </TimeSlotContainer>
  );
};

export default TimeSelection;