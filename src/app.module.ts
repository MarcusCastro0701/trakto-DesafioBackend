import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ImgController } from './img.controller';
import { ImgService } from './img.service';
import { DataBaseModule } from './db.module';



@Module({
  imports: [
    HttpModule,
    DataBaseModule
  ],
  controllers: [ImgController],
  providers: [ImgService],
})
export class AppModule {}

