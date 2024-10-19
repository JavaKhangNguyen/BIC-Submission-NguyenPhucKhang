import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CommentCard from '../app/components/comments/CommentCard';

// Mock Axios
const mockAxios = new MockAdapter(axios);

describe('CommentCard Component', () => {
  it('display the comment and fetch user image', async () => {
    const comment = {
      id: 1,
      body: 'This is a test comment',
      user: {
        id: 1
      },
    };

    // Mock API response for user image
    mockAxios.onGet(`${process.env.NEXT_PUBLIC_API_URL}/users/1`).reply(200, {
      image: 'https://dummyjson.com/icon/emilys/128',
    });

    render(<CommentCard comment={comment} />);

    // Check if the comment body is rendered
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();

    // Wait for the user image to be fetched and rendered
    await waitFor(() => {
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://dummyjson.com/icon/emilys/128');
    });
  });
});