import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Status } from './user.enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PaymentStatusDto } from './dtos/payment-status.dto';
import { MESSAGE } from '../config/messages';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async deactivate(id: number): Promise<void> {
        const user = await this.userModel.findByPk(id);
        if (!user) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);
        await user.update({ status: Status.INACTIVE });
    }

    async updatePaymentStatus(id: number, dto: PaymentStatusDto): Promise<void> {
        const user = await this.userModel.findByPk(id);
        if (!user) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);
        // await user.update({ status: dto.status }); // Update user status based on payment status
        // We shouldn't update user status based on payment status dto
        // If needed, map payment status to user status appropriately
        // For example: await user.update({ paymentStatus: dto.status });
        // Logic to update payment plan (e.g., calculate end date based on planMonths)
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + dto.planMonths);
        await user.update({ qrCode: `plan-end-${endDate.toISOString()}` }); // Placeholder
    }
}