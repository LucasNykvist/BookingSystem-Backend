import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../notes/entities/note.entity';
import { NotesModule } from '../notes/notes.module';
import { User } from '../users/entities/user.entity';
import { UserModule } from '../users/User.module';
import { Article } from '../articles/entities/Article.entity';
import { ArticleModule } from '../articles/Article.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'BookerDB',
      entities: [User, Note, Article],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Note]),
    NotesModule,
    UserModule,
    ArticleModule,
  ],
})
export class DatabaseModule {}
