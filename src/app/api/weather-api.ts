import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import cityList from './files/cities.json';
import { City } from '../models/city';

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network Error - Unable to reach out the server');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string, params?: URLSearchParams) =>
    axios
      .get(url, { params })
      .then(responseBody),
};

const Cities = {
  list: (): City[] => cityList as City[],
};

const Weather = {
  getForecastByCity: (city: City) =>
    request.get(`/onecall?lat=${city.latitude}&lon=${city.longitude}&APPID=${apiKey}`),
};

export default {
  Cities,
  Weather,
};
