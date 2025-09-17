import app from './app'
import { connectDB } from './config/db'
import { ENV } from './config/env'
import { startCronJobs } from './jobs/cron'

async function startServer() {
  try {
    await connectDB(ENV.MONGO_URI)
    console.log('✅ Mongo connected')

    startCronJobs()
    console.log('🕒 Cron jobs started')

    app.listen(ENV.PORT, ENV.HOST, () => {
      console.log(
        `🚀 Server running at http://${ENV.HOST}:${ENV.PORT} [${ENV.NODE_ENV}]`
      )
    })
  } catch (err) {
    console.error('❌ Failed to start:', err)
    process.exit(1)
  }
}

startServer()
