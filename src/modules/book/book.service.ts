import { BaseService } from '../baseModule/base.service';
import { Book } from './entities/book.entity';
import { BookRepository } from './repositories/book.repository';
import { SearchFiltersInput } from './dto/search-input.dto';
import { Between, FindManyOptions, FindOptionsWhere, ILike } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(
    private bookRepository: BookRepository,
    @Inject('REDIS') private readonly redis: Redis,
  ) {
    super(bookRepository);
  }

  private makeCacheKey(query: string, filters: SearchFiltersInput) {
    return `search:${query ?? ''}:${JSON.stringify(filters ?? {})}`;
  }

  async search(query?: string, filters?: SearchFiltersInput) {
    const key = this.makeCacheKey(query, filters);
    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const queryStage = this.buildQueryStage(query);
    const filtersStage = this.buildFiltersStage(filters);

    const whereCondition = queryStage.map((condition) => ({
      ...condition,
      ...filtersStage,
    }));

    const findOptions: FindManyOptions<Book> = {
      where: whereCondition.length ? whereCondition : filtersStage,
      relations: ['author'],
    };

    const books = await this.bookRepository.find(findOptions);

    await this.redis.set(key, JSON.stringify(books), 'EX', 60); // EX - seconds token, cached for 60 seconds

    return books;
  }

  private buildQueryStage(query = '') {
    const words = query.trim().split(' ').filter(Boolean);

    const where: FindOptionsWhere<Book>[] = [];

    if (!words.length) {
      where.push({});

      return where;
    }

    for (const word of words) {
      where.push({
        title: ILike(`%${word}%`),
        description: ILike(`%${word}%`),
      });
    }

    return where;
  }

  private buildFiltersStage(filters: SearchFiltersInput = {}) {
    const filterCondition: FindOptionsWhere<Book> = {};

    if (filters?.genre) {
      filterCondition.genre = filters.genre;
    }

    if (filters?.publicationYear?.from || filters?.publicationYear?.to) {
      const from = filters?.publicationYear?.from || 0;
      const to = filters?.publicationYear?.to || new Date().getFullYear();
      filterCondition.publicationYear = Between(from, to);
    }

    return filterCondition;
  }
}
