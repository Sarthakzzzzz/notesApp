# Render Deployment Guide

## 🚀 Deploy NotesApp to Render

### Method 1: Using render.yaml (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/notesapp.git
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Click "Apply"

### Method 2: Manual Deployment

#### Backend Deployment:
1. **Create Web Service**:
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - **Name**: `notesapp-backend`
     - **Environment**: `Java`
     - **Build Command**: `./mvnw clean package -DskipTests`
     - **Start Command**: `java -jar target/notesApp-0.0.1-SNAPSHOT.jar`

2. **Environment Variables**:
   ```
   ADMIN_USERNAME=sarthakhello
   JWT_SECRET=your-super-secret-jwt-key-here
   SPRING_PROFILES_ACTIVE=production
   ```

#### Frontend Deployment:
1. **Create Static Site**:
   - Click "New" → "Static Site"
   - Connect same repository
   - Configure:
     - **Name**: `notesapp-frontend`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `build`

### 🔧 Configuration

**Environment Variables to Set:**
- `ADMIN_USERNAME`: Your admin username (default: sarthakhello)
- `JWT_SECRET`: Strong secret key for JWT tokens
- `SPRING_PROFILES_ACTIVE`: Set to "production"

### 🌐 Access Your App

After deployment:
- **Backend**: `https://notesapp-backend.onrender.com`
- **Frontend**: `https://notesapp-frontend.onrender.com`
- **H2 Console**: `https://notesapp-backend.onrender.com/h2-console`

### 📝 Post-Deployment

1. **Test Registration**: Register with your admin username
2. **Verify Admin Access**: Check admin panel visibility
3. **Test Features**: Create notes, test search, theme toggle
4. **Monitor Logs**: Check Render dashboard for any issues

### 🔍 Troubleshooting

**Common Issues:**
- **Build Fails**: Check Java version (should be 17)
- **Database Issues**: Verify persistent disk is mounted
- **CORS Errors**: Update frontend API URL configuration
- **Admin Access**: Ensure ADMIN_USERNAME environment variable is set

### 💡 Tips

- **Free Tier**: Render free tier sleeps after 15 minutes of inactivity
- **Custom Domain**: Add your own domain in Render settings
- **SSL**: Automatic HTTPS on all Render deployments
- **Monitoring**: Use Render's built-in monitoring and logs