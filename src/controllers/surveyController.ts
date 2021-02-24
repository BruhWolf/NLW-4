import { Request, Response } from "express";
import { SurveyRepository } from '../repositories/survey.repository'
import { getCustomRepository } from "typeorm";

export class SurveyController { 
    async create (request: Request, response: Response) {
        const {title, description} = request.body
        try{
            const surveyRepository = getCustomRepository(SurveyRepository)
            const survey = surveyRepository.create({title, description})
            await surveyRepository.save(survey)
            return response.status(201).json(survey)
        }catch(error){
            console.error(error)
        }
    }
    async show (request: Request, response: Response) {
        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveys = await surveyRepository.find()
        return response.status(200).send(surveys)
    }
}