import 'reflect-metadata'
import express from 'express'
import {router} from './routes'
import createConnection from './database'

createConnection()
export const app = express()

app.use(express.json())
app.use(router)
app.get('/', (request, response) => {
    return response.status(201).json({message: 'Hello World'})
})