// utils/test-utils.ts
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { AuthProvider } from '@/utils/AuthContext';

// Custom render function for components that require AuthProvider and Router
const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  return render(<AuthProvider>{ui}</AuthProvider>, options);
};

export * from '@testing-library/react';
export { renderWithProviders as render };
