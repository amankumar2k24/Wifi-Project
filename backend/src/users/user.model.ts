import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role, Status } from './user.enum';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.ENUM(...Object.values(Role)),
        allowNull: false,
        defaultValue: Role.USER,
    })
    role!: Role;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address?: string;

    @Column({
        type: DataType.ENUM(...Object.values(Status)),
        allowNull: false,
        defaultValue: Status.ACTIVE,
    })
    status!: Status;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    qrCode?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    upiNumber?: string;

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