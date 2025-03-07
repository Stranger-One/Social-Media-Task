import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import MediaRouter from './routers/MediaRouter.js'
import AdminRouter from './routers/AdminRouter.js'

dotenv.config();

const app = express();

 // Start of Selection
// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true // Allow credentials to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/media', MediaRouter)
app.use('/api/admin', AdminRouter)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
