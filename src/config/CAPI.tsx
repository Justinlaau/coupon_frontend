import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const capi = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 5000,
  headers: {
    "jwt_token": AsyncStorage.getItem('jwt') || ''
  }
})

export const CAPI = capi;