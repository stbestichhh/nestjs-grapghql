import { BaseService } from '../baseModule/base.service';
import { Book } from './entities/book.entity';
import { BookRepository } from './repositories/book.repository';
import { SearchFiltersInput } from './dto/search-input.dto';
import { Between, FindManyOptions, FindOptionsWhere, ILike } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(private bookRepository: BookRepository) {
    super(bookRepository);
  }

  async search(query?: string, filters?: SearchFiltersInput) {
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

    return this.bookRepository.find(findOptions);
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
