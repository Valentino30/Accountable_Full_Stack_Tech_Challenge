import { StyleSheet } from 'react-native'
import { colors, fontSizes, spacing } from '../../styles/theme'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.background,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  toggleText: {
    marginRight: spacing.xs,
    fontSize: fontSizes.sm,
    color: colors.textPlaceholder,
  },
})
