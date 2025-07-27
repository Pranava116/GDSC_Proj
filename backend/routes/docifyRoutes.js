import express from 'express';
import { generateDocumentation, downloadFile } from '../controllers/docifyController.js';

const router = express.Router();

router.post('/generate', generateDocumentation);
router.get('/download/:filename', downloadFile);

export default router;
