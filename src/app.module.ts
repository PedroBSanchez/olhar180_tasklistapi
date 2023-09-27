import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import modules from './modules/index';

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'olhar180_tasklist',
      username: 'admin',
      password: 'admin',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
