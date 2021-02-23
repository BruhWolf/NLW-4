import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { User } from '../database/models/User'

export class UserController {
    async create (request: Request, response: Response) {
        try{
            const {name, email} = request.body
            const userRepository = getRepository(User)
            const userAreadyExists = await userRepository.findOne({email})
            if(userAreadyExists) return response.status(409).json({message: "Email aready exists"})
            const user = userRepository.create({name, email})
            await userRepository.save(user)
            return response.status(201).json(user)
        }catch(error){
            console.error(error)
        }
    }
}