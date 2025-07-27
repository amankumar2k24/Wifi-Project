import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role, Status } from './user.enum';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    declare email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.ENUM(...Object.values(Role)), allowNull: false, defaultValue: Role.USER })
    declare role: Role;

    @Column({ type: DataType.STRING, allowNull: true })
    declare address: string;

    @Column({ type: DataType.ENUM(...Object.values(Status)), allowNull: false, defaultValue: Status.ACTIVE })
    declare status: Status;

    @Column({ type: DataType.STRING, allowNull: true })
    declare qrCode: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare upiNumber: string;

    declare createdAt: Date;
    declare updatedAt: Date;
}
