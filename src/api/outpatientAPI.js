import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/outpatients';

export const getOutpatients = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error('Error fetching outpatients:', err);
    throw err;
  }
};

export const addOutpatient = async (outpatient) => {
  try {
    const res = await axios.post(BASE_URL, outpatient);
    return res.data;
  } catch (err) {
    console.error('Error adding outpatient:', err);
    throw err;
  }
};

export const updateOutpatient = async (id, outpatient) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, outpatient);
    return res.data;
  } catch (err) {
    console.error('Error updating outpatient:', err);
    throw err;
  }
};

export const deleteOutpatient = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const toggleOutpatientStatus = async (id, data) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
