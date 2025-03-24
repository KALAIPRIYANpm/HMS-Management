import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments';

// Get all appointments
export const getAppointments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Add a new appointment
export const addAppointment = async (appointment) => {
  try {
    const response = await axios.post(API_URL, appointment);
    return response.data;
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { message: 'Appointment deleted' };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};
