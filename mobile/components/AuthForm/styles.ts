import { StyleSheet } from "react-native";

export default StyleSheet.create({
  formContainer: {
    width: "100%",
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 8,
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f5c6cb",
  },
  errorText: {
    color: "#b71c1c",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 4,
  },
  suggestionList: {
    marginTop: 4,
  },
  suggestionText: {
    color: "#b71c1c",
    fontSize: 13,
    textAlign: "center",
  },
});
