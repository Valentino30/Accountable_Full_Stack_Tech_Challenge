import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 50,
  },
  dropdown: {
    marginLeft: 8,
    width: 120,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 0,
  },
  dropdownContainer: {
    borderWidth: 0,
    elevation: 2,
  },
});
