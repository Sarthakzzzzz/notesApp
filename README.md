# NotesApp

A full-stack notes application with Spring Boot backend and React frontend.

## Deployment
  ### Frontend   https://notesapp-frontend-r7qt.onrender.com
  ### Backend    https://notesapp-backend-aycb.onrender.com
## Features

- User authentication with JWT
- Create, edit, delete notes
- Search and filter notes
- User profile management
- Admin panel for user management
- Dark/Light theme toggle
- Responsive design

## Tech Stack

**Backend:**
- Spring Boot 3.x
- Spring Security
- H2 Database
- Maven

**Frontend:**
- React 19.x
- Modern CSS
- Context API

## Setup

### Backend
```bash
cd notesApp
./mvnw spring-boot:run
```
Runs on http://localhost:8080

### Frontend
```bash
cd notesApp/frontend
npm install
npm start
```
Runs on http://localhost:3000

## API Endpoints

- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /api/notes?userId={id}` - Get notes
- `POST /api/notes` - Create note
- `PUT /api/notes/{id}` - Update note
- `DELETE /api/notes/{id}` - Delete note
- `GET /me` - Get profile
- `PUT /me` - Update profile

## Database

H2 Console: http://localhost:8080/h2-console
- URL: `jdbc:h2:mem:notesdb`
- Username: (empty)
- Password: (empty)

## Configuration

### Environment Variables
Set these environment variables before running:

```bash
# Required: Admin username (keep this secret!)
export ADMIN_USERNAME=your_secret_admin_username

# Optional: JWT secret (recommended for production)
export JWT_SECRET=your_jwt_secret_key
```

### Windows
```cmd
set ADMIN_USERNAME=your_secret_admin_username
set JWT_SECRET=your_jwt_secret_key
```

## Usage

1. Set environment variables
2. Register/Login (use ADMIN_USERNAME for admin access)
3. Create and manage notes
4. Use search and filters
5. Switch themes
6. Admin users can manage all users
