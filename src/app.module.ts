import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    AuthModule,
    TodoModule,
    MongooseModule.forRoot('mongodb://localhost/nestjs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
