import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth.routes';
import sweetRoutes from './routes/sweet.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS must be configured before routes
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint - API info
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Sweet Shop Management API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      sweets: {
        getAll: 'GET /api/sweets',
        getById: 'GET /api/sweets/:id',
        create: 'POST /api/sweets (requires auth)',
        update: 'PUT /api/sweets/:id (requires auth)',
        delete: 'DELETE /api/sweets/:id (requires admin)',
        search: 'GET /api/sweets/search?q=keyword',
        purchase: 'POST /api/sweets/:id/purchase (requires auth)',
        restock: 'POST /api/sweets/:id/restock (requires admin)'
      }
    },
    frontend: process.env.CORS_ORIGIN || 'http://localhost:5173'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

// Only start server if this file is run directly
if (require.main === module) {
  startServer();
}

export { app, startServer };
