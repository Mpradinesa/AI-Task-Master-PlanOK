import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

async function bootstrap() {
  // Comentamos esto para que deje de usar el simulador (MSW)
  /*
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  */

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();