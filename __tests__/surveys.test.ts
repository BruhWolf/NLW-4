import request from 'supertest'
import {app} from '../src/app'
import createConeection from '../src/database'

describe('Surveys', () => {
  
    beforeAll(async ()=>{
        const connection = await createConeection()
        await connection.runMigrations()
    })
  
    it('Sould be able to create a new survey', async () => {
        const response = await request(app).post('/surveys').send({
            title: 'um titulo',
            description: 'uma descrição'
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it('Sould return a list with all surveys', async () => {
        const response = await request(app).get('/surveys')
        expect(response.body.length).toBe(1)
    })
})


