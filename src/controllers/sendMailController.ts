import { Request, Response } from "express";
import { SurveyRepository } from "../repositories/survey.repository";
import { SurveyUserRepository } from "../repositories/surveyUser.repository";
import { UserRepository } from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import sendMailService from '../services/sendMail.service'
import {resolve} from 'path'


export class SendMailController {
    async execute (request: Request, response: Response) {
        const {email, survey_id} = request.body

        const userRepositoty = getCustomRepository(UserRepository)
        const surveyRepositoty = getCustomRepository(SurveyRepository)
        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const user = await userRepositoty.findOne({email})
        if(!user){
            return response.status(400).json({error: 'user does not exists'})
        }
        
        const survey = await surveyRepositoty.findOne({id: survey_id})
        if(!survey){
            return response.status(400).json({error: 'survey does not exists'})
        }


        const npsTemplatePath = resolve(__dirname, '../views/emails/npsMail.hbs')
        const npsTemplateVariables = {
            name: user.email,
            title:survey.title,
            description: survey.description,
            link: process.env.NPS_MAIL_URL,
            user_id: user.id
        }


        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: [{user_id:user.id},{value:null}],
            relations:['user','survey']
        })
        console.log(surveyUserAlreadyExists)
        
        if(surveyUserAlreadyExists!==undefined){
            console.log('entrou aqui')
            await sendMailService.execute(email, survey.title ,npsTemplateVariables, npsTemplatePath)
            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id
        }) 

        await sendMailService.execute(email, survey.title ,npsTemplateVariables, npsTemplatePath)

        await surveyUserRepository.save(surveyUser)
        return response.json(surveyUser)
    }
}