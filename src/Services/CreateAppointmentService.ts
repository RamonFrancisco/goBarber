import { startOfHour } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository'
import Appointment from '../models/Appointment'

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: RequestDTO ): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentinSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentinSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;