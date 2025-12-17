import express from 'express'
import { prisma } from './lib/prisma'
const app = express()
const port = 3000

app.get('/api/user', async (req, res) => {

    await prisma.user.findMany().then((users) => {
        res.send(users)
    });

})

app.get('/api/user/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})