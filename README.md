# HabitArena

Social habit-building platform with ritual rooms, momentum maps, and seasonal challenges.

## Features

### Authentication

- **Secure Registration & Login**: Password hashing with `bcrypt`.
- **JWT Authentication**: Access and Refresh token cycle for persistent sessions.
- **Protected Routes**: Middleware guards for secure API access.

### User Management

- **Profile Fetching**: Retrieve authenticated user details.
- **Profile Updates**: Update user information (excluding sensitive credentials).

### Architecture

- **Monorepo Structure**: Managed with npm workspaces.
- **Backend (NestJS)**: Modular architecture with TypeScript.
- **Frontend (Next.js)**: Modern UI with React and TailwindCSS.
- **Database (MongoDB)**: Scalable document storage via Mongoose.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Instance

### Installation

1. Install dependencies from the root:

   ```bash
   npm install
   ```

2. Set up environment variables in `server/.env` and `client/.env.local`.

3. Start development servers:

   ```bash
   # Start Backend
   npm run dev:server

   # Start Frontend
   npm run dev:client
   ```

## Tech Stack

- **Languages**: TypeScript, JavaScript
- **Backend**: NestJS, Mongoose, Passport (JWT)
- **Frontend**: Next.js, React, TailwindCSS, React Query
- **Monitoring**: Sentry Integration
