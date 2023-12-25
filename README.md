# SAT Results API

## Prerequisites
- Node.js and npm installed
- Java Development Kit (JDK)
- MySQL Workbenchg

## Setup Instructions

### Frontend (React UI)
1. Clone the repository:
    ```bash
    git clone https://github.com/bhawana2001/SAT-Results.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd project-name/sat_frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the React application:
    ```bash
    npm start
    ```
5. Access the React UI at [http://localhost:3000](http://localhost:3000)

### Backend (Spring Boot)
1. Clone the repository (if not already done):
    ```bash
    git clone https://github.com/bhawana2001/SAT-Results.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd project-name/sat_backend
    ```
3. Open the backend project in your preferred IDE (e.g., IntelliJ IDEA, Eclipse).
4. Run the Spring Boot application.

## Features
1. **Insert Data:** This feature handles input for SAT Results and stores it in memory.
2. **View All Data:** Displays all data from memory.
3. **Get Rank:** Provides the rank of a candidate according to the stored data.
4. **Update Score:** Allows updating SAT score for a candidate by name.
5. **Delete One Record:** Deletes a record by name.
