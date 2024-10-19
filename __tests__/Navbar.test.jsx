import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Navbar from '../app/components/navbar/Navbar';
import { useUser, useClerk } from '@clerk/nextjs';

// Mock Axios
const mockAxios = new MockAdapter(axios);

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  useUser: vi.fn(),
  useClerk: vi.fn(),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    useUser.mockReturnValue({
      user: { imageUrl: 'https://dummyjson.com/icon/emilys/128', firstName: 'Emily', lastName: 'Johnson' },
    });

    useClerk.mockReturnValue({
      signOut: vi.fn(),
      openUserProfile: vi.fn(),
    });

    mockAxios.onGet('https://dummyjson.com/posts/search?q=test').reply(200, {
      posts: [{ id: 1, title: 'Test Post', body: 'This is a test post' }],
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Call signOut once when the log out button is clicked', () => {
    const signOutMock = useClerk().signOut;
    render(<Navbar selectedFilter="" onFilterSelect={() => {}} onSearchResults={() => {}} />);

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

    expect(signOutMock).toHaveBeenCalledTimes(1);
  });

  it('Handle search input and clear correctly', async () => {
    const handleSearchResults = vi.fn();
    render(<Navbar selectedFilter="" onFilterSelect={() => {}} onSearchResults={handleSearchResults} />);

    const input = screen.getByTestId('search-input');
    
    // Simulate entering a search term
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(handleSearchResults).toHaveBeenCalledWith([{ id: 1, title: 'Test Post', body: 'This is a test post' }]);
    });

    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    expect(handleSearchResults).toHaveBeenCalledWith([]);
  });
});