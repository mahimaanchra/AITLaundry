import API from './api';

export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const activateAccount = async (activationData) => {
  const response = await API.post('/auth/activate', activationData);
  return response.data;
};