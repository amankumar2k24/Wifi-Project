import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './payment.model';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { MESSAGE } from '../config/messages';
import { PaymentMethod, PaymentStatus } from './payment.enum';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(Payment)
        private paymentModel: typeof Payment,
    ) { }

    async findAll(): Promise<Payment[]> {
        return this.paymentModel.findAll();
    }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { userId, amount, paymentMethod, planMonths, screenshot } = createPaymentDto;
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + planMonths);

        // Explicitly type the object as Partial<Payment> to satisfy Sequelize's type checking
        const paymentData: Partial<Payment> = {
            userId,
            amount,
            paymentMethod,
            status: PaymentStatus.PENDING,
            planMonths,
            startDate,
            endDate,
            screenshot,
        };

        return this.paymentModel.create(paymentData as any);
    }

    async updateStatus(id: number, status: PaymentStatus): Promise<void> {
        const payment = await this.paymentModel.findByPk(id);
        if (!payment) throw new NotFoundException(MESSAGE.PAYMENT_NOT_FOUND);
        await payment.update({ status });
    }
}