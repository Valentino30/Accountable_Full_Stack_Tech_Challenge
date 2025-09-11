# Football Events Manager

The **Football Events Manager** backend provides APIs for managing football match events and ticket reservations.  
It handles event listings, user reservations (with limits per user/event), and integrates with MongoDB for persistence.

This service is built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**.

---

## 🚀 Getting Started

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Docker](https://www.docker.com/) (to run MongoDB)

#### Clone the repository

```bash
git clone https://github.com/your-username/football_events_manager.git
cd football_events_manager
```

#### Install dependencies

```bash
cd backend
npm install
```

#### Setup environment variables

Copy the example file and adjust values if needed:

```bash
cp backend/.env.example backend/.env
```

#### Run MongoDB using Docker

Start a MongoDB container:

```bash
docker run -d -p 27017:27017 --name mongo mongo:6
```

#### Seed the database

Import initial event data from the CSV file:

```bash
cd backend
npm run seed
```

#### Run the server

Start the development server:

```bash
cd backend
npm run dev
```

Server will be running on:

```bash
👉 http://localhost:5001
```

---

## 📚 API Endpoints

- GET /api/events → List all events
- GET /api/events/:id → Get single event
- POST /api/events/:id/reserve → Reserve spots for an event

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
---