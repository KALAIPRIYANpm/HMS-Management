import axios from 'axios';

export const getNFTs = async () => {
  const response = await axios.get('/api/nft');
  return response.data;
};