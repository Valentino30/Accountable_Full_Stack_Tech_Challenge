import { StyleSheet } from 'react-native'
import { borderRadius, borders, colors, spacing } from '../../styles/theme'

export default StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  reservationTag: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: borders.width,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  reservationTagGreen: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    color: colors.white,
  },
  reservationTagYellow: {
    backgroundColor: colors.warning,
    borderColor: colors.warning,
    color: colors.textPrimary,
  },
  reservationTagRed: {
    backgroundColor: colors.error,
    borderColor: colors.error,
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonTopMargin: {
    marginTop: spacing.sm,
  },
})
