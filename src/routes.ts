import { UserController } from "./controllers/userController"
import  {Router} from 'express'
export const router = Router()

router.post('/users',(request, response)=>{
    const userController = new UserController()
    userController.create(request,response)
})