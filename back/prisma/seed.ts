import Database from 'better-sqlite3';
import axios from 'axios';
import * as cheerio from 'cheerio';

const db = new Database('dev.db');

async function main() {
    console.log('Start seeding (using better-sqlite3)...');

    try {
        const url = 'https://www.imdb.com/search/title/?genres=animation&keywords=anime&sort=user_rating,desc&count=100';

        console.log(`Fetching data from ${url}...`);

        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const animes = [];

        $('.ipc-metadata-list-summary-item').each((index, element) => {
            if (index >= 100) return;

            const titleElement = $(element).find('.ipc-title__text');
            const titleRaw = titleElement.text().trim();

            const match = titleRaw.match(/^(\d+)\.\s+(.+)$/);
            const ranking = match ? parseInt(match[1]) : index + 1;
            const title = match ? match[2] : titleRaw;

            const ratingElement = $(element).find('.ipc-rating-star--base');
            const rating = parseFloat(ratingElement.text().trim()) || 0;

            const imgElement = $(element).find('.ipc-image');
            const imageUrl = imgElement.attr('src') || '';

            const linkElement = $(element).find('.ipc-title-link-wrapper');
            const imdbLink = 'https://www.imdb.com' + linkElement.attr('href');

            const metadataItems = $(element).find('.dli-title-metadata-item');
            let year = null;
            if (metadataItems.length > 0) {
                const yearText = $(metadataItems[0]).text().trim();
                const yearMatch = yearText.match(/(\d{4})/);
                if (yearMatch) {
                    year = parseInt(yearMatch[1]);
                }
            }

            const descriptionElement = $(element).find('.ipc-html-content-inner-div');
            const description = descriptionElement.text().trim();

            if (title) {
                animes.push({
                    title,
                    rating,
                    ranking,
                    imageUrl,
                    imdbLink,
                    description,
                    year: year || 0
                });
            }
        });

        console.log(`Found ${animes.length} animes.`);

        if (animes.length === 0) {
            console.warn("Warning: No animes found. Selectors might be outdated.");
        }

        // Use transaction for better performance
        const insert = db.prepare(`
            INSERT INTO Anime (title, rating, ranking, imageUrl, imdbLink, description, year)
            VALUES (@title, @rating, @ranking, @imageUrl, @imdbLink, @description, @year)
        `);

        // Check if table exists just in case, but assume it does from migration
        // Clear table using raw SQL
        db.prepare('DELETE FROM Anime').run();

        const insertMany = db.transaction((animes) => {
            for (const anime of animes) {
                insert.run(anime);
            }
        });

        console.log('Inserting into database...');
        insertMany(animes);
        console.log('Seeding finished.');

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        db.close();
    }
}

main();
