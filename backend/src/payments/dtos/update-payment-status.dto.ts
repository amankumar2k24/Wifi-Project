import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../payment.enum';

export class UpdatePaymentStatusDto {
    @IsEnum(PaymentStatus)
    status: PaymentStatus;
}