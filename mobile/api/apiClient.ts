import axios, { AxiosInstance } from 'axios'
import Constants from 'expo-constants'

const apiUrl: string | undefined = Constants.expoConfig?.extra?.apiUrl
if (!apiUrl) {
  throw new Error('❌ Missing "extra.apiUrl" in app.json or app.config.js')
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})
