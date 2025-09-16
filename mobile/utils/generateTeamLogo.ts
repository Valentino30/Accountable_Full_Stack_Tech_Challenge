import { TeamLogoParams } from '../types/match'

export const generateTeamLogo = (teamName: string): TeamLogoParams => {
  const colors = ['#FF6B6B', '#4ECDC4', '#556270', '#C7F464', '#FF6B6B']
  const color = colors[teamName.charCodeAt(0) % colors.length]

  const initials = teamName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return { initials, color }
}
