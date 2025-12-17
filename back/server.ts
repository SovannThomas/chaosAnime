import express from 'express'
import { prisma } from './lib/prisma'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())
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

app.get('/api/animes', async (req, res) => {
    try {
        const getAnimes = await prisma.anime.findMany();
        res.json(getAnimes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.get('/api/animes/:id', async (req, res) => {
    try {
        const getAnime = await prisma.anime.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.json(getAnime);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Anime non trouvé" });
        } else {
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
});

app.get('/api/favorites/:id', async (req, res) => {
    try {
        const getFavorites = await prisma.favorite.findMany({
            where: {
                userId: Number(req.params.id),
            },
            include: {
                anime: true,
            },
        });
        res.json(getFavorites);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Liste de favoris non trouvée" });
        } else {
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
});

app.put('/api/favorites/:id/:animeId', async (req, res) => {
    try {
        const createFavorite = await prisma.favorite.create({
            data: {
                userId: Number(req.params.id),
                animeId: Number(req.params.animeId),
            },
        });
        res.json(createFavorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.delete('/api/favorites/:id/:animeId', async (req, res) => {
    try {
        const deleteFavorite = await prisma.favorite.deleteMany({
            where: {
                userId: Number(req.params.id),
                animeId: Number(req.params.animeId),
            },
        });
        res.json(deleteFavorite);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Favorite non trouvé" });
        } else {
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})