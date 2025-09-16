import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    padding: 12,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  vsContainer: {
    marginHorizontal: 8,
  },
  vs: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  team: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  spots: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatSelectorContainer: {
    marginVertical: 16,
  },
  buttonContainer: {
    gap: 8,
  },
  reserveButton: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#6200ee',
  },

  // Reservation tags
  reservationTag: {
    width: '100%',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reservationTagText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  reservationTagGreen: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  reservationTagYellow: {
    backgroundColor: '#FFC107',
    color: '#000',
  },
})

export default styles
