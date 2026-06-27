# crud-api

A Node.js REST API with full CRUD operations backed by PostgreSQL.

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd crud-api

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and fill in your PostgreSQL credentials

# 4. Run the database migration (creates crud_db and the items table)
node db/migrate.js

# 5. Start the development server
npm run dev
```

The server listens on `http://localhost:3000` by default.

---

## API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/items`      | Get all items      |
| GET    | `/api/items/:id`  | Get item by ID     |
| POST   | `/api/items`      | Create a new item  |
| PUT    | `/api/items/:id`  | Update an item     |
| DELETE | `/api/items/:id`  | Delete an item     |

---

## Example Requests

### Health check
```bash
curl http://localhost:3000/
```

### GET all items
```bash
curl http://localhost:3000/api/items
```

### GET one item
```bash
curl http://localhost:3000/api/items/<uuid>
```

### POST — Create an item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "description": "A powerful laptop"}'
```

### PUT — Update an item
```bash
curl -X PUT http://localhost:3000/api/items/<uuid> \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop Pro", "description": "An even more powerful laptop"}'
```

### DELETE — Remove an item
```bash
curl -X DELETE http://localhost:3000/api/items/<uuid>
```

---

## Example Request Body (POST / PUT)

```json
{
  "name": "Laptop",
  "description": "A powerful laptop"
}
```

## Example Responses

### Success (GET all)
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "a3f1c2d4-...",
      "name": "Laptop",
      "description": "A powerful laptop",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### Error (404)
```json
{
  "success": false,
  "status": 404,
  "message": "Item with id '...' not found"
}
```

---

## Running with Docker

### Prerequisites
- Docker Desktop installed and running

### Start everything (first time)
```bash
docker compose up --build
```

### Start in background
```bash
docker compose up -d --build
```

### View logs
```bash
docker compose logs -f api
docker compose logs -f postgres
```

### Run database migration manually (if needed)
```bash
docker compose exec api node db/migrate.js
```

### Stop containers
```bash
docker compose down
```

### Stop and delete the database volume (full reset)
```bash
docker compose down -v
```

### Rebuild after code changes
```bash
docker compose up --build
```

### Connect to the PostgreSQL container directly
```bash
docker compose exec postgres psql -U postgres -d crud_db
```

### Test the API (same as before — port 3000)
```bash
curl http://localhost:3000/
curl http://localhost:3000/api/items
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"A powerful laptop"}'
```
