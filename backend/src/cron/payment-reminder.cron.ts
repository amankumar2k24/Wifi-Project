import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from '../notifications/notifications.service';
import { User } from '../users/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { NotificationType } from 'src/notifications/notification.enum';

@Injectable()
export class PaymentReminderCron {
    private readonly logger = new Logger(PaymentReminderCron.name);

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private notificationsService: NotificationsService,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_9AM) // Runs daily at 9 AM IST
    async handleCron() {
        const users = await this.userModel.findAll({
            where: {
                status: 'ACTIVE',
                [Op.or]: [
                    { qrCode: null },
                    { qrCode: { [Op.like]: 'plan-end-%' } },
                ],
            } as any,
        });

        for (const user of users) {
            const endDate = user.qrCode ? new Date(user.qrCode.split('plan-end-')[1]) : null;
            if (endDate && this.isDueSoon(endDate)) {
                await this.notificationsService.create({
                    userId: user.id,
                    message: `Your payment is due on ${endDate.toLocaleDateString()}. Please renew your plan.`,
                    type: NotificationType.PAYMENT_REMINDER,
                });
                this.logger.log(`Payment reminder sent to user ${user.name} (ID: ${user.id})`);
            }
        }
    }

    private isDueSoon(endDate: Date): boolean {
        const now = new Date();
        const diffDays = (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays > 0 && diffDays <= 7; // Notify if due within 7 days
    }
}