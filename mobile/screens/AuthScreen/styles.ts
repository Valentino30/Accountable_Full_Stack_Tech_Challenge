import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  toggleText: {
    marginRight: 5,
    fontSize: 14,
    color: "#555",
  },
  toggleButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a73e8",
  },
});
