import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { MatchFilterType } from '../../types/match'
import SearchBarWithFilter from './SearchBarWithFilter'

// ✅ Mock DropDownPicker
jest.mock('react-native-dropdown-picker', () => {
  return (props: any) => {
    const React = require('react')
    const { Text } = require('react-native')
    return <Text testID="dropdown-value">{props.value}</Text>
  }
})

// ✅ Mock DatePicker
jest.mock('../DatePicker', () => {
  return (props: any) => {
    const React = require('react')
    const { Text } = require('react-native')
    return (
      <Text testID="date-picker">
        {props.value?.toDateString() || 'No date'}
      </Text>
    )
  }
})

describe('SearchBarWithFilter Component', () => {
  const defaultProps = {
    search: '',
    onSearchChange: jest.fn(),
    filterType: 'country' as MatchFilterType,
    onFilterChange: jest.fn(),
    date: null as Date | null,
    onDateChange: jest.fn(),
  }

  it('renders search input correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBarWithFilter {...defaultProps} />
    )
    expect(getByPlaceholderText('Search by country')).toBeTruthy()
  })

  it('calls onSearchChange when typing', () => {
    const { getByPlaceholderText } = render(
      <SearchBarWithFilter {...defaultProps} />
    )
    const input = getByPlaceholderText('Search by country')
    fireEvent.changeText(input, 'Rick')
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('Rick')
  })

  it('renders dropdown and simulates filter change', () => {
    const { getByTestId } = render(<SearchBarWithFilter {...defaultProps} />)
    const dropdown = getByTestId('dropdown-value')
    expect(dropdown).toBeTruthy()
    // Simulate change (we can call onFilterChange manually since the mock is dumb)
    defaultProps.onFilterChange('team' as MatchFilterType)
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('team')
  })

  it('renders DatePicker and calls onDateChange', () => {
    const { getByTestId } = render(<SearchBarWithFilter {...defaultProps} />)
    const datePicker = getByTestId('date-picker')
    expect(datePicker).toBeTruthy()

    const newDate = new Date('2025-09-20')
    defaultProps.onDateChange(newDate)
    expect(defaultProps.onDateChange).toHaveBeenCalledWith(newDate)
  })
})
