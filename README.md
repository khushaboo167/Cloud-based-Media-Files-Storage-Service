# Cloud-Based Media Files Storage Service

A MERN stack application for storing and managing media files in the cloud using AWS S3.

## Features

- User authentication (register/login)
- File upload to AWS S3
- List uploaded files
- Download files
- Delete files
- Responsive React frontend

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Multer, AWS S3
- **Frontend**: React.js, Axios
- **Authentication**: JWT

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB database (local or cloud like MongoDB Atlas)
- AWS account with S3 bucket configured

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   S3_BUCKET_NAME=your_s3_bucket_name
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```

The frontend will run on http://localhost:3000 and backend on http://localhost:5000.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/files/upload` - Upload a file (requires auth)
- `GET /api/files` - List user's files (requires auth)
- `GET /api/files/download/:id` - Download a file (requires auth)
- `DELETE /api/files/:id` - Delete a file (requires auth)