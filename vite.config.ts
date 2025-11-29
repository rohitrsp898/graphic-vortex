import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    const env = loadEnv(mode, '.', '');

    // Create an object with process.env.KEY for all keys in env
    const processEnvValues: Record<string, string> = {
        'process.env.API_KEY': JSON.stringify(env.API_KEY || env.GEMINI_API_KEY),
    };

    // Add all VITE_ keys to process.env so they can be accessed safely
    for (const key in env) {
        if (key.startsWith('VITE_')) {
            processEnvValues[`process.env.${key}`] = JSON.stringify(env[key]);
        }
    }

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: processEnvValues,
    };
});