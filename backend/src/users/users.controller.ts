import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PaymentStatusDto } from './dtos/payment-status.dto';
import { MESSAGE } from '../config/messages';
import { Role } from './user.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll() {
        const users = await this.usersService.findAll();
        return { message: MESSAGE.PAYMENTS_FETCHED, data: users };
    }

    @Post(':id/deactivate')
    async deactivate(@Param('id') id: number) {
        await this.usersService.deactivate(id);
        return { message: MESSAGE.USER_DEACTIVATED };
    }

    @Post(':id/payment-status')
    async updatePaymentStatus(@Param('id') id: number, @Body() dto: PaymentStatusDto) {
        await this.usersService.updatePaymentStatus(id, dto);
        return { message: MESSAGE.PAYMENT_UPDATED };
    }
}