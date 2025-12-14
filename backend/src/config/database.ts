import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// Cloud SQL socket path detection
const isCloudSQL = process.env.DB_HOST?.startsWith('/cloudsql/');

const getDataSourceConfig = () => {
  const baseConfig = {
    type: 'postgres' as const,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || process.env.DB_NAME || 'sweet_shop',
    synchronize: true, // Auto-sync schema
    logging: process.env.NODE_ENV === 'development',
    entities: [__dirname + '/../entities/**/*.{ts,js}'],
    migrations: [__dirname + '/../migrations/**/*.{ts,js}'],
    subscribers: []
  };

  if (isCloudSQL) {
    // Cloud SQL Unix socket connection
    return {
      ...baseConfig,
      host: process.env.DB_HOST, // Unix socket path
      extra: {
        socketPath: process.env.DB_HOST
      }
    };
  }

  // Standard TCP connection
  return {
    ...baseConfig,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
  };
};

export const AppDataSource = new DataSource(getDataSourceConfig());
