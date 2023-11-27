// WebSocket.js
import { useEffect } from 'react';
import { BASE_WS_URL } from '../../config/config';

let ws: any = null;

export const connectWebSocket = () => {
  ws = new WebSocket(BASE_WS_URL + 'ws/qrconfirm/tony');

  ws.onopen = () => {
    console.log('WebSocket 连接已建立');
  };

  ws.onmessage = (event) => {
    console.log('接收到消息:', event.data);
  };

  ws.onerror = (error) => {
    console.error('WebSocket 错误:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket 连接已关闭');
  };
};

export const sendMessage = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    console.error('WebSocket 连接未建立或已关闭');
  }
};

export const closeWebSocket = () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
};

export const useWebSocket = () => {
  useEffect(() => {
    connectWebSocket();

    return () => {
      closeWebSocket();
    };
  }, []);
};