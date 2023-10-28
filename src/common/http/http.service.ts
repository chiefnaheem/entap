import { HttpService as NestHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import serverConfig from 'src/database/config/env.config';

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);
  constructor(private readonly httpService: NestHttpService) {}

  async request<T>(method: string, data?: any): Promise<T> {
    try {
      const response = await this.httpService
        .request({
          url: serverConfig.PAYSTACK_URL,
          method,
          data,
          headers: {
            Authorization: `Bearer ${serverConfig.PAYSTACK_SECRET_KEY}`,
          },
        })
        .toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
