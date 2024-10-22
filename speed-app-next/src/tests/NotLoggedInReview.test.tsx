import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils'; // Custom render function with AuthProvider
import ReviewUnapprovedArticles from '@/app/articles/review/page';
import { vi } from 'vitest';

// Mock next/navigation methods: useRouter
vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(), // Mock the push function
      replace: vi.fn(),
      prefetch: vi.fn(),
      pathname: '/articles/review', // Mock the pathname
    })),
  };
});

// Mock the authentication context (for a logged-out user)
vi.mock('@/utils/AuthContext', () => ({
  useAuth: () => ({
    isLoggedIn: false, // Simulate the user is logged out
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock AuthProvider
}));

describe('Access Control for ReviewUnapprovedArticles Page', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  test('displays login message when user is not logged in', () => {
    render(<ReviewUnapprovedArticles />);

    // Check that the login prompt is displayed
    expect(screen.getByText('Please login to view this page')).toBeInTheDocument();
    
    // Ensure no articles are displayed
    expect(screen.queryByText('Unapproved Articles')).not.toBeInTheDocument();
  });
});
