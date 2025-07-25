// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Ticket from "./Ticket";


@Table({ tableName: "User" })
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
  declare ID_User: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Pais: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Email: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  declare Termsandconditions: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  declare State: boolean;

  @HasMany(() => Ticket)
  Ticket?: Ticket[];
}