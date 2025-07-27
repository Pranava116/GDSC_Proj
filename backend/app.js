import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import docifyRoutes from './routes/docifyRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/docify', docifyRoutes);
app.use('/api/docify/download', express.static(path.join(__dirname, 'exports')));

export default app;
