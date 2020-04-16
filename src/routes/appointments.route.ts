import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import Appointment from '../repositories/AppointmentRepository';

const appointmentRepository = new Appointment();

const appointmentsRoute = Router();

appointmentsRoute.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentinSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentinSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRoute;
