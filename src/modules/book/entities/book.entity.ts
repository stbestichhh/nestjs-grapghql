import { BaseSchema } from '../../baseModule/baseSchema.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@ObjectType()
@Entity('books')
export class Book extends BaseSchema {
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  title: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  description?: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  genre: string;

  @Column({ type: 'integer', nullable: false })
  @Field(() => Int)
  publicationYear: number;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: 'author_id' })
  @Field(() => Author)
  author: Author;
}
