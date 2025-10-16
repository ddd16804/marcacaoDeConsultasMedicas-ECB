export async function getAvailableTimes(date: Date) {
  // Simula horários disponíveis
  const times = ['08:00', '09:00', '10:00', '14:00', '15:00'];
  return times.map((time, index) => ({ id: index + 1, time }));
}

export async function bookAppointment(date: Date, time: string) {
  // Simula marcação de consulta
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
