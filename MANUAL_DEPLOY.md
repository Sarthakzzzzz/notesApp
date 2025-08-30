# 🔧 Manual Deployment (If Blueprint Fails)

## 🚨 If render.yaml Blueprint fails, deploy manually:

### Step 1: Deploy Backend Only

1. **Go to Render Dashboard**
2. **Click "New" → "Web Service"**
3. **Connect GitHub repository**
4. **Configure Backend:**
   - **Name**: `notesapp-backend`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Environment Variables**:
     ```
     ADMIN_USERNAME=sarthakhello
     JWT_SECRET=mySecretJwtKey123456789
     SPRING_PROFILES_ACTIVE=production
     ```

### Step 2: Deploy Frontend Separately

1. **Click "New" → "Static Site"**
2. **Connect same GitHub repository**
3. **Configure Frontend:**
   - **Name**: `notesapp-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### Step 3: Update Frontend API URL

After backend is deployed, update frontend to point to backend URL:

1. **Get backend URL**: `https://notesapp-backend.onrender.com`
2. **Update frontend API calls** to use this URL

### Alternative: Deploy Backend Only

If frontend deployment fails, just deploy the backend:
- **Backend URL**: `https://notesapp-backend.onrender.com`
- **Test endpoints**:
  - `GET /health` - Health check
  - `POST /auth/register` - Register user
  - `POST /auth/login` - Login user

### Quick Test Commands:

```bash
# Test backend health
curl https://notesapp-backend.onrender.com/health

# Register admin user
curl -X POST https://notesapp-backend.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"sarthakhello","password":"admin123","email":"admin@test.com"}'

# Login
curl -X POST https://notesapp-backend.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sarthakhello","password":"admin123"}'
```

**Backend deployment should work with this approach!** 🚀