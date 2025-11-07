import { BookService } from './book.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { SearchFiltersInput } from './dto/search-input.dto';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'findAllBooks' })
  findAllBooks(
    @Args('query', { type: () => String, nullable: true }) query?: string,
    @Args('filters', { nullable: true }) filters?: SearchFiltersInput,
  ) {
    return this.bookService.search(query, filters);
  }
}
