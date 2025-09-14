import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 50,
  },
  dropdown: {
    marginLeft: 8,
    width: 120,
  },
  dropdownStyle: {
    borderWidth: 0,
    elevation: 0,
  },
  dropdownContainer: {
    borderWidth: 0,
    elevation: 2,
  },
});
