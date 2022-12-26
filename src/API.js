import axios from 'axios';

const API_KEY = '31445682-be1580fcfd9d640b0fdf19e0d';

export const fetchImages = async (request, page) => {
  const result = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`);
  return result.data;
};