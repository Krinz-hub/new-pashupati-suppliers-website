import { app } from './expressApp.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 New Pashupati REST API running on http://localhost:${PORT}`);
});
