# NotesApp - Professional Full Stack Application

A modern, production-ready notes application with Spring Boot backend and React frontend featuring professional UI/UX design.

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login with JWT tokens
- Role-based access control (USER/ADMIN)
- Secure password encryption with BCrypt
- Automatic token refresh and session management

### 📝 Notes Management

- Create, read, update, delete notes with rich text support
- Real-time search and filtering
- Sort by date, title, or relevance
- User-specific note isolation
- Timestamps for creation and updates

### 👤 User Profile Management

- View and edit profile information
- Change password securely
- Delete account functionality
- Role display and management

### 🎨 Modern UI/UX

- **Dark/Light Theme Toggle** - Professional theme switching
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Modern CSS Architecture** - Organized component-based styling
- **Smooth Animations** - Professional transitions and hover effects
- **Glass Morphism Effects** - Modern backdrop blur styling
- **Professional Color Scheme** - GitHub/Discord inspired dark mode
- **Tabbed Navigation** - Intuitive user interface
- **Modal Dialogs** - Clean note editing experience
- **Loading States** - Professional loading indicators

### 🛠️ Admin Panel

- **System Status Monitoring** - Real-time API health checks
- **User Management** - View and manage all users
- **Settings Panel** - Configure application settings
- **Statistics Dashboard** - System metrics and analytics

## 🚀 Technology Stack

### Backend

- **Spring Boot 3.x** - Modern Java framework
- **Spring Security** - JWT authentication & authorization
- **Spring Data JPA** - Database abstraction layer
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management

### Frontend

- **React 19.x** - Latest React with modern hooks
- **Context API** - State management for themes
- **Axios** - HTTP client for API calls
- **Modern CSS** - Component-based styling system
- **Responsive Design** - Mobile-first approach

## 📦 Getting Started

### Prerequisites

- **Java 17+** - Required for Spring Boot 3.x
- **Node.js 16+** - Required for React 19.x
- **Maven** - For backend dependency management

### 🔧 Backend Setup

1. Navigate to project root:

   ```bash
   cd notesApp
   ```

2. Start the Spring Boot application:

   ```bash
   ./mvnw spring-boot:run
   ```

   Or with Maven installed:

   ```bash
   mvn spring-boot:run
   ```

3. Backend will start on **http://localhost:8080**

### 🎨 Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd notesApp/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React application:

   ```bash
   npm start
   ```

4. Frontend will start on **http://localhost:3000**

## 🔌 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Notes Management

- `GET /api/notes?userId={id}` - Get user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/{id}` - Update existing note
- `DELETE /api/notes/{id}` - Delete note

### User Profile

- `GET /me` - Get current user profile
- `PUT /me` - Update user profile
- `DELETE /me` - Delete user account

### Admin (ADMIN role required)

- `GET /admin/users` - Get all users
- `GET /admin/status` - System health check

## 🎯 Usage Guide

### For Regular Users

1. **Register** - Create account with username, email, password
2. **Login** - Sign in with your credentials
3. **Create Notes** - Click "Create Note" to add new notes
4. **Search & Filter** - Use search bar and sort options
5. **Edit Notes** - Click on any note to edit
6. **Profile Management** - Update your profile in Profile tab
7. **Theme Toggle** - Switch between light/dark modes

### For Administrators

1. **Admin Panel** - Access system overview and statistics
2. **User Management** - View and manage all system users
3. **System Status** - Monitor API health and system metrics
4. **Settings** - Configure application-wide settings

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - BCrypt hashing for passwords
- **CORS Configuration** - Secure cross-origin requests
- **Role-Based Access** - USER/ADMIN permission system
- **Token Expiration** - Automatic session management
- **Secure Headers** - Protection against common attacks

## 🗄️ Database

**Development**: H2 in-memory database (data resets on restart)

**H2 Console Access**: http://localhost:8080/h2-console

- JDBC URL: `jdbc:h2:mem:notesdb`
- Username: (empty)
- Password: (empty)

## 🎨 Design System

### Color Palette

- **Light Mode**: Clean whites and grays for professional look
- **Dark Mode**: GitHub/Discord inspired dark theme
- **Accent Colors**: Blue primary, with success/danger variants

### Typography

- **Font**: Inter - Modern, readable sans-serif
- **Hierarchy**: Clear heading and body text distinction
- **Weights**: 400-900 range for proper emphasis

### Components

- **Cards**: Modern with subtle shadows and borders
- **Buttons**: Multiple variants with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Professional tab-based navigation

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop**: Full-featured desktop interface
- **Breakpoints**: 768px, 1024px, 1400px

## 🚀 Production Ready

- **Error Handling**: Comprehensive error management
- **Loading States**: Professional loading indicators
- **Form Validation**: Client and server-side validation
- **Performance**: Optimized React components
- **SEO Ready**: Proper meta tags and structure

## 🔧 Development

- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:3000
- **Proxy**: Configured for seamless API calls
- **Hot Reload**: Instant development feedback
- **Modern Tooling**: Latest React and Spring Boot features

---

**Built with ❤️ using modern web technologies**
