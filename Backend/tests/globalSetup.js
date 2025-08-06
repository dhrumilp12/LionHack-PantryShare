import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function globalSetup() {
  // Load test environment variables
  const envPath = path.join(__dirname, '..', '.env.test');
  dotenv.config({ path: envPath });
  
  // Fallback to main .env if test env doesn't exist
  if (!process.env.FIREBASE_PROJECT_ID) {
    const mainEnvPath = path.join(__dirname, '..', '.env');
    dotenv.config({ path: mainEnvPath });
  }

  console.log('🧪 Test environment setup complete');
}
