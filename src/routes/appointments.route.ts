import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../Services/CreateAppointmentService';
import AppointmentReporitory from '../repositories/AppointmentRepository';

const appointmentsRoute = Router();

appointmentsRoute.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentReporitory);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRoute.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(); 

    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);  
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
  
  
});

export default appointmentsRoute;
