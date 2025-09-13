import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import AuthForm from "../../components/AuthForm";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";

export default function AuthScreen() {
  const { login, register, isPending, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AuthForm
        title={isLogin ? "Login" : "Register"}
        onSubmit={isLogin ? login : register}
        isPending={isPending}
        error={error}
      />

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
        <TouchableOpacity onPress={toggleForm}>
          <Text style={styles.toggleButton}>{isLogin ? "Register" : "Login"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
