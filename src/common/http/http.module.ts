import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [HttpService],
  imports: [HttpModule],
  exports: [HttpModule, HttpService],
})
export class HttpServiceModule {}
