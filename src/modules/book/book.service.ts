import { BaseService } from '../baseModule/base.service';
import { Book } from './entities/book.entity';
import { BookRepository } from './repositories/book.repository';

export class BookService extends BaseService<Book> {
  constructor(private bookRepository: BookRepository) {
    super(bookRepository);
  }
}
