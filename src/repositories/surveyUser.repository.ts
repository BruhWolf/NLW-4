import { SurveyUser } from "../database/models/surveyUser";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SurveyUser)
export class SurveyUserRepository extends Repository<SurveyUser>{

}