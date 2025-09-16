import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import Constants from 'expo-constants'

const apiUrl: string | undefined = Constants.expoConfig?.extra?.apiUrl
if (!apiUrl) {
  throw new Error('❌ Missing "extra.apiUrl" in app.json or app.config.js')
}

const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})

apiClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('access-token')
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  }
)

export default apiClient
