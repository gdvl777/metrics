import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component without errors', () => {
  render(<App />);
});

// Puedes escribir más pruebas para verificar el comportamiento específico de tu componente, como la existencia de ciertos elementos.
