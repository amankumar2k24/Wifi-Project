import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { NotificationsModule } from '../notifications/notifications.module';
import { PaymentReminderCron } from './payment-reminder.cron';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        NotificationsModule,
    ],
    providers: [PaymentReminderCron],
    exports: [PaymentReminderCron],
})
export class CronModule { } 