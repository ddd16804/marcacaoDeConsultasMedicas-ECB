import React from 'react';
import { Doctor } from '../../../../types/appointments';
import { User } from '../../../../types/auth';
import DoctorList from '../../../../components/DoctorList';
import { convertUsersToDoctors } from '../../utils/appointmentHelpers';
import { SectionTitle, LoadingText } from '../../styles';
import { DoctorContainer } from './styles';

interface DoctorSelectionProps {
  doctors: User[];
  loadingDoctors: boolean;
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({
  doctors,
  loadingDoctors,
  selectedDoctor,
  onSelectDoctor
}) => {
  return (
    <DoctorContainer>
      <SectionTitle>Selecione um Médico</SectionTitle>
      {loadingDoctors ? (
        <LoadingText>Carregando médicos...</LoadingText>
      ) : (
        <DoctorList
          doctors={convertUsersToDoctors(doctors)}
          onSelectDoctor={onSelectDoctor}
          selectedDoctorId={selectedDoctor?.id}
        />
      )}
    </DoctorContainer>
  );
};

export default DoctorSelection;