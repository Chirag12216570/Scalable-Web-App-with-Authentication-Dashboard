# API Documentation

Base URL: `http://localhost:5000/api`

---

## Auth

### POST `/auth/register`
- Registers a new user.
- **Body:** `{ username, email, password, name }`
- **Response:** `201 Created` or error

### POST `/auth/login`
- Logs in a user, returns JWT token.
- **Body:** `{ username, password }`
- **Response:** `{ token }`

---

## Profile

### GET `/profile`
- Get current user profile (JWT required)
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ username, email, name, ... }`

### PUT `/profile`
- Update user profile (JWT required)
- **Body:** `{ name, email }`
- **Response:** Updated profile object

---

## Tasks

### GET `/tasks`
- Get all tasks for user (JWT required)
- **Query:** `search` (optional)
- **Response:** `[{ _id, title, description, completed, ... }]`

### POST `/tasks`
- Create a new task (JWT required)
- **Body:** `{ title, description }`
- **Response:** Created task object

### GET `/tasks/:id`
- Get a single task (JWT required)
- **Response:** Task object

### PUT `/tasks/:id`
- Update a task (JWT required)
- **Body:** `{ title, description, completed }`
- **Response:** Updated task object

### DELETE `/tasks/:id`
- Delete a task (JWT required)
- **Response:** `{ message: 'Task deleted.' }`

---

## Security
- All passwords are hashed (bcryptjs)
- JWT required for protected routes
- Error handling for all endpoints

---

## Scaling Notes
- Modular code structure for easy scaling
- Stateless JWT authentication
- MongoDB for scalable data storage
- Can be containerized (Docker) and deployed to cloud
- Frontend-backend integration via REST API

---

## Postman Collection
- Import these endpoints into Postman for testing
- Use JWT token from `/auth/login` for protected requests

---

## Contact
- For assignment submission, see README instructions
