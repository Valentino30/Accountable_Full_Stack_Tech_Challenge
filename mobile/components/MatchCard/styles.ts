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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    marginBottom: spacing.lg,
    ...shadow.md,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  teamContainer: {
    alignItems: 'center',
  },
  logo: {
    width: sizes.logoSize,
    height: sizes.logoSize,
    borderRadius: borderRadius.logoRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
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
  },
  vs: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    color: colors.textPlaceholder,
  },
  details: {
    fontSize: fontSizes.sm,
    color: colors.textPlaceholder,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  spots: {
    fontSize: fontSizes.sm,
    color: colors.success,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: fontWeights.semiBold,
  },
  spotsFull: {
    color: colors.error,
  },
})
