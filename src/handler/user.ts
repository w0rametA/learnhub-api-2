import { RequestHandler } from "express";
import { IUserHandler } from ".";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IErrorDto } from "../dto/error";
import { IUserRepository } from "../repositories";
import { hashPassword } from "../utils/bcrypt";

export default class UserHandler implements IUserHandler{

    private repo: IUserRepository 

    constructor(repo:IUserRepository){
        this.repo = repo
    }

    registration: RequestHandler<{},IUserDto | IErrorDto, ICreateUserDto > = async (req,res) => {
        const { name, username, password:plaintextPassword } = req.body

        if (!name.length){
            return res.status(400).json({message: "name is invalid"}).end()
        }
        if (!username.length){
            return res.status(400).json({message: "username is invalid"}).end()
        }
        if (!plaintextPassword.length){
            return res.status(400).json({message: "password is invalid"}).end()
        }
        try {
            const {
                id: registeredId,
                name: registeredName,
                registeredAt,
                username: registeredUsername
            } = await this.repo.create({
                name,
                username,
                password: hashPassword(plaintextPassword)
            })
            return res.status(201).json({
                id: registeredId,
                name: registeredName,
                registeredAt: `${registeredAt}`,
                username: registeredUsername
            }).end()
        }
        catch(err){
            const errMsg = `fail to create user: ${username}`
            return res.status(500).json({message: errMsg}).end()
        }
        }
        
}