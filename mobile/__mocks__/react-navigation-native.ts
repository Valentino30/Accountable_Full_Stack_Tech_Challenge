export const useNavigation = () => ({
  navigate: jest.fn() as unknown as (screen: string, params?: any) => void,
  goBack: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
})
