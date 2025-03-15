import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

const MongoOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService<NodeJS.ProcessEnv>) => {
    const isProduction = configService.getOrThrow<string>('NODE_ENV') == 'production';
    const DATABASE_URL = configService.getOrThrow<string>('DATABASE_URL_DEV');
    const DATABASE_URL_PROD = configService.getOrThrow<string>('DATABASE_URL_PROD');

    const uri = isProduction ? DATABASE_URL_PROD : DATABASE_URL

    return {
      uri: uri,
    };
  },
  inject: [ConfigService],
};

export {MongoOptions}