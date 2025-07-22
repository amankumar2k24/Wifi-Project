import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notification.model';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification)
        private notificationModel: typeof Notification,
    ) { }

    async findAll(): Promise<Notification[]> {
        return this.notificationModel.findAll();
    }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const notification = await this.notificationModel.create({ ...createNotificationDto } as any);
        return notification;
    }
}