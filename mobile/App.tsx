import { QueryClientProvider } from '@tanstack/react-query'
import './api/apiClientInterceptors'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import AppNavigator from './navigation/AppNavigator'
import { queryClient } from './queryClient'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
