import { StyleSheet } from "react-native";

export default StyleSheet.create({
  formContainer: {
    gap: 8,
    width: "100%",
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    paddingRight: 45,
  },
  iconButton: {
    position: "absolute",
    right: 10,
    top: 13,
  },
  inputError: {
    borderColor: "#e53935",
  },
  errorBox: {
    backgroundColor: "#fdecea",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f5c6cb",
  },
  errorText: {
    color: "#b71c1c",
    textAlign: "center",
    fontWeight: "600",
  },
});
