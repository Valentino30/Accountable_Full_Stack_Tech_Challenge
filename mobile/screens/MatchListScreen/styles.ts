import { StyleSheet } from 'react-native'
import { borderRadius, colors, fontSizes, fontWeights, shadow, spacing } from '../../styles/theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.xxs,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xxs,
  },
  emptyCard: {
    backgroundColor: colors.white,
    padding: spacing.xxl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadow.md,
  },
  emptyEmoji: {
    fontSize: fontSizes.xxl,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
})
