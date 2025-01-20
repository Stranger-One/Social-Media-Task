## Endpoints

### Admin Endpoints

#### 1. Admin Signup
- **URL**: `/admin/signup`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "name": "Admin Name",
        "email": "admin@example.com",
        "password": "securepassword"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "success": true,
            "message": "Admin created successfully",
            "admin": { /* admin object */ },
            "token": "jwt_token_here"
        }
        ```
    - **Error**:
        ```json
        {
            "success": false,
            "message": "Admin already exists"
        }
        ```

#### 2. Admin Login
- **URL**: `/admin/login`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "email": "admin@example.com",
        "password": "securepassword"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "success": true,
            "message": "Login successful",
            "token": "jwt_token_here"
        }
        ```
    - **Error**:
        ```json
        {
            "success": false,
            "message": "Invalid credentials"
        }
        ```

### Media Endpoints

#### 1. Upload Media
- **URL**: `/media/upload`
- **Method**: `POST`
- **Request Body**: Form data with fields:
    - `name`: String
    - `socialMediaHandle`: String
    - `files`: Array of files
- **Response**:
    - **Success**:
        ```json
        {
            "success": true,
            "message": "Files uploaded successfully and new media created",
            "data": { /* media object */ }
        }
        ```
    - **Error**:
        ```json
        {
            "success": false,
            "message": "No files uploaded"
        }
        ```

#### 2. Get All Media
- **URL**: `/media/get-all`
- **Method**: `GET`
- **Response**:
    - **Success**:
        ```json
        {
            "success": true,
            "message": "Media retrieval successful",
            "media": [ /* array of media objects */ ]
        }
        ```
    - **Error**:
        ```json
        {
            "success": false,
            "message": "Error retrieving media"
        }
        ```

#### 3. Get Media by ID
- **URL**: `/media/:id`
- **Method**: `GET`
- **Response**:
    - **Success**:
        ```json
        {
            "success": true,
            "message": "Media retrieved successfully",
            "data": { /* media object */ }
        }
        ```
    - **Error**:
        ```json
        {
            "success": false,
            "message": "Media Not Found"
        }
        ```

### Middleware

#### Admin Check Middleware
- **Purpose**: To verify if the user is an admin or superadmin.
- **Usage**: Attach to routes that require admin access.
- **Response on Unauthorized**:
    ```json
    {
        "success": false,
        "message": "Unauthorized: No token provided"
    }
    ```

### Example Usage
To use the admin check middleware, you can attach it to your routes like this:
```javascript
import { adminCheck } from './middlewares/AdminCheck.js';

app.post('/admin/some-protected-route', adminCheck, (req, res) => {
    // Your protected route logic here
});
```

### Conclusion
This documentation provides a clear overview of the API endpoints and middleware, including request and response formats.