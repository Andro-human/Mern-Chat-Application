# Mern Chat Application

Users can communicate seamlessly using text messages and attachments through the chat application. Using the MERN stack (MongoDB, Express.js, React.js, Node.js), the application uses WebSockets for real-time communication. The following are some of its features:

**User Management:**

- Registration requires a unique username and password, or users can log in if they already have an account.
- Upon successful registration or login, users are authenticated and granted access to the application.

**Friend Management:**

- Users can search for other users within the application.
- They can send friend requests to other users.
- Users receive notifications when they receive friend requests.
- Users can accept or reject friend requests.
- Users can unfriend other users, removing them from their friend list.

**Chat Features:**

- Users can view their chat list, which includes individual and group chats.
- Individual chats allow users to exchange messages and attachments with their friends.
- Users can create group chats with a minimum of 3 members and a maximum of 100 members.
- Group admins have privileges to rename the group, add or remove members, and delete the group.
- If the group admin leaves the group, a new admin is automatically assigned from the existing members.
- Group members can leave the group at any time.

**Admin Dashboard:**

- An admin dashboard is accessible only with a secret key for authorized personnel.
- User activity is displayed on the dashboard, including the number of messages sent, and active chat sessions.

**Technology Stack:**

- MongoDB: Database to store user information, chat history, and group data.
- Express.js: Backend framework for handling HTTP requests and routing.
- React.js: Frontend library for building user interfaces.
- Node.js: Runtime environment for executing JavaScript on the server-side.
- WebSocket: Protocol for establishing a persistent connection between the server and clients, enabling real-time communication.

With its robust features and modern technology stack, the chat application provides users with a reliable and efficient platform for staying connected and engaging in conversations with friends and groups.