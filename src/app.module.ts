import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/services/users.service';
import { UsersController } from './modules/users/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "MonaLisa200sx",
      database: "BookerDB",
      entities: [User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule { }
