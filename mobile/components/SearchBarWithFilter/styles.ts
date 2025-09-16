import { StyleSheet } from 'react-native'
import {
  borderRadius,
  borders,
  colors,
  shadow,
  sizes,
  spacing,
} from '../../styles/theme'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: borders.width,
    borderColor: colors.borderDark,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    height: sizes.inputHeight,
  },
  dropdown: {
    marginLeft: spacing.sm,
    width: sizes.dropdownWidth,
  },
  dropdownStyle: {
    borderWidth: borders.width,
    borderColor: colors.borderDark,
    ...shadow.sm,
  },
  dropdownContainer: {
    borderWidth: 0,
    elevation: 2,
  },
})
