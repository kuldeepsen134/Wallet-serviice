import app from "./app"

import { connectDB } from "./app/config/database"

import { env } from "./app/config/env"

const startServer = async () => {

 await connectDB()

 app.listen(env.PORT, () => {

  console.log(`Server running on ${env.PORT}`)

 })
}

startServer()