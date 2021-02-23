import 'reflect-metadata'
import express from 'express'
import {router} from './routes'
import './database'

const app = express()

app.use(express.json())
app.use(router)
app.get('/', (request, response) => {
    return response.status(201).json({message: 'Hello World'})
})

app.listen(3333, () => {
    console.log('Server is runnning on port 3333')
})