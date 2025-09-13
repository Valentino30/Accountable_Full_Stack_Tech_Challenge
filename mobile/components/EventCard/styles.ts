import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDisabled: {
    opacity: 0.7,
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#e53935",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  teamContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 4,
    borderRadius: 25,
    backgroundColor: "#eee", // placeholder for logos
  },
  team: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: 70,
  },
  vsContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  vs: {
    fontSize: 16,
    fontWeight: "700",
    color: "#555",
  },
  details: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 4,
  },
  spots: {
    fontSize: 14,
    color: "#388e3c",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "600",
  },
  spotsFull: {
    color: "#e53935",
  },
  button: {
    backgroundColor: "#1a73e8",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
