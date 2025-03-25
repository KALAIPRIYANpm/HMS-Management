import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/pharmacists';

// Get all pharmacists
export const getPharmacists = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Add new pharmacist
export const addPharmacist = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

// Update pharmacist
export const updatePharmacist = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

// Delete pharmacist
export const deletePharmacist = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
