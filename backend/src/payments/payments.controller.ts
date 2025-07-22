import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentStatusDto } from './dtos/update-payment-status.dto'; // Ensure this import is present
import { MESSAGE } from '../config/messages';
import { Role } from '../users/user.enum';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Get()
    async findAll() {
        const payments = await this.paymentsService.findAll();
        return { message: MESSAGE.PAYMENTS_FETCHED, data: payments };
    }

    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        const payment = await this.paymentsService.create(createPaymentDto);
        return { message: MESSAGE.PAYMENT_CREATED, data: payment };
    }

    @Post(':id/status')
    async updateStatus(@Param('id') id: number, @Body() dto: UpdatePaymentStatusDto) {
        await this.paymentsService.updateStatus(id, dto.status);
        return { message: MESSAGE.PAYMENT_UPDATED };
    }
}