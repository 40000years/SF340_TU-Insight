# API Documentation & Testing Guide

## 📋 Complete API Reference

This document provides complete API documentation with examples for testing.

---

## 🔐 Authentication Endpoints

### 1. Register New User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account with email and password.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

**Validation Rules:**
- Email: Must be valid email format
- Password: Minimum 6 characters
- Name: Required, any string

**Success Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
```json
// Email already exists (409 Conflict)
{
  "error": "Email already exists"
}

// Invalid input (400 Bad Request)
{
  "error": "Key: 'User.Email' Error:Field validation for 'Email' failed on the 'required' tag"
}
```

**Example with curl:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Example with JavaScript/Fetch:**
```javascript
const response = await fetch('http://localhost:8080/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe'
  })
});

const data = await response.json();
localStorage.setItem('token', data.token);
```

---

### 2. Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and retrieve JWT token.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Validation Rules:**
- Email: Valid email format required
- Password: Exact match required

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
```json
// Invalid credentials (401 Unauthorized)
{
  "error": "Invalid credentials"
}

// Missing fields (400 Bad Request)
{
  "error": "Key: 'LoginRequest.Email' Error:Field validation..."
}
```

**Example with curl:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' | jq '.'
```

**Token Usage:**
Save the returned token and include in subsequent requests:
```bash
curl -H "Authorization: Bearer eyJhbGc..." \
  http://localhost:8080/api/trends/history
```

---

## 📊 Trend Analysis Endpoints

### 3. Analyze Trend

**Endpoint:** `POST /api/trends/analyze`

**Authorization:** Required (Bearer Token)

**Description:** Submit market parameters for trend analysis.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}
```

**Request Body:**
```json
{
  "category": "Technology",
  "period": "short-term",
  "budget": 75000.00,
  "target_group": "Gen Z"
}
```

**Parameter Explanations:**

| Field | Type | Required | Format | Examples |
|-------|------|----------|--------|----------|
| category | string | Yes | 1-100 chars | "Tech", "Fashion", "Digital Marketing" |
| period | string | Yes | Enum | "short-term", "medium-term", "long-term" |
| budget | number | Yes | float > 0 | 5000, 50000.50, 250000 |
| target_group | string | Yes | 1-100 chars | "Gen Z", "Young Professionals", "Families" |

**Success Response (201 Created):**
```json
{
  "id": 5,
  "trend": "GROWTH",
  "confidence": 0.92,
  "details": "Analysis for Technology market targeting Gen Z over short-term with budget $75000.00. Predicted trend: GROWTH (confidence: 92%). This trend is based on market category characteristics, budget allocation, and target demographic analysis."
}
```

**Trend Analysis Rules:**

| Condition | Trend | Confidence |
|-----------|-------|-----------|
| Budget > $50,000 | GROWTH | 85% |
| Budget < $10,000 | DECLINE | 70% |
| Category contains "Tech" | GROWTH | 90% |
| Category contains "Digital" | GROWTH | 90% |
| Target contains "Gen Z" | GROWTH | 92% |
| Target contains "Young" | GROWTH | 90% |
| Period "Short-term" | +5% boost | - |
| Period "Long-term" | -10% reduction | - |

**Error Responses:**
```json
// Missing authorization (401 Unauthorized)
{
  "error": "Missing authorization header"
}

// Invalid token (401 Unauthorized)
{
  "error": "Invalid token"
}

// Invalid input (400 Bad Request)
{
  "error": "Key: 'TrendRequest.Budget' Error:Field validation..."
}
```

**Example with curl:**
```bash
TOKEN="eyJhbGc..."

curl -X POST http://localhost:8080/api/trends/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "category": "Technology",
    "period": "short-term",
    "budget": 75000,
    "target_group": "Gen Z"
  }' | jq '.'
```

**Example with Axios (JavaScript):**
```javascript
const token = localStorage.getItem('token');

const response = await axios.post(
  'http://localhost:8080/api/trends/analyze',
  {
    category: 'Technology',
    period: 'short-term',
    budget: 75000,
    target_group: 'Gen Z'
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

console.log(response.data); // { id, trend, confidence, details }
```

---

### 4. Get Trend History

**Endpoint:** `GET /api/trends/history`

**Authorization:** Required (Bearer Token)

**Description:** Retrieve all past trend analyses for the authenticated user.

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Query Parameters:** None

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category": "Technology",
    "period": "short-term",
    "budget": 75000,
    "target_group": "Gen Z",
    "trend": "GROWTH",
    "confidence": 0.92,
    "created_at": "2024-01-21T10:30:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "category": "Fashion",
    "period": "medium-term",
    "budget": 35000,
    "target_group": "Professionals",
    "trend": "STABLE",
    "confidence": 0.65,
    "created_at": "2024-01-21T09:15:00Z"
  }
]
```

**Error Responses:**
```json
// No authorization (401 Unauthorized)
{
  "error": "Missing authorization header"
}

// Invalid token (401 Unauthorized)
{
  "error": "Invalid token"
}
```

**Example with curl:**
```bash
TOKEN="eyJhbGc..."

curl -X GET http://localhost:8080/api/trends/history \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

**Example with JavaScript:**
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:8080/api/trends/history', {
  headers: { Authorization: `Bearer ${token}` }
});

const trends = await response.json();
console.log(trends); // Array of trend objects
```

---

### 5. Get Trend by ID

**Endpoint:** `GET /api/trends/:id`

**Authorization:** Required (Bearer Token)

**Description:** Retrieve a specific trend analysis by ID.

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | Trend analysis ID |

**Success Response (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "category": "Technology",
  "period": "short-term",
  "budget": 75000,
  "target_group": "Gen Z",
  "trend": "GROWTH",
  "confidence": 0.92,
  "created_at": "2024-01-21T10:30:00Z"
}
```

**Error Responses:**
```json
// Trend not found (404 Not Found)
{
  "error": "Trend not found"
}

// Unauthorized (401 Unauthorized)
{
  "error": "Invalid token"
}
```

**Example with curl:**
```bash
TOKEN="eyJhbGc..."

curl -X GET http://localhost:8080/api/trends/1 \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## 📈 Dashboard Endpoints

### 6. Get Dashboard Metrics

**Endpoint:** `GET /api/dashboard/metrics`

**Authorization:** Required (Bearer Token)

**Description:** Retrieve aggregated dashboard metrics for the authenticated user.

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Success Response (200 OK):**
```json
{
  "total_analyses": 5,
  "average_trend": "GROWTH",
  "high_confidence": 3,
  "categories": [
    "Technology",
    "Fashion",
    "Digital Marketing",
    "Food & Beverage"
  ],
  "trend_breakdown": {
    "GROWTH": 3,
    "DECLINE": 1,
    "STABLE": 1
  }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| total_analyses | integer | Total number of analyses performed |
| average_trend | string | Most common trend |
| high_confidence | integer | Count of analyses with confidence > 70% |
| categories | array | List of unique categories analyzed |
| trend_breakdown | object | Count of each trend type |

**Example with curl:**
```bash
TOKEN="eyJhbGc..."

curl -X GET http://localhost:8080/api/dashboard/metrics \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

**Use Case - Frontend Dashboard:**
```javascript
async function loadDashboard() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/dashboard/metrics', {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const metrics = await response.json();
  
  // Display metrics
  document.getElementById('totalAnalyses').textContent = metrics.total_analyses;
  document.getElementById('highConfidence').textContent = metrics.high_confidence;
  
  // Create pie chart with trend_breakdown
  createPieChart(metrics.trend_breakdown);
  
  // Create bar chart with categories
  createBarChart(metrics.categories);
}
```

---

### 7. Save Dashboard Widget

**Endpoint:** `POST /api/dashboard/widgets`

**Authorization:** Required (Bearer Token)

**Description:** Save a custom dashboard widget configuration.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}
```

**Request Body:**
```json
{
  "title": "Q1 Tech Market Analysis",
  "type": "chart",
  "data": {
    "chartType": "pie",
    "values": [10, 20, 15],
    "labels": ["GROWTH", "DECLINE", "STABLE"]
  }
}
```

**Parameter Explanations:**

| Field | Type | Required | Values |
|-------|------|----------|--------|
| title | string | Yes | Widget display name |
| type | string | Yes | "chart", "card", "table" |
| data | object | Yes | Chart-specific configuration (JSON serialized) |

**Success Response (201 Created):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Q1 Tech Market Analysis",
  "type": "chart",
  "data": "{\"chartType\":\"pie\",...}",
  "created_at": "2024-01-21T10:30:00Z"
}
```

**Example with curl:**
```bash
TOKEN="eyJhbGc..."

curl -X POST http://localhost:8080/api/dashboard/widgets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Tech Market Trends",
    "type": "chart",
    "data": {
      "chartType": "pie",
      "values": [10, 5, 3],
      "labels": ["GROWTH", "STABLE", "DECLINE"]
    }
  }' | jq '.'
```

---

### 8. Get Dashboard Widgets

**Endpoint:** `GET /api/dashboard/widgets`

**Authorization:** Required (Bearer Token)

**Description:** Retrieve all saved dashboard widgets for the user.

**Request Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Q1 Tech Market Analysis",
    "type": "chart",
    "data": "{\"chartType\":\"pie\",...}",
    "created_at": "2024-01-21T10:30:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "Monthly Performance",
    "type": "table",
    "data": "{\"rows\":[...]}",
    "created_at": "2024-01-21T09:00:00Z"
  }
]
```

**Example with curl:**
```bash
TOKEN="eyJhbGc..."

curl -X GET http://localhost:8080/api/dashboard/widgets \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## 🏥 Health Check

### Health Status

**Endpoint:** `GET /health`

**Authorization:** Not required

**Description:** Check if the server is running.

**Success Response (200 OK):**
```json
{
  "status": "ok"
}
```

**Example:**
```bash
curl http://localhost:8080/health | jq '.'
```

---

## 🧪 Testing Guide

### Using Postman

1. **Create Collection** → "Marketing Trend API"
2. **Create Environment Variables:**
   ```
   base_url = http://localhost:8080
   token = (empty initially)
   ```

3. **Test Endpoints in Order:**

**1. Register**
- Method: POST
- URL: `{{base_url}}/api/auth/register`
- Body (raw JSON):
```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123",
  "name": "Test User"
}
```
- Tests Tab:
```javascript
pm.environment.set("token", pm.response.json().token);
```

**2. Analyze Trend**
- Method: POST
- URL: `{{base_url}}/api/trends/analyze`
- Headers: `Authorization: Bearer {{token}}`
- Body (raw JSON):
```json
{
  "category": "Technology",
  "period": "short-term",
  "budget": 75000,
  "target_group": "Gen Z"
}
```

**3. Get History**
- Method: GET
- URL: `{{base_url}}/api/trends/history`
- Headers: `Authorization: Bearer {{token}}`

---

### Using cURL Script

Create `test-api.sh`:
```bash
#!/bin/bash

BASE_URL="http://localhost:8080"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Marketing Trend API Test ===${NC}\n"

# Register
echo -e "${BLUE}1. Testing Registration...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123",
    "name": "Test User"
  }')

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo -e "${GREEN}✓ User registered${NC}"
echo "Token: ${TOKEN:0:20}..."

# Analyze Trend
echo -e "\n${BLUE}2. Testing Trend Analysis...${NC}"
TREND_RESPONSE=$(curl -s -X POST "$BASE_URL/api/trends/analyze" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "category": "Technology",
    "period": "short-term",
    "budget": 75000,
    "target_group": "Gen Z"
  }')

echo $TREND_RESPONSE | jq '.'
echo -e "${GREEN}✓ Trend analyzed${NC}"

# Get Metrics
echo -e "\n${BLUE}3. Testing Dashboard Metrics...${NC}"
curl -s -X GET "$BASE_URL/api/dashboard/metrics" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo -e "${GREEN}✓ Metrics retrieved${NC}"

# Get History
echo -e "\n${BLUE}4. Testing Trend History...${NC}"
curl -s -X GET "$BASE_URL/api/trends/history" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo -e "${GREEN}✓ History retrieved${NC}"

echo -e "\n${GREEN}=== All Tests Passed ===${NC}"
```

Run with: `bash test-api.sh`

---

## 🔒 Security Considerations

### JWT Token Security
- Tokens expire after 24 hours
- Include in `Authorization: Bearer` header
- Store in `localStorage` (browser) or secure storage
- Never log tokens to console in production

### CORS Policy
- Frontend: `http://localhost:5173`
- Backend: CORS_ORIGIN env variable
- Only allows requests from specified origin

### Password Security
- Minimum 6 characters required
- Hashed with bcrypt (cost factor: 10)
- Never returned to client
- Never logged

---

## 📊 Common Use Cases

### Use Case 1: Dashboard Loading
```javascript
async function initializeDashboard() {
  const token = localStorage.getItem('token');
  
  // Fetch metrics
  const metricsRes = await fetch('/api/dashboard/metrics', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const metrics = await metricsRes.json();
  
  // Fetch history
  const historyRes = await fetch('/api/trends/history', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const history = await historyRes.json();
  
  // Render dashboard
  renderMetrics(metrics);
  renderCharts(metrics.trend_breakdown);
  renderTable(history);
}
```

### Use Case 2: Batch Analysis
```javascript
const analyses = [
  { category: 'Tech', period: 'short-term', budget: 50000, target_group: 'Gen Z' },
  { category: 'Fashion', period: 'medium-term', budget: 30000, target_group: 'Women 25-35' },
  { category: 'Food', period: 'long-term', budget: 75000, target_group: 'Families' }
];

for (const analysis of analyses) {
  const response = await fetch('/api/trends/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(analysis)
  });
  const result = await response.json();
  console.log(`${analysis.category}: ${result.trend}`);
}
```

---

## ✅ Response Codes Summary

| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | Success, use response data |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Check request format and fields |
| 401 | Unauthorized | Token missing or invalid, re-login |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already exists |
| 500 | Server Error | Backend error, try again later |

---

## 📞 Debugging Tips

1. **Check Status Code:** Always verify response status first
2. **Validate Token:** Decode JWT at jwt.io
3. **Check CORS:** Look for CORS errors in browser console
4. **Monitor Network:** DevTools → Network tab
5. **Backend Logs:** Check `go run main.go` output
6. **Database:** Verify data saved in trends.db

---

**API ready to use! Test all endpoints with the provided examples.** ✅
