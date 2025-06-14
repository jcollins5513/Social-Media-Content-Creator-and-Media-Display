interface EnvConfig {
  apiBaseUrl: string;
  env: 'development' | 'production' | 'test';
}

const config: EnvConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  env: (import.meta.env.VITE_ENV as 'development' | 'production' | 'test') || 'development',
};

export default config;
