import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { CronModule } from './cron/cron.module';
import { User } from './users/user.model';
import { Payment } from './payments/payment.model';
import { Notification } from './notifications/notification.model'; // Added missing import

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true, // Set to false in production; use migrations instead
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    PaymentsModule,
    NotificationsModule,
    CronModule, // <-- Add this line
  ],
  // Remove PaymentReminderCron from providers
})
export class AppModule { }