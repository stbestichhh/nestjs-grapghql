// src/database/seed.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Author } from '../modules/author/entities/author.entity';
import { Book } from '../modules/book/entities/book.entity';
import { config } from 'dotenv';

config();

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [Author, Book],
});

async function seed() {
  await ds.initialize();
  const authorRepo = ds.getRepository(Author);
  const bookRepo = ds.getRepository(Book);

  const authors = [];
  for (let i = 0; i < 5; i++) {
    const a = authorRepo.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      bio: faker.lorem.sentences(2),
    });
    await authorRepo.save(a);
    authors.push(a);
  }

  const genres = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Biography'];
  const books = [];
  for (let i = 0; i < 1000; i++) {
    const b = bookRepo.create({
      title: faker.lorem.words({ min: 1, max: 6 }),
      description: faker.lorem.sentences(2),
      genre: genres[i % genres.length],
      publicationYear: faker.number.int({ min: 1950, max: 2025 }),
      author: authors[i % authors.length],
    });
    books.push(b);
    if (books.length >= 100) {
      await bookRepo.save(books.splice(0));
    }
  }
  if (books.length) await bookRepo.save(books);

  await ds.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
