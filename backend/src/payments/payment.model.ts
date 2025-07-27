import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PaymentMethod, PaymentStatus } from './payment.enum';
import { User } from 'src/users/user.model';

@Table({ tableName: 'payments', timestamps: true })
export class Payment extends Model<Payment> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    declare userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.FLOAT, allowNull: false, })
    declare amount: number;

    @Column({ type: DataType.ENUM(...Object.values(PaymentMethod)), allowNull: false, })
    declare paymentMethod: PaymentMethod;

    @Column({ type: DataType.STRING, allowNull: true, })
    declare upiNumber?: string;

    @Column({ type: DataType.STRING, allowNull: true, })
    declare qrCode?: string;

    @Column({ type: DataType.STRING, allowNull: true, })
    declare screenshot?: string;

    @Column({ type: DataType.ENUM(...Object.values(PaymentStatus)), allowNull: false, defaultValue: PaymentStatus.PENDING, })
    declare status: PaymentStatus;

    @Column({ type: DataType.INTEGER, allowNull: false, })
    declare planMonths: number;

    @Column({ type: DataType.DATE, allowNull: false, })
    declare startDate: Date;

    @Column({ type: DataType.DATE, allowNull: false, })
    declare endDate: Date;

    declare createdAt: Date;
    declare updatedAt: Date;
}