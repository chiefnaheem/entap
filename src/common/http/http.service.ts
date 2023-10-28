import { HttpService as NestHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);
  constructor(private readonly httpService: NestHttpService) {}

  async request<T>(config: any): Promise<T> {
    try {
      const response = await this.httpService.request<T>(config).toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }


}
