import { BookService } from './book.service';

export class BookResolver {
  constructor(private readonly bookService: BookService) {}
}
