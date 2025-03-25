// src/api/outpatientAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/outpatients';

// Get all outpatients
export const getOutpatients = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error('Error fetching outpatients:', err);
    throw err;
  }
};

// Add a new outpatient
export const addOutpatient = async (outpatient) => {
  try {
    const res = await axios.post(BASE_URL, outpatient);
    return res.data;
  } catch (err) {
    console.error('Error adding outpatient:', err);
    throw err;
  }
};

// Update outpatient
export const updateOutpatient = async (id, outpatient) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, outpatient);
    return res.data;
  } catch (err) {
    console.error('Error updating outpatient:', err);
    throw err;
  }
};

// Delete outpatient
export const deleteOutpatient = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    console.error('Error deleting outpatient:', err);
    throw err;
  }
};

// Toggle outpatient status (active/inactive)
export const toggleOutpatientStatus = async (id, updatedOutpatient) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedOutpatient);
    return res.data;
  } catch (err) {
    console.error('Error toggling outpatient status:', err);
    throw err;
  }
};
