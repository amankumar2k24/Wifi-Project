import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { MESSAGE } from '../config/messages';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Get()
    async findAll() {
        const notifications = await this.notificationsService.findAll();
        return { message: MESSAGE.PAYMENTS_FETCHED, data: notifications };
    }
}