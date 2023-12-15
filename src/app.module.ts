import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { UserModule } from './user/user.module';
import * as LocalSession from 'telegraf-session-local';
import { StartModule } from './start/start.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { SetupModule } from './setup/setup.module';
import { ConfigModule } from '@nestjs/config';
import { TarifsModule } from './tarifs/tarifs.module';
import { DirectionModule } from './direction/direction.module';

const sessions = new LocalSession({database: 'sessions_db.json'})

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: process.env.TOKEN_TELEGRAM,
    }),
    UserModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      models: [join(__dirname, '**', '*.model.ts')],
      autoLoadModels: true,
    }),
    StartModule,
    OrdersModule,
    SetupModule,
    TarifsModule,
    DirectionModule
  ],
  controllers: [],
})
export class AppModule {}
 