import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AuthForm from "../../components/AuthForm";
import TextButton from "../../components/TextButton";
import styles from "./styles";
import { useAuth } from "../../hooks/useAuth";

export default function AuthScreen() {
  const { login, register, isPending, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <AuthForm
            title={isLogin ? "Login" : "Register"}
            loadingTitle={isLogin ? "Logging you in..." : "Registering..."}
            onSubmit={isLogin ? login : register}
            isPending={isPending}
            error={error}
          />

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>

            <TextButton onPress={toggleForm} title={isLogin ? "Register" : "Login"} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
