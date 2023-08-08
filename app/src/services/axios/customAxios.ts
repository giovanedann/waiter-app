import axios from 'axios';

export const customAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
