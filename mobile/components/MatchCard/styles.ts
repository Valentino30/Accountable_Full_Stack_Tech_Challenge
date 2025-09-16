import { StyleSheet } from 'react-native'
import {
  borderRadius,
  colors,
  fontSizes,
  fontWeights,
  shadow,
  sizes,
  spacing,
} from '../../styles/theme'

export default StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.md,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  teamContainer: {
    alignItems: 'center',
    width: '33%',
  },
  logo: {
    width: sizes.logoSize,
    height: sizes.logoSize,
    borderRadius: borderRadius.logoRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderDark,
  },
  logoText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
  },
  team: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    maxWidth: sizes.maxWidth,
  },
  vsContainer: {
    width: sizes.versusWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  vs: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    color: colors.textPlaceholder,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  details: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary, // Changed color for better visibility
    textAlign: 'center',
  },
  spots: {
    fontSize: fontSizes.md, // Increased font size
    color: colors.success,
    fontWeight: fontWeights.semiBold,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  spotsFull: {
    color: colors.error,
  },
  buttonFullWidth: {
    width: '100%',
  },
})
