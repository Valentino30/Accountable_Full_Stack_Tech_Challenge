# Football Events Manager

The Football Events Manager is a backend service designed to manage football match events and ticket reservations. It provides APIs for user registration and login, event creation and listing, as well as ticket reservations and cancellations. The system enforces per-user and per-event reservation limits, ensuring fair access while maintaining persistent data storage through MongoDB.

The platform is built using **Node.js**, **TypeScript**, and **Express** on the backend, with **MongoDB** handling persistence. A **React Native** application built with **Expo** serves as the mobile client, enabling users to interact seamlessly with the system for browsing events, managing reservations, and handling cancellations in real time.

---

## 🚀 Getting Started

#### Clone the repository

```bash
git clone https://github.com/your-username/football_events_manager.git
cd football_events_manager
```

### Backend

#### Install dependencies

```bash
cd backend
npm install
```

#### Setup environment variables

Copy the example file:

```bash
touch .env
cp .env.example .env
```

Then replace the dummy variables with your own secrets and credentials.

#### Run MongoDB using Docker

1. Install & Open Docker Desktop
2. Start a MongoDB container:

```bash
docker run -d -p 27017:27017 --name mongo mongo:6
```

#### Seed the database

Import initial event data from the CSV file:

```bash
npm run seed
```

#### Run the server

Start the development server:

```bash
npm run dev
```

Server will be running on:

```bash
👉 http://localhost:5001
```

---

### Frontend

#### Install dependencies

```bash
cd mobile
npm install
```

#### Setup environment variables

Copy the example file:

```bash
touch .env.local
cp .env.example .env.local
```

Then replace `[YOUR_LOCAL_IP_ADDRESS]` with the local IPv4 address of your machine (e.g., `192.168.0.x`).

#### Run Expo

Start Expo's development server:

```bash
npm run start
```

#### Running the app

Once the Expo dev server is running, you have a few options:

- **Physical Device**: Install the Expo Go app on your Android or iOS device. Scan the QR code shown in your terminal (or in the Expo Dev Tools browser window) to open the project directly.

- **Mobile Emulator**: Press i in the terminal to launch the iOS Simulator (macOS only, requires Xcode).Press a in the terminal to launch the Android emulator (requires Android Studio set up).

---

## 🧪 Testing

### Backend

```bash
cd backend
npm run test:watch
```

### Frontend

```bash
cd mobile
npm run test:watch
```

---

## 📚 API Endpoints

- **POST** /api/auth/login → Login
- **POST** /api/auth/register → Register
- **GET** /api/users/me → Get Current User
- **GET** /api/events → List all Events
- **GET** /api/events/:id → Get one Event
- **POST** /api/events/:id/reserve → Make a Reservation
- **DELETE** /api/events/:id/reserve → Cancel a Reservation

---

## ✉️ Email & Notifications

The app sends automatic email notifications as follows:

- Reminders: 2 days before an event
- Follow-ups: 1 day after an event

Emails are sent via SendGrid (or any configured Nodemailer transport).

#### Cron Schedule

The email jobs are scheduled using `node-cron`.

- Reminders: 0 9 \* \* \* (daily at 09:00)
- Follow-ups: 0 10 \* \* \* (daily at 10:00)

#### Example Cron Job Logs

When the cron jobs run, you should see logs like this in your console:

```plaintext
⏰ Running reminder job...
📨 Running follow-up job...
✅ Email sent successfully
```
