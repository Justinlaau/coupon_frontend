import { io, Manager } from 'socket.io-client'
import { BASE_URL } from './config/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

let socket;
let connectionManager;
const timeout = 10000;
let domainEndpoints = {};
const domain = BASE_URL;
const endpoints = [
  {
    "name": "coupon",
    "endpointURL": "coupon"
  },
  {
    "name": "clientNotificationSystemInapp",
    "endpointURL": "clientNotificationSystemInapp"
  },
  {
    "name": "auth",
    "endpointURL": "auth"
  }
]

connectionManager = new Manager(domain, {
  autoConnect: false,
  transport: ['websocket'],
})

connectionManager.connect((err) => {
  console.log("Connecting ");
  if (err) {
    console.log("Error connecting to socket");
  } else {
    socket = connectionManager.socket("/");
    socket.connect();
    domainEndpoints = {};
    endpoints.forEach((endpoint) => {
      const name = endpoint["name"];
      const url = endpoint["endpointURL"];
      const newIO = connectionManager.socket(`/${url}`);
      newIO.connect();

      newIO.on('connect', function() {
        console.log(name + " connected");
      })
      domainEndpoints[name] = newIO;
    });

    socket.on('connect', function () {
      console.log('connected to', domain);
    });
    socket.on('connect_error', (error) => {
      console.log(error);
    });
    socket.on('disconnect', function () {
      console.log('disconnect');
    });
    socket.on('reconnect_attempt', (attempts) => {
      console.log("Try to reconnect at " + attempts + ' attempt(s).');
    });

  }
})

export const getEndpoint = (name) => {
  if (!domainEndpoints[name]) {
    console.log("Endpoint not found");
    return null;
  }
  return domainEndpoints[name];
}

// not many usage for now, set autoConnect to false
// export const socket = io(BASE_URL, {
//   autoConnect: true,
// })
// // export const couponSocket = io("http://192.168.31.249:8000/" + 'coupon', {
// export const couponSocket = io(BASE_URL + 'coupon', {
//   autoConnect: true,
// })

// export const clientNotificationSocket = io(BASE_URL + 'clientNotificationSystemInapp', {
//   autoConnect: true,
// })

// const socketConnectHandler = async () => {
//   console.log('socket connected');
//   token = await AsyncStorage.getItem('jwt') || "";
//   socket.auth = {"token": token};
//   couponSocket.auth = {"token": token}; // missing coupon_id
//   couponSocket.connect();
//   clientNotificationSocket.auth = {"token": token};
//   clientNotificationSocket.connect();
// }

// socket.on('connect', () => {
//   socketConnectHandler();
// })

// couponSocket.on('connect', () => {
//   console.log('coupon socket connected');
// })
// couponSocket.on('disconnect', () => {
//   console.log('coupon socket disconnected');
// })

// clientNotificationSocket.on('connect', () => {
//   console.log('client notification socket connected');
// })
// clientNotificationSocket.on('disconnect', () => {
//   console.log('client notification socket disconnected');
// });
// clientNotificationSocket.on('broadcast', (data) => {
//   console.log("clientNotification broadcast dataddas");
//   console.log(data);
// });
// clientNotificationSocket.on('broadcast', (data) => {
//   console.log("socket.js clientNotification broadcast dataddas");
//   console.log(data);
// })