import { CrudRepository } from '../../baseModule/base.repository';
import { Author } from '../entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class AuthorRepository extends CrudRepository<Author> {
  constructor(@InjectRepository(Author) repository: Repository<Author>) {
    super(repository);
  }
}
