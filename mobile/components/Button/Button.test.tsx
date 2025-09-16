import { fireEvent, render } from '@testing-library/react-native'
import Button from './Button'

describe('Button Component', () => {
  it('renders the correct title', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />)
    expect(getByText('Click Me')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(<Button title="Press" onPress={onPressMock} />)

    fireEvent.press(getByText('Press'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Button title="Disabled" onPress={onPressMock} disabled />
    )

    fireEvent.press(getByText('Disabled'))
    expect(onPressMock).not.toHaveBeenCalled()
  })
})
