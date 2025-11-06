import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { AuthorRepository } from './repositories/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorResolver, AuthorService, AuthorRepository],
})
export class AuthorModule {}
