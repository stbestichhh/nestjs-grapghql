import { BaseSchema } from '../../baseModule/baseSchema.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@ObjectType()
@Entity('authors')
export class Author extends BaseSchema {
  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  lastName: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  bio?: string;

  @Field(() => [Book], { nullable: 'itemsAndList' })
  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];
}
