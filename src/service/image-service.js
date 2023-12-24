import axios from 'axios';

const API_KEY = 'ZzWYQkIfAPzUa94EZ8hs1E7wJnAxf2vHt3zitbCf7CDuFGG5Wk9HZVPx';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);

  return data;
};
