import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LogoutIconButton from "./LogoutIconButton";

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("LogoutIconButton", () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    require("../../hooks/useAuth").useAuth.mockReturnValue({
      logout: mockLogout,
    });
  });

  it("renders the logout icon button", () => {
    const { getByTestId } = render(<LogoutIconButton />);
    const button = getByTestId("logout-button");
    expect(button).toBeTruthy();
  });

  it("calls logout when pressed", () => {
    const { getByTestId } = render(<LogoutIconButton />);
    const button = getByTestId("logout-button");

    fireEvent.press(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
