import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctors';

export const addDoctor = async (doctorData) => {
  return await axios.post(`${API_URL}/add`, doctorData);
};

export const getAllDoctors = async () => {
  return await axios.get(`${API_URL}/all`);
};

export const deleteDoctor = (id) => axios.delete(`${API_URL}/${id}`);