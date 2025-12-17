import express from 'express'
import { prisma } from './lib/prisma'
const app = express()
const port = 3000

app.get('/', async (req, res) => {

    await prisma.user.findMany().then((users) => {
        res.send(users)
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})