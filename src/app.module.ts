import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], // Optional: Specify the path to your .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl: {
          rejectUnauthorized: true, // Ensure certificates are verified
          ca: configService.get<string>('SSL_CERTIFICATE_PATH'), // Path to SSL certificate file
        },
        extra: {
          sslmode: 'require',
        },
        autoLoadEntities: true,
        synchronize: true, // Set to true for development, false in production
      }),
    }),
    AuthModule,
    TodoModule,
    UserModule,
  ],
})
export class AppModule {}