import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/services/users.service';
import { UsersController } from './modules/users/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { Note } from './modules/notes/entities/note.entity';
import { NotesModule } from './modules/notes/notes.module';
import { ConfigModule } from '@nestjs/config';

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
      entities: [User, Note],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Note]),
    NotesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
