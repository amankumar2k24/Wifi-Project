import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { NotificationType } from './notification.enum';
import { User } from 'src/users/user.model';

@Table({ tableName: 'notifications', timestamps: true })
export class Notification extends Model<Notification> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    declare userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.STRING, allowNull: false, })
    declare message: string;

    @Column({ type: DataType.ENUM(...Object.values(NotificationType)), allowNull: false, })
    declare type: NotificationType;

    declare createdAt: Date;
}