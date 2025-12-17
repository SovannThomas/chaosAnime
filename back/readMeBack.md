# Documentation Backend

## Remplissage de la Base de Données (Seeding)

Ce projet inclut un script de remplissage qui peuple la base de données SQLite avec le Top 100 des Animes d'IMDB.

### Ce que ça fait
Le script de seed (`prisma/seed.ts`) :
1.  **Scrape IMDB** : Récupère la liste des "Animes les mieux notés" directement depuis IMDB.
2.  **Extrait les Données** : Analyse le HTML pour obtenir des détails riches comme le Titre, la Note, le Classement, l'URL de l'image et la Description.
3.  **Peuple la Base de Données** : Insère ces entrées dans la table `Anime` de la base de données SQLite.

### Comment le lancer
Assurez-vous d'être dans le répertoire `back` :

```bash
cd back
npx prisma db seed
```

Cette commande va :
- Vider la table `Anime` existante.
- Récupérer les données fraîches depuis IMDB.
- Insérer les nouveaux enregistrements.
