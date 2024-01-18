import { io } from 'socket.io-client'
import { BASE_URL } from './config/config'

// not many usage for now, set autoConnect to false
export const couponSocket = io(BASE_URL + 'coupon', {
  autoConnect: false,
})
