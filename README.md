
# IoT Factory Management System

## Overview
This is a scalable and dynamic system designed to manage IoT devices in a factory environment. The system collects and analyzes power consumption data from different machines, plants, and blocks in the factory. The backend is built using **NestJS**, the frontend uses **React** with **Tailwind CSS**, and **MySQL** is used as the relational database.

## Tech Stack
- **Backend**: NestJS (TypeScript)
- **Frontend**: React + Tailwind CSS
- **Database**: MySQL
- **API**: RESTful API using NestJS

## Project Structure
```
.
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── factory/
│   │   │   ├── plant/
│   │   │   ├── block/
│   │   │   ├── machine/
│   │   │   ├── sensor/
│   │   │   ├── powerData/
│   │   │   ├── dynamicParameters/
│   │   ├── main.ts
│   ├── tsconfig.json
│   ├── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   ├── package.json
│   ├── tailwind.config.js
├── .env
└── README.md
```

## Prerequisites

1. **Node.js**: Ensure you have **Node.js** (v14 or higher) installed.
2. **MySQL**: A running instance of MySQL or use a cloud-based MySQL instance (e.g., **AWS RDS**, **Google Cloud MySQL**).
3. **NestJS CLI**: You can install the NestJS CLI globally with the following command:

   ```bash
   npm install -g @nestjs/cli
   ```

4. **Frontend Dependencies**: Install the required dependencies for React and Tailwind CSS.

## Setup Instructions

### 1. Backend Setup (NestJS)
1. Clone the repository and navigate to the `backend` directory:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install the required backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `backend/` directory to configure your MySQL database:

   ```plaintext
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=password
   DB_DATABASE=iot_factory_management
   ```

4. Run database migrations (optional if you're using TypeORM for schema migrations):

   ```bash
   npm run migrate
   ```

5. Start the backend server:

   ```bash
   npm run start:dev
   ```

   The NestJS API should be running at `http://localhost:3000`.

### 2. Frontend Setup (React + Tailwind CSS)
1. Navigate to the `frontend/` directory:

   ```bash
   cd frontend
   ```

2. Install the required frontend dependencies:

   ```bash
   npm install
   ```

3. Setup Tailwind CSS by following the instructions in `tailwind.config.js` and ensuring the proper configuration in `postcss.config.js`.

4. Start the frontend server:

   ```bash
   npm run start
   ```

   The React application should now be running at `http://localhost:3000`.

### 3. Database Setup (MySQL)
1. Install MySQL and start the server (if you haven't already).
2. Create the database:

   ```sql
   CREATE DATABASE iot_factory_management;
   ```

3. Ensure your `.env` file in the backend points to the correct MySQL instance.

### 4. Running the Application

Once both the backend and frontend are running, you can access the **React** frontend at `http://localhost:3000`, which communicates with the **NestJS** backend to display data and manage IoT devices.

## Example Requests

#### POST - Create a Factory:
```bash
curl -X POST http://localhost:3000/factories   -H "Content-Type: application/json"   -d '{
    "factoryName": "Factory 1",
    "location": "Location A",
    "totalCapacity": 100000,
    "totalConsumption": 50000
  }'
```

#### GET - Retrieve All Plants:
```bash
curl -X GET http://localhost:3000/plants
```

## Future Enhancements
- Add **authentication and authorization** (JWT, OAuth2) for user management.
- Implement **real-time updates** with WebSockets or MQTT for IoT device data.
- Add **data visualization** to display power usage, voltage, current, etc., over time.
- Implement **unit testing** and **end-to-end testing** for both frontend and backend.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
