/**
 * Single Responsibility: Este módulo se encarga exclusivamente de validar
 * y exponer las variables de entorno de forma tipada.
 */

interface EnvConfig {
  apiBaseUrl: string;
  appTitle: string;
  aiEnabled: boolean;
  tasksPerPage: number;
}

function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (value === undefined || value === '') {
    throw new Error(`Variable de entorno "${key}" no está definida. Revisa tu archivo .env`);
  }
  return value;
}

export const env: EnvConfig = {
  apiBaseUrl: 'http://127.0.0.1:8000',
  appTitle: 'AI-Task Master PlanOK',
  aiEnabled: true,
  tasksPerPage: 10,
};