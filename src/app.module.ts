import { DataSource } from 'typeorm';
import configuration from './config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscussionModule } from './discussion/discussion.module';
import { HealthModule } from './health/health.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('database_url'),
        autoLoadEntities: true,
        synchronize: false,
        migrations: ['src/database/migrations/*.ts'],
      }),
    }),
    AuthModule,
    UserModule,
    HealthModule,
    CommentModule,
    DiscussionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
