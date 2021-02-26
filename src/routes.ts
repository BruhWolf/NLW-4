import { UserController } from "./controllers/userController"
import  {Router} from 'express'
import { SurveyController } from "./controllers/surveyController"
import { SendMailController } from "./controllers/sendMailController"
export const router = Router()

router.post('/users',(request, response)=>{
    const userController = new UserController()
    userController.create(request,response)
})

router.get('/surveys',(request, response)=>{
    const surveyController = new SurveyController()
    surveyController.show(request,response)
})

router.post('/surveys',(request, response)=>{
    const surveyController = new SurveyController()
    surveyController.create(request,response)
})

router.post('/sendmail',(request, response)=>{
    const sendMailController = new SendMailController()
    sendMailController.execute(request,response)
})