import { IsString, IsInt, Min } from 'class-validator';

export class PaymentStatusDto {
    @IsString()
    status: string;

    @IsInt()
    @Min(1)
    planMonths: number;
}