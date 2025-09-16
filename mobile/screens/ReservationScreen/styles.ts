import { StyleSheet } from 'react-native'
import { borderRadius, colors, shadow, spacing } from '../../styles/theme'

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  buttonContainer: {
    gap: spacing.sm,
  },
  reservationTag: {
    width: '100%',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.sm,
  },
  reservationTagGreen: {
    backgroundColor: colors.success,
    color: colors.white,
  },
  reservationTagYellow: {
    backgroundColor: colors.warning,
    color: colors.textPrimary,
  },
})

export default styles
