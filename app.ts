import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"

import userRoutes from "./app/routes/users/user"
import authRoutes from "./app/routes/users/auth"
import walletRoutes from "./app/routes/wallets/userWallet"


const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/wallets", walletRoutes)



app.get("/", (req, res) => {

 res.send("Welcome to the API")

})

export default app