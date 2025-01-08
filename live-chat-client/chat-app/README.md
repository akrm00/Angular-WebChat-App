# README.md

# Chat App

This project is a real-time chat application built using Angular for the frontend and Node.js with Express and Socket.IO for the backend. It allows users to join a chat room, send messages, and receive messages in real-time.

## Project Structure

```
chat-app
├── src
│   ├── app
│   │   ├── components
│   │   │   └── chat-room
│   │   │       ├── chat-room.component.ts
│   │   │       ├── chat-room.component.html
│   │   │       └── chat-room.component.css
│   │   └── services
│   │       └── user.service.ts
├── server
│   └── server.js
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Install dependencies:**
   Navigate to the server directory and install the backend dependencies:
   ```bash
   cd server
   npm install
   ```

   Then, navigate to the frontend directory and install the Angular dependencies:
   ```bash
   cd ../src
   npm install
   ```

3. **Run the server:**
   From the `server` directory, start the server:
   ```bash
   node server.js
   ```

4. **Run the Angular application:**
   From the `src` directory, start the Angular application:
   ```bash
   ng serve
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:4200` to access the chat application.

## Usage

- Enter your username to join the chat.
- Send messages to the chat room and see them appear in real-time.
- Messages from other users will also be displayed in real-time.

## Technologies Used

- Angular
- Node.js
- Express
- Socket.IO

## License

This project is licensed under the MIT License.