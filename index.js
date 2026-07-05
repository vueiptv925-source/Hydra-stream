import express from 'express';
import cors from 'cors';
import { getStreams } from './src/cache.js';
import { circuitBreaker } from './src/circuitBreaker.js';
import { healthMonitor } from './src/healthMonitor.js';
import { errorLogger } from './src/errorLogger.js';

const app = express();
app.use(cors());
app.use(express.json());

// ... نقاط النهاية (Endpoints)

// بدء مراقبة الصحة
healthMonitor.startMonitoring();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ HydraStream running on port ${PORT}`));
