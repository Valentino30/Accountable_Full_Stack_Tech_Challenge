import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import styles from "./styles";

interface SharedButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
}

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  containerStyle,
  textStyle,
  backgroundColor = "#6200ee",
  textColor = "#fff",
}: SharedButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? "#ccc" : backgroundColor }, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{loading ? "Loading..." : title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
