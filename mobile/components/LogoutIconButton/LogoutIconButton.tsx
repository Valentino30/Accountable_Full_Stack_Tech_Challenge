import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../hooks/useAuth'
import styles from './styles'

const LogoutIconButton = () => {
  const { logout } = useAuth()

  return (
    <TouchableOpacity
      onPress={logout}
      style={styles.button}
      testID="logout-button"
    >
      <Ionicons name="log-out-outline" size={24} color="#e53935" />
    </TouchableOpacity>
  )
}

export default LogoutIconButton
