import { StyleSheet } from 'react-native'
import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  opacities,
  spacing,
} from '../../styles/theme'

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    opacity: opacities.disabled,
  },
  buttonText: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.md,
  },
  buttonTextPrimary: {
    color: colors.white,
  },
})

export default styles
