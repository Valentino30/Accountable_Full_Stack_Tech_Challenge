import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { opacities } from '../../styles/theme'
import styles from './styles'

interface SharedButtonProps {
  title: string
  onPress: () => void
  loading?: boolean
  loadingTitle?: string
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: TextStyle
}

const Button = ({
  title,
  onPress,
  loading = false,
  loadingTitle,
  disabled = false,
  containerStyle,
  textStyle,
}: SharedButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.buttonPrimary,
        (disabled || loading) && styles.buttonDisabled,
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={opacities.active || 0.7}
      disabled={disabled || loading}
    >
      <Text style={[styles.buttonText, styles.buttonTextPrimary, textStyle]}>
        {loading ? loadingTitle || 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
