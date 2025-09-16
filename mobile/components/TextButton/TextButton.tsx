import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import styles from './styles'

interface TextButtonProps {
  onPress: () => void
  title: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export default function TextButton({
  onPress,
  title,
  style,
  textStyle,
}: TextButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={[styles.toggleButton, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}
