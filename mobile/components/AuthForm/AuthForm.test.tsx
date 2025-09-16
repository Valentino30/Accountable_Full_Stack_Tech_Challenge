import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AuthForm from "./AuthForm";

describe("AuthForm", () => {
  const mockOnSubmit = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders email and password fields and button", () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthForm title="Login" loadingTitle="Logging in..." onSubmit={mockOnSubmit} isPending={false} error={null} />
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("updates state when typing in inputs", () => {
    const { getByPlaceholderText } = render(
      <AuthForm title="Login" loadingTitle="Logging in..." onSubmit={mockOnSubmit} isPending={false} error={null} />
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, " test@example.com ");
    fireEvent.changeText(passwordInput, " 123456 ");

    expect(emailInput.props.value).toBe(" test@example.com ");
    expect(passwordInput.props.value).toBe(" 123456 ");
  });

  it("shows error if submitting empty fields", async () => {
    const { getByText } = render(
      <AuthForm title="Login" loadingTitle="Logging in..." onSubmit={mockOnSubmit} isPending={false} error={null} />
    );

    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(getByText("Please enter both email and password.")).toBeTruthy();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("calls onSubmit with trimmed values", async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthForm title="Login" loadingTitle="Logging in..." onSubmit={mockOnSubmit} isPending={false} error={null} />
    );

    fireEvent.changeText(getByPlaceholderText("Email"), " test@example.com ");
    fireEvent.changeText(getByPlaceholderText("Password"), " 123456 ");

    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith("test@example.com", "123456");
    });
  });

  it("toggles password visibility when icon is pressed", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AuthForm title="Login" loadingTitle="Logging in..." onSubmit={mockOnSubmit} isPending={false} error={null} />
    );

    const passwordInput = getByPlaceholderText("Password");
    const toggleButton = getByTestId("password-toggle");

    expect(passwordInput.props.secureTextEntry).toBe(true);

    fireEvent.press(toggleButton);

    expect(passwordInput.props.secureTextEntry).toBe(false);

    fireEvent.press(toggleButton);

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("displays global error if provided", () => {
    const { getByText } = render(
      <AuthForm
        title="Login"
        loadingTitle="Logging in..."
        onSubmit={mockOnSubmit}
        isPending={false}
        error="Server error"
      />
    );

    expect(getByText("Invalid credentials. Please try again.")).toBeTruthy();
  });

  it("shows loading state in button when isPending=true", () => {
    const { getByText } = render(
      <AuthForm title="Login" loadingTitle="Logging in..." onSubmit={mockOnSubmit} isPending={true} error={null} />
    );

    expect(getByText("Logging in...")).toBeTruthy();
  });
});
