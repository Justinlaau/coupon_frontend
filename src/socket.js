import { io } from 'socket.io-client'
import { BASE_URL } from './config/config'

// not many usage for now, set autoConnect to false
export const socket = io(BASE_URL, {
  autoConnect: true,
})
// export const couponSocket = io("http://192.168.31.249:8000/" + 'coupon', {
export const couponSocket = io(BASE_URL + 'coupon', {
  autoConnect: true,
})

socket.on('connect', () => {
  console.log('socket connected');
  token = localStorage.getItem('jwt') || "";
  couponSocket.auth = {"token": token}; // missing coupon_id
  couponSocket.connect();
})

couponSocket.on('connect', () => {
  console.log('coupon socket connected');
})
couponSocket.on('disconnect', () => {
  console.log('coupon socket disconnected');
})
