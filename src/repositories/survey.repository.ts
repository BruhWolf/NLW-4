import { Survey } from "../database/models/Survey";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Survey)
export class SurveyRepository extends Repository<Survey>{

}