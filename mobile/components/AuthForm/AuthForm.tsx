import { useState, useRef } from "react";
import { View, TextInput, Text, ActivityIndicator, TouchableOpacity, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Button from "../Button";

interface AuthFormProps {
  title: string;
  loadingTitle: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  isPending: boolean;
  error: unknown;
}

export default function AuthForm({ title, loadingTitle, onSubmit, isPending, error }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputTouched, setInputTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const hasError = (!!error && !inputTouched) || !!localError;

  const handleFocus = () => {
    setInputTouched(true);
    setLocalError(null);
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    setInputTouched(false);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setLocalError("Please enter both email and password.");
      return;
    }

    setLocalError(null);
    await onSubmit(trimmedEmail, trimmedPassword);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        ref={emailRef}
        style={[styles.input, hasError && styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={handleFocus}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          ref={passwordRef}
          style={[styles.input, styles.passwordInput, hasError && styles.inputError]}
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          onFocus={handleFocus}
        />
        <TouchableOpacity
          testID="password-toggle"
          style={styles.iconButton}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#1a73e8" />
        </TouchableOpacity>
      </View>

      {hasError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{localError || "Invalid credentials. Please try again."}</Text>
        </View>
      )}

      <Button title={title} loading={isPending} loadingTitle={loadingTitle} onPress={handleSubmit} />
    </View>
  );
}
