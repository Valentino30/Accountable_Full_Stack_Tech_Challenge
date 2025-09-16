import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../hooks/useAuth'
import { colors, sizes } from '../../styles/theme'
import styles from './styles'

const LogoutIconButton = () => {
  const { logout } = useAuth()

  return (
    <TouchableOpacity
      onPress={logout}
      style={styles.button}
      testID="logout-button"
    >
      <Ionicons
        name="log-out-outline"
        size={sizes.iconSize}
        color={colors.error}
      />
    </TouchableOpacity>
  )
}

export default LogoutIconButton
