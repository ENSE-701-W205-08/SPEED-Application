import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './modules/article.module';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    // Import other modules
    ArticleModule,
  ],
})
export class AppModule {}
