import express from 'express'
import { prisma } from './lib/prisma'
const app = express()
const port = 3000

app.use(express.json())

app.get('/api/user', async (req, res) => {

    try {
        await prisma.user.findMany().then((users) => {
            res.send(users)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
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

app.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { email, name, avatar } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {

                email,
                name,
                avatar
            },
        });

        res.json(updatedUser);

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Utilisateur à modifier non trouvé" });
        }
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
});

app.get('/api/dispoName', async (req, res) => {

    const {name} = req.body;

    try {
        const existingUser = await prisma.user.findMany({
            select: {
                name: true
            },
            where: {
                name : name
            }
        });

        const isAvailable = (existingUser.length <= 0);

        res.json(isAvailable);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})