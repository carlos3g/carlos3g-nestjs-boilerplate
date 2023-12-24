import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  public constructor(private readonly configService: ConfigService) {}

  public get NODE_ENV() {
    return this.configService.get<string>('NODE_ENV');
  }

  public get DEBUG() {
    return this.configService.get<boolean>('DEBUG') as boolean;
  }

  public get SENTRY_DNS() {
    return this.configService.get<string>('BOILERPLATE_SENTRY_DNS');
  }

  public get JWT_SECRET() {
    return this.configService.get<string>('BOILERPLATE_JWT_SECRET');
  }

  public get POSTGRES_API_URL(): string {
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = this.configService.get<string>('DB_PORT');
    const dbDatabase = this.configService.get<string>('DB_DATABASE');
    const dbUsername = this.configService.get<string>('DB_USERNAME');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const dbSchema = this.configService.get<string>('DB_SCHEMA');

    return `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}?schema=${dbSchema}`;
  }

  public get API_DNS(): string {
    return this.configService.get<string>('BOILERPLATE_API_DNS');
  }
}
