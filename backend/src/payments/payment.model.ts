import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PaymentMethod, PaymentStatus } from './payment.enum';
import { User } from 'src/users/user.model';

@Table({ tableName: 'payments', timestamps: true })
export class Payment extends Model<Payment> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    amount!: number;

    @Column({
        type: DataType.ENUM(...Object.values(PaymentMethod)),
        allowNull: false,
    })
    paymentMethod!: PaymentMethod;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    upiNumber?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    qrCode?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    screenshot?: string;

    @Column({
        type: DataType.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
        defaultValue: PaymentStatus.PENDING,
    })
    status!: PaymentStatus;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    planMonths!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    startDate!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    endDate!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    declare createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    declare updatedAt: Date;
}