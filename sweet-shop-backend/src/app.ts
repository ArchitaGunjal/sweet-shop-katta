import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes'; // Import routes
import sweetsRoutes from './routes/sweets.routes';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount Auth Routes
app.use('/api/auth', authRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes); // Add this line