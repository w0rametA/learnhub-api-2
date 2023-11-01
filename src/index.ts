import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express();
const PORT = process.env.PORT || 8080
const client = new PrismaClient()

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to Learnhub").end()
})

app.listen(PORT , () => {
    console.log(`learnhub API is up at ${PORT}`)
})