# RacketTracker

RacketTracker is a full-stack app for tracking tennis racket offers from multiple stores. The backend is a Flask API that stores product and price data, and the frontend is a React + Vite app that consumes that API.

## Project structure

- `backend/app`: Flask API, database models, translation files, and scraper entrypoints
- `frontend`: React + Vite client
- `scheduler`: optional APScheduler job that triggers the scraper periodically

## Prerequisites

- Python 3.10+
- Node.js 18+ and npm

## Backend setup (Flask)

1. Create a virtual environment inside `backend`:

   ```bash
   cd /home/runner/work/RacketTracker/RacketTracker/backend
   python -m venv .venv
   ```

2. Activate the virtual environment:

   ```bash
   # macOS / Linux
   source .venv/bin/activate

   # Windows
   .venv\Scripts\activate
   ```

3. Install the Python dependencies:

   ```bash
   pip install -r app/requirements.txt
   ```

4. Copy `backend/.env.example` to `backend/.env`.

5. Update `.env` as needed:

- `SQLALCHEMY_DATABASE_URI`: database connection string used by Flask SQLAlchemy
- `BROWSER_ARGUMENT`: Chrome profile path used by the scraper; only needed if you want to run the scraper or scheduler

6. Start the Flask API:

   ```bash
   cd /home/runner/work/RacketTracker/RacketTracker/backend/app
   python app.py
   ```

The API runs on `http://127.0.0.1:5000` by default and creates the database tables on startup.

## Frontend setup (React + Vite)

1. Install frontend dependencies:

   ```bash
   cd /home/runner/work/RacketTracker/RacketTracker/frontend
   npm install
   ```

2. Copy `frontend/.env.example` to `frontend/.env`.

3. Confirm the frontend environment values:

- `VITE_API_PATH=http://127.0.0.1:5000/products`
- `VITE_TRANSLATIONS_PATH=http://127.0.0.1:5000/locales/{{lng}}/{{ns}}.json`

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

The frontend will usually be available at `http://127.0.0.1:5173`.

## Running the app locally

1. Start the Flask backend
2. Start the React frontend
3. Open the frontend URL shown by Vite in your browser

## Optional: run the scraper

With the backend running, you can trigger the scraper through the API:

```bash
curl -X POST http://127.0.0.1:5000/run-scraper
```

The optional scheduler in `scheduler/scheduler.py` also calls that endpoint and expects the backend to be running locally.
