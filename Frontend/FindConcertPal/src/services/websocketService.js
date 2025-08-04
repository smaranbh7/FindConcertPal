import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscribed = false;
    this.currentUserId = null;
    this.messageCallbacks = new Map();
    this.connectionPromise = null;
  }

  connect(userId) {
    if (this.connected && this.subscribed) {
      return Promise.resolve();
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.currentUserId = userId;

    this.connectionPromise = new Promise((resolve, reject) => {
      // Create SockJS connection
      const socket = new SockJS('http://localhost:8080/ws');
      
      // Create STOMP client
      this.client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
          console.log('Connected to WebSocket');
          this.connected = true;
          
          // Add a small delay to ensure connection is fully established
          setTimeout(() => {
            try {
              // Subscribe to user's personal chat topic
              const chatTopic = `/topic/chat/${userId}`;
              console.log(`Attempting to subscribe to: ${chatTopic}`);
              this.client.subscribe(chatTopic, (message) => {
                console.log('RAW WebSocket message received:', message);
                console.log('Message body:', message.body);
                const chatMessage = JSON.parse(message.body);
                console.log('Parsed chat message:', chatMessage);
                this.handleIncomingMessage(chatMessage);
              });
              console.log(`Successfully subscribed to ${chatTopic}`);
              this.subscribed = true;
              resolve();
            } catch (error) {
              console.error('Subscription error:', error);
              reject(error);
            }
          }, 200); // Increased delay for better reliability
        },
        onDisconnect: () => {
          console.log('Disconnected from WebSocket');
          this.connected = false;
          this.subscribed = false;
          this.connectionPromise = null;
        },
        onStompError: (frame) => {
          console.error('STOMP error:', frame);
          this.connectionPromise = null;
          reject(new Error('Failed to connect to WebSocket'));
        },
        debug: (str) => {
          console.log('STOMP debug:', str);
        }
      });

      // Activate the client
      this.client.activate();
    });

    return this.connectionPromise;
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.connected = false;
      this.subscribed = false;
      this.currentUserId = null;
      this.messageCallbacks.clear();
      this.connectionPromise = null;
    }
  }

  sendMessage(receiverId, content) {
    if (!this.connected || !this.subscribed || !this.client) {
      throw new Error('WebSocket not connected or not subscribed yet');
    }

    const message = {
      senderId: this.currentUserId,
      receiverId: receiverId.toString(), // Ensure it's a string
      content: content,
      timestamp: new Date().toISOString()
    };

    console.log('Sending WebSocket message:', message);

    this.client.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(message)
    });

    return message;
  }

  // Register callback for incoming messages for a specific chat
  onMessage(chatId, callback) {
    this.messageCallbacks.set(chatId, callback);
  }

  // Remove callback for a specific chat
  offMessage(chatId) {
    this.messageCallbacks.delete(chatId);
  }

  handleIncomingMessage(chatMessage) {
    console.log('Received WebSocket message:', chatMessage);
    
    // Find the appropriate callback based on sender/receiver
    for (const [chatId, callback] of this.messageCallbacks.entries()) {
      // Call callback for the chat that involves this sender/receiver
      // The chatId should match the chat involving this user
      if (callback) {
        console.log(`Calling callback for chat ${chatId} with message:`, chatMessage);
        callback(chatMessage);
      }
    }
  }

  isConnected() {
    return this.connected;
  }

  getCurrentUserId() {
    return this.currentUserId;
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

export default websocketService;