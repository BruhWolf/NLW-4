import request from 'supertest'
import { app } from '../src/app'
import createConeection from '../src/database'

describe('Users', () => {
  beforeAll(async ()=>{
    const connection = await createConeection()
    await connection.runMigrations()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post("/users").send({
      name: 'teste',
      email: 'teste@teste.com'
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
  
  it('Should not be able to create a new user if email conflicts', async () => {
    const response = await request(app).post("/users").send({
      name: 'teste',
      email: 'teste@teste.com'
    })
    console.log(response.body)
    expect(response.status).toBe(409)
  })
})

