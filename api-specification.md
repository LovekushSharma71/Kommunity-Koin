# Kommunity Koin API Specification

## Base URL
```
http://localhost:8000/api/
```

## Authentication
All API endpoints require authentication except for user registration and login. Authentication is handled through JWT tokens.

## API Endpoints

### Communities

#### List Communities
```http
GET /communities/
```
Returns a list of all communities.

**Response**
```json
[
  {
    "id": 1,
    "name": "string",
    "description": "string",
    "creation_date": "datetime",
    "member_count": "integer",
    "total_funds": "decimal",
    "active_loans": "integer"
  }
]
```

#### Create Community
```http
POST /communities/
```
Create a new community.

**Request Body**
```json
{
  "name": "string",
  "description": "string"
}
```

#### Get Community Details
```http
GET /communities/{id}/
```
Get detailed information about a specific community.

### Members

#### Join Community
```http
POST /communities/{id}/join/
```
Join an existing community.

#### List Community Members
```http
GET /communities/{id}/members/
```
Get a list of members in a community.

### Loans

#### List Loans
```http
GET /loans/
```
Get a list of all loans.

**Response**
```json
[
  {
    "id": 1,
    "borrower": {
      "id": 1,
      "username": "string"
    },
    "amount": "decimal",
    "interest_rate": "decimal",
    "term_days": "integer",
    "purpose": "string",
    "status": "string",
    "creation_date": "datetime",
    "community": {
      "id": 1,
      "name": "string"
    }
  }
]
```

#### Create Loan Request
```http
POST /loans/
```
Create a new loan request.

**Request Body**
```json
{
  "amount": "decimal",
  "interest_rate": "decimal",
  "term_days": "integer",
  "purpose": "string",
  "community_id": "integer"
}
```

#### Get Loan Details
```http
GET /loans/{id}/
```
Get detailed information about a specific loan.

### Voting

#### Submit Vote
```http
POST /loans/{id}/vote/
```
Submit a vote for a loan request.

**Request Body**
```json
{
  "vote": "boolean",
  "comment": "string"
}
```

#### Get Loan Votes
```http
GET /loans/{id}/votes/
```
Get all votes for a specific loan.

### Lending Syndicates

#### Create Syndicate
```http
POST /loans/{id}/syndicate/
```
Create a lending syndicate for a loan.

#### Join Syndicate
```http
POST /loans/{id}/syndicate/join/
```
Join an existing lending syndicate.

**Request Body**
```json
{
  "contribution_amount": "decimal"
}
```

## Error Responses

All endpoints can return these error codes:

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error response format:
```json
{
  "error": "string",
  "message": "string",
  "details": {}
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per user.

## Pagination

List endpoints support pagination with the following query parameters:
- `page`: Page number (default: 1)
- `page_size`: Number of items per page (default: 10, max: 100)

Response format for paginated endpoints:
```json
{
  "count": "integer",
  "next": "url",
  "previous": "url",
  "results": []
}
```