# SmartLeads API Documentation

Base URL (local): http://localhost:5000/api
Base URL (prod): https://<your-backend-domain>/api

All requests and responses use JSON unless noted. Authenticated endpoints require the header:

Authorization: Bearer <JWT_TOKEN>

---

## Auth

### Register
POST /auth/register

Body:
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "secret123",
  "role": "sales"
}
```

Success (201):
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "<id>",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "role": "sales"
    }
  }
}
```

### Login
POST /auth/login

Body:
```json
{
  "email": "rahul@example.com",
  "password": "secret123"
}
```

Success (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "<id>",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "role": "sales"
    }
  }
}
```

---

## Leads

### List Leads
GET /leads

Query params (optional):
- status: New | Contacted | Qualified | Lost
- source: Website | Instagram | Referral
- search: any string (matches name or email)
- sort: latest | oldest
- page: number (default 1)

Example:
GET /leads?status=Qualified&source=Instagram&search=rahul&sort=oldest&page=2

Success (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "<id>",
      "name": "Rahul",
      "email": "rahul@example.com",
      "status": "Qualified",
      "source": "Instagram",
      "createdAt": "2026-05-18T00:00:00.000Z",
      "updatedAt": "2026-05-18T00:00:00.000Z"
    }
  ],
  "page": 2,
  "totalPages": 5,
  "total": 48,
  "limit": 10
}
```

### Get Lead by ID
GET /leads/:id

Success (200):
```json
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {
    "_id": "<id>",
    "name": "Rahul",
    "email": "rahul@example.com",
    "status": "Qualified",
    "source": "Instagram",
    "createdAt": "2026-05-18T00:00:00.000Z",
    "updatedAt": "2026-05-18T00:00:00.000Z"
  }
}
```

### Create Lead (Admin only)
POST /leads

Body:
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Website"
}
```

Success (201):
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "<id>",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "New",
    "source": "Website",
    "createdAt": "2026-05-18T00:00:00.000Z",
    "updatedAt": "2026-05-18T00:00:00.000Z"
  }
}
```

### Update Lead (Admin only)
PUT /leads/:id

Body (partial allowed):
```json
{
  "status": "Contacted"
}
```

Success (200):
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "_id": "<id>",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "status": "Contacted",
    "source": "Website",
    "createdAt": "2026-05-18T00:00:00.000Z",
    "updatedAt": "2026-05-18T00:00:00.000Z"
  }
}
```

### Delete Lead (Admin only)
DELETE /leads/:id

Success (200):
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

### Export Leads CSV (Admin only)
GET /leads/export/csv

Query params (optional): same as list endpoint

Response: text/csv file download

---

## Errors

Common error shapes:

```json
{
  "success": false,
  "message": "Validation failed"
}
```

```json
{
  "success": false,
  "message": "Invalid or expired token."
}
```
