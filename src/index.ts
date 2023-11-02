import express from "express"
import { PrismaClient } from "@prisma/client"
import { IUserRepository } from "./repositories";
import UserRepository from "./repositories/user";
import { IUserHandler } from "./handler";
import UserHandler from "./handler/user";

const app = express();
const PORT = process.env.PORT || 8080
const client = new PrismaClient()

const userRepo: IUserRepository = new UserRepository(client)
const userHandler: IUserHandler = new UserHandler(userRepo)

app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to Learnhub").end()
})

const userRouter = express.Router()

app.use("/user", userRouter)
userRouter.post("/", userHandler.registration )

app.listen(PORT , () => {
    console.log(`learnhub API is up at ${PORT}`)
})