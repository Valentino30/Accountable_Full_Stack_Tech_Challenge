import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <TouchableOpacity onPress={logout} style={styles.button}>
      <Ionicons name="log-out-outline" size={24} color="#e53935" />
    </TouchableOpacity>
  );
};

export default LogoutButton;
