import { Router } from 'express';
import { parseISO, parse } from 'date-fns';

import CreateAppointmentService from '../Services/CreateAppointmentService';
import Appointment from '../repositories/AppointmentRepository';

const appointmentRepository = new Appointment();

const appointmentsRoute = Router();

appointmentsRoute.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentsRoute.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(appointmentRepository); 

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);  
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
  
  
});

export default appointmentsRoute;
