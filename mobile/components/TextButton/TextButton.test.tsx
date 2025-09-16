import { render, fireEvent } from "@testing-library/react-native";
import TextButton from "./TextButton";

describe("TextButton", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("renders the button with the given title", () => {
    const { getByText } = render(<TextButton onPress={mockOnPress} title="Click Me" />);

    const buttonText = getByText("Click Me");
    expect(buttonText).toBeTruthy();
  });

  it("calls onPress when button is pressed", () => {
    const { getByText } = render(<TextButton onPress={mockOnPress} title="Press Me" />);

    const button = getByText("Press Me");
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    const customTextStyle = { color: "white" };

    const { getByText } = render(
      <TextButton onPress={mockOnPress} title="Styled Button" style={customStyle} textStyle={customTextStyle} />
    );

    const buttonText = getByText("Styled Button");
    expect(buttonText.props.style).toEqual(expect.arrayContaining([expect.objectContaining(customTextStyle)]));
  });
});
