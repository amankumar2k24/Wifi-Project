import { IsInt, IsString, IsEnum } from 'class-validator';
import { NotificationType } from '../notification.enum'; // Changed from 'notification.enum' to 'notification.enums'

export class CreateNotificationDto {
    @IsInt()
    userId: number;

    @IsString()
    message: string;

    @IsEnum(NotificationType)
    type: NotificationType;
}