import React from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { Appointment } from '../types/appointments';

type AppointmentCardProps = {
  appointment: Appointment;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const doctorImage = appointment.doctor?.image
    ? { uri: appointment.doctor.image }
    : require('../../../assets/doctor1.png');

  const patientImage = appointment.patient?.image
    ? { uri: appointment.patient.image }
    : require('../../../assets/patient1.png');

  return (
    <CardContainer>
      <Header>
        <DoctorImage source={doctorImage} />
        <InfoContainer>
          <DoctorName>{appointment.doctor?.name || 'Médico'}</DoctorName>
          <DoctorSpecialty>
            {appointment.doctor?.specialty || 'Especialidade não informada'}
          </DoctorSpecialty>
        </InfoContainer>
      </Header>

      <Divider />

      <PatientSection>
        <PatientImage source={patientImage} />
        <PatientInfo>
          <PatientName>{appointment.patient?.name || 'Paciente'}</PatientName>
          <AppointmentDetails>
            {appointment.date} às {appointment.time}
          </AppointmentDetails>
        </PatientInfo>
      </PatientSection>

      <Description numberOfLines={3}>{appointment.description}</Description>
    </CardContainer>
  );
};

export default AppointmentCard;

const CardContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.medium}px;
  margin-bottom: ${theme.spacing.medium}px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 3;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.background};
  margin-vertical: ${theme.spacing.small}px;
`;

const PatientSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${theme.spacing.small}px;
`;

const PatientImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: ${theme.spacing.medium}px;
`;

const PatientInfo = styled.View`
  flex: 1;
`;

const PatientName = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const AppointmentDetails = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
`;

const Description = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.small}px;
`;
