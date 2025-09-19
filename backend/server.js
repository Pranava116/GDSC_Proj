// 1️⃣ Load environment variables at the very top
import dotenv from 'dotenv';
dotenv.config();  // must be before any use of process.env

// 2️⃣ Import your app
import app from './app.js';

// 3️⃣ Read variables from process.env
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;  // make sure the name matches your .env



// 4️⃣ Start server
app.listen(PORT, () => console.log(`Docify backend running on port ${PORT}`));
