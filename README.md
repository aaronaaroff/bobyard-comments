# Bobyard Comments

A comment system built with Django REST Framework (backend) and React (frontend).

## Prerequisites

- Python 3.10+
- PostgreSQL
- Node.js 18+

## Backend Setup

```bash
cd backend

# create and activate virtual environment (requires Python 3.10+)
python3.12 -m venv venv
source venv/bin/activate

# install dependencies
pip install -r requirements.txt

# create the database
createdb bobyard_comments

# run migrations
python manage.py migrate

# seed the database with comments
python manage.py seed_comments

# start the server
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/comments/`.


## Frontend Setup

```bash
cd frontend

# install dependencies
npm install

# start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

Make sure the backend is running before starting the frontend.

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/comments/` | List all comments |
| POST | `/api/comments/` | Create a comment |
| GET | `/api/comments/:id/` | Get a single comment |
| PATCH | `/api/comments/:id/` | Update comment text |
| DELETE | `/api/comments/:id/` | Delete a comment |
