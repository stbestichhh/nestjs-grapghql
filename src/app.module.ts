import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 20,
        },
      ],
    }),
    AuthModule,
    AppConfigModule,
    DatabaseModule,
    UserModule,
    AuthorModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
