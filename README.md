# Dietly Frontend

Frontend for the Dietly application, a web application that helps users record meals, monitor their weight, and view weight progress predictions.

The frontend is built using React and Vite and communicates with the Dietly backend through REST APIs.

## Tech Stack

React
Vite
React Router
Axios
ESLint
CSS

## Requirements

Before running the frontend, make sure the following are installed or available:

Git
Node.js
npm
Access to the Dietly frontend repository
A running Dietly backend

The backend and frontend should run on the same computer for local development.

## 1. Clone Repository

Clone the Dietly frontend repository:

```bash

git clone https://github.com/bagasuy/dietly-frontend.git

```

Enter the project directory:

```bash

cd dietly-frontend

```

Make sure package.json is available:

```bash

ls

```

Example project structure:

```text

dietly-frontend/

├── package.json

├── src/

├── public/

└── ...

```

## 2. Install Dependencies

Install all required frontend dependencies:

```bash

npm install

```

This command reads package.json and installs the dependencies required by the Dietly frontend.

## 3. Configure Environment Variables

The frontend uses a .env file to configure the backend API base URL.

Create a .env file in the project root, in the same directory as package.json.

Example structure:

```text

dietly-frontend/

├── .env

├── package.json

├── src/

└── ...

```

Add the following configuration:

```env

VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1

```

VITE_API_BASE_URL is used as the base URL for API requests from the frontend to the backend.

Never commit the .env file to Git.

## 4. Make Sure the Backend Is Running

The Dietly frontend requires the backend to be running for features that communicate with the API.

The backend should be available at:

```text

http://127.0.0.1:8000/

```

API base URL:

```text

http://127.0.0.1:8000/api/v1/

```

If the backend is not running, the following features will not work properly:

Registration
Login
Profile
Meal tracking
Weight tracking
Prediction

For backend setup instructions, see the Dietly Backend Repository.

## 5. Run Frontend

After installing the dependencies and configuring the environment variable, start the Vite development server:

```bash

npm run dev

```

Vite usually starts the frontend at:

```text

http://localhost:5173/

```

Open the displayed address in a web browser.

## 6. Run the Full Application

Because the backend and frontend are maintained in separate repositories, they must be run separately.

### Terminal 1 — Backend

Enter the backend repository:

```bash

cd dietly-backend

```

Activate the virtual environment according to your operating system and backend setup.

Then run:

```bash

python manage.py runserver

```

Backend:

```text

http://127.0.0.1:8000/

```

### Terminal 2 — Frontend

Open a new terminal.

Enter the frontend repository:

```bash

cd dietly-frontend

```

Run:

```bash

npm run dev

```

Frontend:

```text

http://localhost:5173/

```

After both servers are running, open:

```text

http://localhost:5173/

```

in a web browser.

## Main Features

Dietly Frontend provides the following main pages and features.

### Public Pages

Landing Page
Login
Register

### Authenticated Pages

Dashboard
Tracker
Profile

## Dashboard

The Dashboard provides an overview of the user's nutrition data and progress.

The Dashboard displays:

Total calories
Current weight
Weight progress
Prediction
Recent meals

The Dashboard allows users to monitor their nutrition data and progress from a single page.

## Tracker

The Tracker is used to record and monitor the user's nutrition data.

Available features include:

Record meals
View meal history
Record weight
View weight progress
Generate predictions
View prediction results

## Profile

The Profile page allows users to view and update their personal nutrition information.

The following data can be updated:

Height
Current weight
Target weight
Daily calorie goal

Username and email are displayed as account information and cannot be edited from the profile page.

## API Communication

The frontend uses Axios to communicate with the Dietly backend through REST APIs.

API services are separated by feature:

```text

src/

└── services/

├── api.js

├── auth.js

├── diet.js

└── prediction.js

```

### Authentication

The authentication service handles:

User registration
User login
Get current user
Update current user
User logout

### Diet

The diet service handles:

Get diet entries
Create diet entry
Update diet entry
Delete diet entry
Get weight history
Create weight history

### Prediction

The prediction service handles:

Get prediction history
Create prediction

## Project Structure

The main frontend project structure is:

```text

dietly-frontend/

├── public/

│

├── src/

│ ├── components/

│ │ ├── dashboard/

│ │ └── tracker/

│ │

│ ├── pages/

│ │ ├── Dashboard.jsx

│ │ ├── Landing.jsx

│ │ ├── Login.jsx

│ │ ├── Profile.jsx

│ │ ├── Register.jsx

│ │ └── Tracker.jsx

│ │

│ ├── services/

│ │ ├── api.js

│ │ ├── auth.js

│ │ ├── diet.js

│ │ └── prediction.js

│ │

│ ├── App.jsx

│ ├── App.css

│ └── main.jsx

│

├── .gitignore

├── package.json

├── package-lock.json

└── README.md

```

The .env file is created locally and is intentionally excluded from the repository.

## Available Scripts

### Development

Start the Vite development server:

```bash

npm run dev

```

### Lint

Run ESLint to check the code:

```bash

npm run lint

```

### Production Build

Create a production build using Vite:

```bash

npm run build

```

A successful production build generates the dist/ directory.

## Development Notes

The Dietly frontend and backend are developed and maintained as two separate repositories.

```text

Dietly

├── dietly-frontend

│ └── React + Vite

│

└── dietly-backend

└── Django + Django REST Framework

```

The frontend is responsible for:

User interface
User interaction
Client-side routing
API communication
Displaying data received from the backend

The backend is responsible for:

REST APIs
Authentication
Database operations
Business logic
Prediction API

The application communication flow is:

```text

User

↓

React Frontend

↓

Axios

↓

Django REST API

↓

PostgreSQL

```

## Repository

### Frontend

https://github.com/bagasuy/dietly-frontend

### Backend

https://github.com/bagasuy/dietly-backend

## Backend Documentation

For backend setup instructions, database configuration, API endpoints, and backend development information, see:

https://github.com/bagasuy/dietly-backend
