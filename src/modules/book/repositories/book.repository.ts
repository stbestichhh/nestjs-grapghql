import { CrudRepository } from '../../baseModule/base.repository';
import { Book } from '../entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository extends CrudRepository<Book> {
  constructor(@InjectRepository(Book) repository: Repository<Book>) {
    super(repository);
  }
}
