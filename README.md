# Football Events Manager - Backend

The **Football Events Manager** backend provides APIs for managing football match events and ticket reservations.  
It handles event listings, user reservations (with limits per user/event), and integrates with MongoDB for persistence.

This service is built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Docker](https://www.docker.com/) (to run MongoDB)

### Clone the repository

```bash
git clone https://github.com/your-username/football_events_manager.git
cd football_events_manager
```

### Install dependencies

```bash
cd backend
npm install
```

### Setup environment variables

Copy the example file and adjust values if needed:

```bash
cp backend/.env.example backend/.env
```

### Run MongoDB using Docker

Start a MongoDB container:

```bash
docker run -d -p 27017:27017 --name mongo mongo:6
```

Check if it’s running:

```bash
docker ps
```

Stop the container:

```bash
docker stop mongo
```

Restart the container:

```bash
docker start mongo
```

### Seed the database

Import initial event data from the CSV file:

```bash
cd backend
npm run seed
```

### Run the server

From the `backend/` folder:

```bash
npm run start
```

Development mode (with hot reload):

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Server will be running on:  
👉 http://localhost:5000

---

## 📚 API Endpoints

- GET /api/events → List all events
- GET /api/events/:id → Get single event
- POST /api/events/:id/reserve → Reserve spots for an event
