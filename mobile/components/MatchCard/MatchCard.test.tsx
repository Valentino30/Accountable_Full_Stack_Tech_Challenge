import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { Match } from '../../types/match'
import MatchCard from './MatchCard'

// ✅ Mock useNavigation from react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

const mockMatch: Match = {
  _id: '1',
  id_odsp: 'ODSP123',
  date: '2025-09-20',
  country: 'USA',
  homeTeam: 'FC Rickton',
  awayTeam: 'Morty United',
  league: 'Premier League',
  price: 50,
  availableSeats: 50,
  reservations: [],
  reservedByUser: false,
}

describe('MatchCard Component', () => {
  it('renders match info correctly', () => {
    const { getByText } = render(<MatchCard match={mockMatch} />)
    expect(getByText('FC Rickton')).toBeTruthy()
    expect(getByText('Morty United')).toBeTruthy()
    expect(getByText('USA • 9/20/2025')).toBeTruthy()
    expect(getByText('50 spots available')).toBeTruthy()
  })

  it('calls onPress callback when Reserve button is pressed', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <MatchCard match={mockMatch} onPress={onPressMock} />
    )
    fireEvent.press(getByText('Reserve'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('does not crash when clickable is false', () => {
    const { getByText } = render(
      <MatchCard match={mockMatch} clickable={false} />
    )
    expect(getByText('FC Rickton')).toBeTruthy()
  })
})
