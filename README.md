# Wlad's Quotes Chat App (Node.js, Express, React)

Wlad's Quotes Chat App is a chat application with automatic responses from the backend using random quotes from the Quotable API.

---

⚡ Features

- Database: MongoDB
- JWT Authentication
- Real-time messaging via Socket.io
- Welcome emails (with resend API support)
- Image sharing in chat using Cloudinary
- Anti-bot security and API rate limiting via Arcjet
- Google Authentication (not working by the moment, in development)
- 3 built-in chat bots that reply with quotes when the user sends a message

---

⚙️ Environment Variables

Backend .env

    EXPRESS_SERVER_PORT=4250
    NODE_ENV=development
    MONGODB_URI=
    JWT_SECRET=
    RESEND_API_KEY=
    EMAIL_FROM=
    EMAIL_FROM_NAME=
    CLIENT_URL=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    ARCJET_ENV=development
    ARCJET_KEY=
    BOTPASS=botpassword
    GOOGLE_CLIENT_SECRET=
    GOOGLE_CLIENT_ID=

Frontend .env

    NODE_ENV=development
    BASE_URL=
    PORT=

---

🚀 Running the Project

Backend:

    cd backend
    npm install
    npm run dev

Frontend:

    cd frontend
    npm install
    npm run start

---

🌐 Temporary Demo Link

The application is temporarily deployed on a free Sevalla plan:

    https://wlads-quotes-chat-ubfjz.sevalla.app/



