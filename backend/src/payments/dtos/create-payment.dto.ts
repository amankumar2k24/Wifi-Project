import { IsInt, IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';
import { PaymentMethod } from '../payment.enum';

export class CreatePaymentDto {
    @IsInt()
    userId: number;

    @IsNumber()
    amount: number;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @IsInt()
    planMonths: number;

    @IsString()
    @IsOptional()
    screenshot?: string;
}