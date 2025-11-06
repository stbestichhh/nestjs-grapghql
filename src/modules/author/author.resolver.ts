import { Resolver } from '@nestjs/graphql';
import { Author } from './entities/author.entity';

@Resolver(() => Author)
export class AuthorResolver {}
