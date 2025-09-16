import { TextStyle } from 'react-native'

type FontWeight = TextStyle['fontWeight']

export const colors = {
  primary: '#4682B4',
  secondary: '#FFC107',
  background: '#f5f5f5',
  textPrimary: '#333333',
  textSecondary: '#666666',
  textPlaceholder: '#555',
  white: '#FFFFFF',
  red: '#e53935',
  green: '#4CAF50',
  border: '#ccc',
  borderDark: '#ddd',
  success: '#4CAF50',
  error: '#e53935',
  warning: '#FFC107',
  errorBackground: '#fdecea',
  errorBorder: '#f5c6cb',
  errorText: '#b71c1c',
  overlay: 'rgba(0,0,0,0.4)',
  borderLight: '#aaa',
}

export const spacing = {
  // Base scale
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  // New semantic values
  inputPadding: 15,
  iconOffset: 10,
  componentOffset: 13,
  // A very large offset for specific cases
  extraWidePadding: 45,
}

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 48,
}

export const fontWeights: Record<string, FontWeight> = {
  light: '400',
  regular: '500',
  semiBold: '600',
  bold: '700',
}

export const sizes = {
  inputHeight: 50,
  logoSize: 50,
  maxWidth: 70,
  versusWidth: 40,
  dropdownWidth: 120,
  iconSize: 24,
}

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 14,
  logoRadius: 25,
}

export const borders = {
  width: 1,
}

export const opacities = {
  disabled: 0.7,
  active: 0.8,
}

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
}
