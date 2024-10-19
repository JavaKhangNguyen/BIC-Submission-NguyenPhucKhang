import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useAuthStore } from '../app/store/useAuthStore';
import CommentBox from '../app/components/comments/CommentBox';

// Mock Axios
const mockAxios = new MockAdapter(axios);

// Mock Auth Store
vi.mock('../app/store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('CommentBox Component', () => {
  beforeEach(() => {
    useAuthStore.mockReturnValue({
      authUser: { id: 1 },
      setAuthUser: vi.fn(),
    });

    mockAxios.onGet(`${process.env.NEXT_PUBLIC_API_URL}/users/20`).reply(200, { id: 1 });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('Test a comment upload', async () => {
    const handleNewComment = vi.fn();

    // Mock POST request
    mockAxios.onPost(`${process.env.NEXT_PUBLIC_API_URL}/comments/add`).reply(200, {
      body: 'Test comment',
      postId: 1,
      userId: 1,
    });

    render(<CommentBox postId={1} onNewComment={handleNewComment} />);

    const textarea = screen.getByPlaceholderText('Write a comment...');
    const button = screen.getByRole('button');

    // Simulate user typing a comment
    fireEvent.change(textarea, { target: { value: 'Test comment' } });

    // Simulate user submitting the comment
    fireEvent.click(button);

    // Wait for the API call and state update
    await waitFor(() => {
      expect(handleNewComment).toHaveBeenCalledWith({
        body: 'Test comment',
        postId: 1,
        userId: 1,
      });
    });

    // Check that the textarea is cleared after submission
    expect(textarea).toHaveValue('');
  });
});