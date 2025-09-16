import { StyleSheet } from 'react-native'
import {
  borderRadius,
  borders,
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from '../../styles/theme'

export default StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    width: '100%',
  },
  input: {
    borderWidth: borders.width,
    borderColor: colors.borderDark,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
  },
  inputText: {
    fontSize: fontSizes.md,
    color: colors.textPlaceholder,
  },
  clearButton: {
    marginLeft: spacing.sm,
    padding: spacing.sm,
  },
  clearButtonText: {
    color: colors.error,
    fontWeight: fontWeights.semiBold,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
  },
  modalPicker: {
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.md,
  },
  modalButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  modalButtonText: {
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  modalPrimaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  modalPrimaryButtonText: {
    color: colors.white, // Updated to use the correct key
    fontSize: fontSizes.md,
  },
})
