import { StyleSheet } from 'react-native'
import {
  borderRadius,
  colors,
  fontWeights,
  sizes,
  spacing,
} from '../../styles/theme'

export default StyleSheet.create({
  formContainer: {
    gap: spacing.sm,
    width: '100%',
    marginVertical: spacing.xl,
  },
  input: {
    height: sizes.inputHeight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.inputPadding,
    backgroundColor: colors.white,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: spacing.extraWidePadding,
  },
  iconButton: {
    position: 'absolute',
    right: spacing.iconOffset,
    top: spacing.componentOffset,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorBox: {
    backgroundColor: colors.errorBackground,
    borderRadius: borderRadius.md,
    padding: spacing.iconOffset,
    borderWidth: 1,
    borderColor: colors.errorBorder,
  },
  errorText: {
    color: colors.errorText,
    textAlign: 'center',
    fontWeight: fontWeights.semiBold,
  },
})
