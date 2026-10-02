# Dry Dock

## Requirements

Make sure the following are installed:

- Node.js
- npm
- MySQL

## Installation

Clone the repository:

```bash
git clone https://github.com/raditama/test_dry_dock.git
cd test_dry_dock
```

### Backend

Navigate to the backend directory and install the dependencies:

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`, then configure the required environment variables.

Run the development server:

```bash
npm run dev
```

### Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file based on `.env.example` and configure:

```env
VITE_API_URL=<backend-api-url>
```

Run the development server:

```bash
npm run dev
```

The frontend will be available at the URL provided by Vite.
