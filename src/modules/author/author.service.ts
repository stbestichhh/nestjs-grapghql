import { BaseService } from '../baseModule/base.service';
import { Author } from './entities/author.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService extends BaseService<Author> {}
