import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookRepository } from './repositories/book.repository';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { RedisProvider } from './providers/redis.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookRepository, BookService, BookResolver, RedisProvider],
})
export class BookModule {}
