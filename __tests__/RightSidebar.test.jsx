import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import RightSidebar from "../app/components/sidebar/Right";

// Set up mock adapter for axios
const mock = new MockAdapter(axios);

describe("RightSidebar component", () => {
  const mockUsers = [
    { id: 1, firstName: "John", lastName: "Doe", username: "john_doe", image: "/john.jpg" },
    { id: 2, firstName: "Jane", lastName: "Smith", username: "jane_smith", image: "/jane.jpg" },
    { id: 3, firstName: "Mike", lastName: "Johnson", username: "mike_j", image: "/mike.jpg" },
    { id: 4, firstName: "Anna", lastName: "Davis", username: "anna_d", image: "/anna.jpg" },
  ];

  beforeEach(() => {
    // Reset the mock adapter before each test
    mock.reset();
  });

  it("Fetches users and selects 3 random users to display", async () => {
    // Mock successful response with users
    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/users`).reply(200, { users: mockUsers });

    render(<RightSidebar />);

    // Wait for the users to be fetched and rendered
    await waitFor(() => {
      expect(screen.getAllByRole("img").length).toBe(3); // Expect 3 profile images to be displayed
    });

    // Ensure the names are displayed correctly (since users are randomly selected, we cannot assert exact names)
    const userNames = screen.getAllByText(/@/); // Check for usernames (e.g., "@john_doe")
    expect(userNames.length).toBe(3);

    // Ensure Accept/Reject buttons are displayed for each user
    const actionButtons = screen.getAllByRole("button");
    expect(actionButtons.length).toBe(6); // 3 Accept + 3 Reject buttons
  });

  it("Handles errors gracefully if fetching users fails", async () => {
    // Mock a failed response
    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/users`).reply(500);

    render(<RightSidebar />);

    // Wait for the error handling and no users message
    await waitFor(() => {
      expect(screen.getByText("No users available.")).toBeInTheDocument();
    });
  });
});
